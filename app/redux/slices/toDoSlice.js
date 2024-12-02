import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchToDos = createAsyncThunk('/toDoList', async () => {
  const response = await fetch('/api/toDoList')
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const result = await response.json()
  // console.log('Fetched ToDos from Api:', result.data.data);
  return result.data.data
})


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

export const deleteToDo = createAsyncThunk('/deleteToDo', async (id) => {
  await fetch(`/api/deleteToDo/${id}`, { method: 'DELETE' });
  return id;
});

const toDoSlice = createSlice({
  name: 'toDos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToDos.pending, (state) => {
      state.loading = true;
    }).addCase(fetchToDos.fulfilled, (state, action) => {
      // console.log('Fetched ToDos from API:', action.payload);
      state.loading = false;
      state.items = action.payload; // Set fetched todos
    }).addCase(fetchToDos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }).addCase(addToDo.fulfilled, (state, action) => {
      state.items.push(action.payload); // Add the new todo
    }).addCase(editToDo.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload.updatedToDo
      }
    }).addCase(deleteToDo.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload.id)
    })
  }

})

export const selectToDos = (state) => state.toDos.items
export default toDoSlice.reducer;