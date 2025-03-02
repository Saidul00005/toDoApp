import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchToDos = createAsyncThunk('/toDoList', async ({ page = 1 }) => {
  const response = await fetch(`/api/toDoList?page=${page}&limit=20`)
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const result = await response.json()
  // console.log('Fetched ToDos from Api:', result.data.data);
  return {
    data: result.data.data,
    currentPage: page,
    hasMore: result.data.hasMore
  };
})

export const searchToDos = createAsyncThunk(
  'searchTodos',
  async (query) => {
    const response = await fetch(`/api/toDoList/search?q=${query}`);
    if (!response.ok) {
      throw new Error('Search failed');
    }
    const result = await response.json();
    return result.data.data;
  }
);


export const addToDo = createAsyncThunk('/addNewItem', async (newToDo) => {
  const response = await fetch('/api/addToDo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newToDo),
  });
  const result = await response.json();
  return result.data.data;
})

export const editToDo = createAsyncThunk('/editToDo', async ({ id, updatedToDo }) => {
  const response = await fetch(`/api/editToDo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedToDo),
  });
  const result = await response.json();
  //console.log("Updated items:", result.data.data)
  return { id, updatedToDo: result.data.data };
});

export const editToDoStatus = createAsyncThunk('/editToDoStatus', async ({ id, updatedToDo }) => {
  console.log("From thunk", id, updatedToDo)
  const response = await fetch(`/api/editToDoStatus/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedToDo),
  });
  const result = await response.json();
  console.log(result)
  return { id, updatedToDo: result.data.data };
});


export const deleteToDo = createAsyncThunk('/deleteToDo', async (id) => {
  await fetch(`/api/deleteToDo/${id}`, { method: 'DELETE' });
  return id;
});

const toDoSlice = createSlice({
  name: 'toDos',
  initialState: {
    items: [],
    searchResults: [],
    currentPage: 1,
    hasMore: true,
    loading: false,
    isLoadingMore: false,
    isSearchLoading: false,
    error: null,
  },
  reducers: {
    resetToDoItems: (state) => {
      state.items = [];
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToDos.pending, (state, action) => {
      const isInitialLoad = action.meta.arg.page === 1;
      state.loading = isInitialLoad;
      state.isLoadingMore = !isInitialLoad;
      state.error = null
    }).addCase(fetchToDos.fulfilled, (state, action) => {
      // console.log('Fetched ToDos from API:', action.payload);
      state.loading = false;
      state.isLoadingMore = false;
      state.items = action.payload.currentPage === 1
        ? action.payload.data
        : [...state.items, ...action.payload.data];// Set fetched todos
      state.currentPage = action.payload.currentPage;
      state.hasMore = action.payload.hasMore;
      state.error = null
    }).addCase(fetchToDos.rejected, (state, action) => {
      state.loading = false;
      state.isLoadingMore = false;
      state.error = action.error.message;
    }).addCase(addToDo.fulfilled, (state, action) => {
      state.items.push(action.payload); // Add the new todo
    }).addCase(editToDo.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload.updatedToDo
      }
    }).addCase(editToDoStatus.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updatedToDo, // Merge the updated fields
        };
      }
    }).addCase(deleteToDo.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
    }).addCase(searchToDos.pending, (state) => {
      state.isSearchLoading = true;
    }).addCase(searchToDos.fulfilled, (state, action) => {
      state.isSearchLoading = false;
      state.searchResults = action.payload;
    }).addCase(searchToDos.rejected, (state) => {
      state.isSearchLoading = false;
    });
  }

})

export const { resetError, resetSearchResults, resetToDoItems } = toDoSlice.actions
export const selectToDos = (state) => state.toDos.items
export const selectLoading = (state) => state.toDos.loading
export const selectError = (state) => state.toDos.error
export const selectHasMore = (state) => state.toDos.hasMore;
export const selectCurrentPage = (state) => state.toDos.currentPage;
export const selectIsLoadingMore = (state) => state.toDos.isLoadingMore;
export const selectIsSearchLoading = (state) => state.toDos.isSearchLoading;

export default toDoSlice.reducer;