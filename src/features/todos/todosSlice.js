import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = 'http://localhost:4000/todos'

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo._id,  //_id: id by mongodb create auto
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initialState = todosAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const res = await axios.get(URL)
    return res.data.todos
  }
)

export const deleteAllTodos = createAsyncThunk(
  'todos/deleteAllTodos',
  async () => {
    const res = await axios.delete(`${URL}/delete-allTodos`)
    return res.data.todos
  }
)

export const addNewTodo = createAsyncThunk(
  'todo/addNewTodo',
  async (initialTodo) => {
    const res = await axios.post(`${URL}/add-todo`, initialTodo)
    return res.data.todo
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async ({ todoId, todoUpdate }) => {
    const res = await axios.put(`${URL}/edit-todo/${todoId}`, todoUpdate)
    return res.data.todos
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (todoId) => {
    const res = await axios.delete(`${URL}/delete-todo/${todoId}`)
    return res.data.todos
  }
)

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      todosAdapter.upsertMany(state, action.payload)
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewTodo.fulfilled]: todosAdapter.addOne,
    [updateTodo.fulfilled]: todosAdapter.setAll,
    [deleteTodo.fulfilled]: todosAdapter.setAll,
    [deleteAllTodos.fulfilled]: todosAdapter.setAll,
  }
})

export default todosSlice.reducer

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds
} = todosAdapter.getSelectors(state => state.todos)