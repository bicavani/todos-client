import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import { setAuthToken } from './features/auth/setAuthToken';
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { signinUser } from './features/auth/authSlice';
import { logoutUser } from './features/auth/logoutUser';
import PrivateRoute from './app/PrivateRoute'


function App() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

  let theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          background: {
            grey: prefersDarkMode ? '#303030' : '#e0e0e0'
          }
        },
      }),
    [prefersDarkMode]
  );
  const switchDarkMode = () => setPrefersDarkMode(!prefersDarkMode)

  theme = responsiveFontSizes(theme)

  const dispatch = useDispatch()

  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken
    setAuthToken(token)

    const decoded = jwt_decode(token)
    dispatch(signinUser(decoded))

    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      logoutUser(dispatch)

      window.location.href = "/signin"
    }
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="App">
            <Route exact path="/" component={Signin} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Switch>
              <PrivateRoute path='/tasks'>
                <DashBoard
                  prefersDarkMode={prefersDarkMode}
                  switchDarkMode={switchDarkMode}
                />
              </PrivateRoute>
              <Redirect to="/" />
            </Switch>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}

export default App;
