import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = useSelector(state => state.auth.isAuthenticated)

  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
          children
        ) : (
            <Redirect to="/signin" />
          )
      }
    />
  )
}

export default PrivateRoute