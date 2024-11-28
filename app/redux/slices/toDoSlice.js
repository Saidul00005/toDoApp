import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchToDos = createAsyncThunk('/toDoList', async () => {
  const response = await fetch('api/toDoList')
  return response.json()
})


export const addToDo = createAsyncThunk('/addNewItem', async (newToDo) => {
  const response = await fetch('/api/addToDo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newToDo),
  });

  return await response.json();
})

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
      state.loading = false;
      state.items = action.payload; // Set fetched todos
    }).addCase(fetchToDos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }).addCase(addToDo.fulfilled, (state, action) => {
      state.items.push(action.payload); // Add the new todo
    });
  }

})

export const selectToDos = (state) => state.toDos.items
export default toDoSlice.reducer;