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

const TodosPlanned = props => {
  const {classes} = props
  const todos = useSelector(selectAllTodos)

  const todosHasExpDate = todos.filter(todo => todo.expDate)
  const todosIds = todosHasExpDate.map(todo => todo._id) 
  return (
    <Box>
      <Typography className={classes.mb} variant="h6" color="primary" >Đã lập kế hoạch</Typography>
      <AddTodoForm 
        placeholderInput="Thêm tác vụ hết hạn vào hôm nay" 
        option={{expDate: new Date()}}
      />
      <TodosList todosIds={todosIds} />
    </Box>
  )
}

export default withStyles(styles)(TodosPlanned)