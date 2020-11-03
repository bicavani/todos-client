import { Box, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import TodosList from './TodosList'
import { selectAllTodos } from './todosSlice'
import {useSelector} from 'react-redux'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const styles = theme => ({

})

const ResultSearchList = props => {
  const {searchTerm, classes} = props
  const todos = useSelector(selectAllTodos)

  const todosMatchSearchTerm = todos.filter(todo =>
      todo.title.indexOf(searchTerm) !== -1
    )

  const todosIds = todosMatchSearchTerm.map(todo => todo._id)  

  return (
    <Box>
      <Typography variant="h6" color="primary" style={{marginBottom: 16}} >
        {`Đang tìm kiếm "${searchTerm}"`}
      </Typography>
      <Typography variant="body1">
        <b>Tác vụ</b>
      </Typography>
      <TodosList 
        todosIds={todosIds}
      />
      {todosIds.length === 0 && (
        <Box display="flex" alignItems="center">
          <Typography variant="body2">
            Không tìm thấy nội dung bạn đang tìm !
          </Typography>
          <SentimentVeryDissatisfiedIcon />
          <SentimentVeryDissatisfiedIcon />
        </Box>
      )}
    </Box>
  )
}

export default withStyles(styles)(ResultSearchList)