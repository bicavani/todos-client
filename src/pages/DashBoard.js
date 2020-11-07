import { withStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import TasksPage from '../features/todos/TasksPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, selectAllTodos } from '../features/todos/todosSlice';
import AlertTodosList from '../features/todos/AlertTodosList';
import NavBar from '../app/NavBar';
import PropTypes from 'prop-types'
import { getUser } from '../features/auth/authSlice';

const styles = theme => ({

})

export const OpenUpdateTodoContext = React.createContext()

const DashBoard = props => {
  const { prefersDarkMode, switchDarkMode } = props

  const [searchTerm, setSearchTerm] = useState('')
  const [isUpdateTodoFormOpen, setIsUpdateTodoFormOpen] = useState(false)

  const todos = useSelector(selectAllTodos)
  const todosStatus = useSelector(state => state.todos.status)

  const dispatch = useDispatch()

  useEffect(
    () => {
      if (todosStatus === 'idle') {
        dispatch(fetchTodos())
        dispatch(getUser())
      }
    }, [todosStatus, dispatch]
  )

  const { pathname } = window.location
  const initialLink = () => {
    const match = pathname.match(/tasks\/\w+/g)
    if (match === null) return 'tasks'
    else if (match[0] === 'tasks/planned') return 'planned'
    else if (match[0] === 'tasks/important') return 'important'
    else if (match[0] === 'tasks/myday') return 'myday'
    else return 'tasks'
  }
  const [link, setLink] = useState(initialLink())

  const openUpdateTodoForm = () => setIsUpdateTodoFormOpen(true)
  const closeUpdateTodoForm = () => setIsUpdateTodoFormOpen(false)

  const changeSearchTerm = (text) => setSearchTerm(text)
  const changeLink = link => setLink(link)
  const todosHasRemind = todos.filter(todo => todo.remindTime)
  const todoIdsHasRemind = todosHasRemind.map(todo => todo._id)

  return (
    <OpenUpdateTodoContext.Provider
      value={{
        isUpdateTodoFormOpen: isUpdateTodoFormOpen,
        openUpdateTodoForm: openUpdateTodoForm,
        closeUpdateTodoForm: closeUpdateTodoForm
      }}
    >
      <NavBar
        darkMode={prefersDarkMode}
        switchDarkMode={switchDarkMode}
        changeSearchTerm={changeSearchTerm}
        searchTerm={searchTerm}
        changeLink={changeLink}
        link={link}
      />
      <AlertTodosList todoIds={todoIdsHasRemind} />
      <TasksPage
        link={link}
        changeLink={changeLink}
        searchTerm={searchTerm}
        changeSearchTerm={changeSearchTerm} />
    </OpenUpdateTodoContext.Provider>
  )
}

export default withStyles(styles)(DashBoard)

DashBoard.propTypes = {
  prefersDarkMode: PropTypes.bool,
  switchDarkMode: PropTypes.func
}