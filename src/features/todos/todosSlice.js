import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const todosAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = todosAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const res = await axios.get('/todos')
    return res.data.todos
  }
)

export const addNewTodo = createAsyncThunk(
  'todo/addNewTodo',
  async (initialTodo) => {
    const res = await axios.post('/add-todo', initialTodo)
    return res.data.todo
  }
)

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoUpdated(state, action) {
      const {id, title, description} = action.payload
      const existingTodo = state.entities[id]

      existingTodo.title = title
      existingTodo.description = description
    }
  },
  extraReducers: {}
})

export default todosSlice.reducer