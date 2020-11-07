import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { selectTodoById } from './todosSlice'
import { useSelector } from 'react-redux'
import { Box, Typography, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = theme => ({
  timeInfo: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    opacity: 0.7,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  }
})

const TimeInfo = ({ classes, todoId }) => {
  const todo = useSelector(state => selectTodoById(state, todoId))
  const timeCreate = todo.createdAt
  const timeUpdate = todo.updatedAt
  let createAgo = ''
  let updateAgo = ''
  if (timeCreate && timeUpdate) {
    const createPeriod = formatDistanceToNow(parseISO(timeCreate))
    const updatePeriod = formatDistanceToNow(parseISO(timeUpdate))
    createAgo = `${createPeriod} ago`
    updateAgo = `${updatePeriod} ago`
  }

  return (
    <Box className={classes.timeInfo}>
      <Typography variant="caption">
        Created: <i>{createAgo}</i>
      </Typography>
      <Typography variant="caption">
        Last updated: <i>{updateAgo}</i>
      </Typography>
    </Box>
  )

}

export default withStyles(styles)(TimeInfo)

TimeInfo.propTypes = {
  classes: PropTypes.object,
  todoId: PropTypes.string
}