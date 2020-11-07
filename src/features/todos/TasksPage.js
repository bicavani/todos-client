import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom'
import MenuLeft from '../../app/MenuLeft';
import Todos from './Todos';
import UpdateTodoForm from './UpdateTodoForm';
import { Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import { selectTodoIds } from './todosSlice';
import AddTodoForm from './AddTodoForm'
import TodosList from './TodosList'
import ResultSearchList from './ResultSearchList';
import ImportantTodos from './ImportantTodos';
import PlannedTodos from './PlannedTodos';
import MyDayTodos from './MyDayTodos';
import PropTypes from 'prop-types';

const TasksPage = (props) => {
  const { searchTerm, changeSearchTerm, link, changeLink } = props

  const todosIds = useSelector(selectTodoIds)

  return (
    <Box display="flex" >
      <MenuLeft
        changeLink={changeLink}
        changeSearchTerm={changeSearchTerm}
      />
      <Todos>
        {link === 'tasks' && (
          <>
            <Typography variant="h6" color="primary" style={{ marginBottom: 16 }} >
              Tác vụ
              </Typography>
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
  )
}

export default TasksPage

TasksPage.propTypes = {
  searchTerm: PropTypes.string,
  changeSearchTerm: PropTypes.func,
  link: PropTypes.string,
  changeLink: PropTypes.func
}