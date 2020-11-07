import { Box, withStyles } from '@material-ui/core'
import React from 'react'
import AlertTodo from './AlertTodo'
import PropTypes from 'prop-types'

const styles = theme => ({

})

const AlertTodosList = props => {
  const { todoIds } = props
  const content = todoIds.map(todoId => <AlertTodo key={todoId} todoId={todoId} />)
  return (
    <Box
      width={{ xs: '90%', sm: '60%', md: '25%' }}
      position="fixed"
      bottom={0}
      right={{ xs: '5%', sm: '38%', md: '36%' }}
      zIndex={99}
    >
      {content}
    </Box>
  )
}

export default withStyles(styles)(AlertTodosList)

AlertTodosList.propTypes = {
  todoIds: PropTypes.array
}