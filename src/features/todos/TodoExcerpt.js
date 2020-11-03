import React, { useState, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { selectTodoById, updateTodo } from './todosSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useLocation } from 'react-router-dom';
import { TasksPageContext } from '../../pages/TasksPage'
import ExpDate from './ExpDate';
import { Box, Tooltip } from '@material-ui/core';
import MyDayInfo from './MyDayInfo';


const styles = theme => ({
  borderBottom: {
    borderBottom: "1px solid " + [theme.palette.grey[400]],
  },
  textLineThrough: {
    textDecoration: 'line-through',
    opacity: 0.5
  },
  padding16: {
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(2),

    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),

    }
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    flexGrow: 1
  },
  bgGrey: {
    backgroundColor: theme.palette.grey[300],
  },
  cursor: {
    cursor: 'pointer'
  },
})

let TodoExcerpt = (props) => {
  const { todoId, classes } = props

  const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')

  const { openUpdateTodoForm } = useContext(TasksPageContext)

  const location = useLocation()
  const dispatch = useDispatch()

  const todo = useSelector(state => selectTodoById(state, todoId))

  const isTodoExcerptClicked = () => {
    const { pathname } = location

    return pathname.indexOf(todoId) !== -1
  }
  const handleTodoUpdate = async (todoUpdate) => {
    try {
      setUpdateRequestStatus('pending')
      const resultAction = await dispatch(
        updateTodo({
          todoId,
          todoUpdate
        })
      )
      unwrapResult(resultAction)
    } catch (error) {
      console.log('Failed to update the todo: ', error)
    } finally {
      setUpdateRequestStatus('idle')
    }
  }
  const handleIconCheckClick = () => {
    handleTodoUpdate({ isComplete: !todo.isComplete })
  }
  const handleIconStarClick = () => {
    let todoUpdate = { isImportant: !todo.isImportant }
    if (!todo.notification) {
      todoUpdate = {
        isImportant: !todo.isImportant,
        notification: !todo.isImportant
      }
    }
    handleTodoUpdate(todoUpdate)
  }
  const handleLinkClick = e => openUpdateTodoForm()

  const renderIcon = () => {
    return todo.isComplete ?
      <CheckCircleIcon className={classes.cursor} color="primary" /> :
      <RadioButtonUncheckedIcon className={classes.cursor} color="secondary" />
  }

  return (
    <ListItem
      role={undefined}
      key={todoId}
      dense button
      className={clsx(classes.borderBottom, {
        [classes.bgGrey]: isTodoExcerptClicked()
      })}
    >
      <ListItemIcon onClick={handleIconCheckClick}>
        {renderIcon()}
      </ListItemIcon>
      <Link
        to={{
          pathname: `/tasks/id/${todoId}`,
          state: { from: location.pathname }
        }}
        className={classes.link}
        onClick={handleLinkClick}
      >
        <Box>
          <ListItemText
            primary={todo.title}
            className={clsx(classes.text, {
              [classes.textLineThrough]: todo.isComplete
            })}
          />
          <Box display="flex" flexDirection={{xs: 'column', sm: 'row'}} flexWrap={{sm: 'wrap'}} >
            
            <ExpDate expDate={todo.expDate} />
            <MyDayInfo myDay={todo.isMyDate} />
          </Box>
        </Box>
      </Link>
      <ListItemSecondaryAction className={classes.padding16}>
        <Link
          to={{
            pathname: `/tasks/id/${todoId}`,
            state: { from: location.pathname }
          }}
          onClick={handleLinkClick}
        >
          <IconButton edge="end" aria-label="description">
            <Tooltip title="Comment">
              <CommentIcon color={todo.description ? 'primary' : 'disabled'} />
            </Tooltip>
          </IconButton>
        </Link>
        <IconButton edge="end" aria-label="important" onClick={handleIconStarClick}>
          <Tooltip title="Đánh dấu tác vụ là quan trọng">
            <StarBorderIcon color={todo.isImportant ? 'primary' : 'disabled'} />
          </Tooltip>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

TodoExcerpt = React.memo(TodoExcerpt)

export default withStyles(styles)(TodoExcerpt)