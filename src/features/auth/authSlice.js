import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Axios from "axios"
import empty from 'is-empty'

const URL = 'http://localhost:4000'

const initialState = {
  isAuthenticated: false,
  user: {},
  message: {}
}
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (initialUser) => {
    try {
      const res = await Axios.post(`${URL}/user/signup`, initialUser)
      return res.data
    } catch (error) {
      return error.response.data
    }
  }
)
export const getUser = createAsyncThunk(
  'auth/getUser',
  async () => {
    const res = await Axios.get(`${URL}/user/me`)
    return res.data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signinUser(state, action) {
      state.isAuthenticated = !empty(action.payload)
    },
    setUser(state, action) {
      state.user = action.payload
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.message = action.payload
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload
    },
  }
})
export const { signinUser, setUser } = authSlice.actions

export default authSlice.reducer