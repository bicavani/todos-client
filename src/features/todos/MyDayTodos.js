import { Box, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import AddTodoForm from './AddTodoForm'
import { selectAllTodos } from './todosSlice'
import TodosList from './TodosList'
import { format } from 'date-fns'

const styles = theme => ({
  caption: {
    marginLeft: theme.spacing(1),
    opacity: 0.8
  }
})

const MyDayTodos = props => {
  const { classes } = props
  const todos = useSelector(selectAllTodos)
  const today = format(new Date(), 'E, LLL do yyyy')

  const todosCreatedToday = todos.filter(todo => todo.isMyDate)
  const todosIds = todosCreatedToday.map(todo => todo._id)
  return (
    <Box>
      <Box mb={3}> 
        <Typography variant="h6" color="primary" >Ngày của tôi</Typography>
        <Typography className={classes.caption} variant="caption" >{today}</Typography>
      </Box>
      <AddTodoForm
        placeholderInput="Thêm tác vụ"
      />
      <TodosList todosIds={todosIds} />
    </Box>
  )
}

export default withStyles(styles)(MyDayTodos)