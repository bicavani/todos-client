import { Box, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import AddTodoForm from './AddTodoForm'
import { selectAllTodos } from './todosSlice'
import TodosList from './TodosList'

const styles = theme => ({
  mb: {
    marginBottom: theme.spacing(2)
  }
})

const ImportantTodos = props => {
  const {classes} = props
  const todos = useSelector(selectAllTodos)

  const todosImportant = todos.filter(todo => todo.isImportant)
  const todosIds = todosImportant.map(todo => todo._id) 
  return (
    <Box>
      <Typography className={classes.mb} variant="h6" color="primary" >Quan trọng</Typography>
      <AddTodoForm 
        placeholderInput="Thêm tác vụ Quan trọng" 
        option={{isImportant: true}}
      />
      <TodosList todosIds={todosIds} />
    </Box>
  )
}

export default withStyles(styles)(ImportantTodos)