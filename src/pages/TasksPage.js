import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom'
import MenuLeft from '../app/MenuLeft';
import Todos from '../features/todos/Todos';
import UpdateTodoForm from '../features/todos/UpdateTodoForm';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, selectTodoIds } from '../features/todos/todosSlice';
import AddTodoForm from '../features/todos/AddTodoForm'
import TodosList from '../features/todos/TodosList'
import ResultSearchList from '../features/todos/ResultSearchList';
import ImportantTodos from '../features/todos/ImportantTodos';
import PlannedTodos from '../features/todos/PlannedTodos';
import MyDayTodos from '../features/todos/MyDayTodos';


export const TasksPageContext = React.createContext()

const TasksPage = (props) => {
  const [isUpdateTodoFormOpen, setIsUpdateTodoFormOpen] = useState(false)

  const { searchTerm, changeSearchTerm, link, changeLink } = props
  const todosStatus = useSelector(state => state.todos.status)

  const dispatch = useDispatch()

  useEffect(
    () => {
      if (todosStatus === 'idle') {
        dispatch(fetchTodos())
      }
    }, [todosStatus, dispatch]
  )

  const todosIds = useSelector(selectTodoIds)

  const openUpdateTodoForm = () => setIsUpdateTodoFormOpen(true)
  const closeUpdateTodoForm = () => setIsUpdateTodoFormOpen(false)

  return (
    <TasksPageContext.Provider
      value={{
        isUpdateTodoFormOpen: isUpdateTodoFormOpen,
        openUpdateTodoForm: openUpdateTodoForm,
        closeUpdateTodoForm: closeUpdateTodoForm
      }}
    >
      <Box display="flex" >
        <MenuLeft
          changeLink={changeLink}
          changeSearchTerm={changeSearchTerm}
        />
        <Todos>
          {link === 'tasks' && (
            <>
              <AddTodoForm
                placeholderInput="Thêm tác vụ"
              />
              <TodosList
                todosIds={todosIds}
              />
            </>)}
          {link === 'search' && (

            <ResultSearchList
              searchTerm={searchTerm}
            />
          )}
          {link === 'planned' && (
            <PlannedTodos />
          )}
          {link === 'important' && (
            <ImportantTodos />
          )}
          {link === 'myday' && (
            <MyDayTodos />
          )}
        </Todos>



        <Switch>
          {todosIds.map(todoId => (
            <Route
              key={todoId}
              todoId={todoId}
              todosIds={todosIds}
              exact
              path={`/tasks/id/${todoId}`}
            >
              <UpdateTodoForm todoId={todoId} />
            </Route>
          ))}
        </Switch>
      </Box>
    </TasksPageContext.Provider>
  )
}

export default TasksPage