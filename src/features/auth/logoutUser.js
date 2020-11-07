import { signinUser } from "./authSlice"
import { setAuthToken } from "./setAuthToken"


export const logoutUser = (dispatch, history) => {
  localStorage.removeItem('jwtToken')

  setAuthToken(false)
  dispatch(signinUser({}))
  history.push('/')
}