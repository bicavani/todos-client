import { Box, Button, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core'
import clsx from 'clsx'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectTodoById, updateTodo } from './todosSlice'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { OpenUpdateTodoContext } from '../../pages/DashBoard'
import { unwrapResult } from '@reduxjs/toolkit'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PropTypes from 'prop-types'

const styles = theme => ({
  alert: {
    backgroundColor: theme.palette.background.paper
  },
  textLineThrough: {
    textDecoration: 'line-through',
    opacity: 0.5
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    flexGrow: 1
  },
  show: {
    display: "flex"
  },
  hide: {
    display: 'none'
  },
  notiIcon: {
    fontSize: '0.8rem',
    marginRight: theme.spacing(1),
    opacity: 0.6,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem'
    }
  },
})

let AlertTodo = props => {
  const { classes, todoId } = props
  const { openUpdateTodoForm } = useContext(OpenUpdateTodoContext)
  const dispatch = useDispatch()

  const todo = useSelector(state => selectTodoById(state, todoId))
  const timer = parseISO(todo.remindTime)
  const millis = differenceInMilliseconds(timer, new Date())
  const [open, setOpen] = useState(millis <= 0)

  const openAlert = () => setOpen(true)

  useEffect(() => {
    let idTimeout
    if (millis > 0) {
      idTimeout = setTimeout(openAlert, millis)
    }
    return () => clearTimeout(idTimeout)

  }, [millis])

  const deleteRemind = async () => {
    try {
      const resultAction = await dispatch(
        updateTodo({
          todoId,
          todoUpdate: { ...todo, remindTime: '' }
        })
      )
      unwrapResult(resultAction)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLinkClick = () => {
    setOpen(false)
    openUpdateTodoForm()
  }

  const handleCloseAlert = () => {
    deleteRemind()
  }

  const handleSetTimeoutAlert = () => {
    // clearTimeout(idTimeout)
    // idTimeout = setTimeout(openAlert, millis + 5*60*1000)
  }

  const renderIcon = () => {
    return todo.isComplete ?
      <CheckCircleIcon className={classes.cursor} color="primary" /> :
      <RadioButtonUncheckedIcon className={classes.cursor} color="secondary" />
  }

  return (

    <Box
      className={clsx(classes.alert,
        { [classes.show]: open },
        { [classes.hide]: !open }
      )}
      boxShadow={5}
      mb={1}
      alignItems="center"
    >
      <Link
        to={{
          pathname: `/tasks/id/${todoId}`,
        }}
        className={classes.link}
        onClick={handleLinkClick}
      >
        <ListItem
          role={undefined}
          key={todoId}
          dense button
        >

          <ListItemIcon>
            {renderIcon()}
          </ListItemIcon>
          <Box>
            <ListItemText
              primary={todo.title}
              className={clsx(classes.text, {
                [classes.textLineThrough]: todo.isComplete
              })}
            />
            <NotificationsActiveIcon className={classes.notiIcon} color="secondary" />
          </Box>
        </ListItem>
      </Link>

      <Box display="flex" flexDirection="column" borderLeft={1} >
        <Box borderBottom={1}>
          <Button color="secondary" onClick={handleSetTimeoutAlert}>
            Báo lại
          </Button>
        </Box>
        <Button onClick={handleCloseAlert} >Bỏ</Button>
      </Box>
    </Box>
  )
}

AlertTodo = React.memo(AlertTodo)
export default withStyles(styles)(AlertTodo)

AlertTodo.propTypes = {
  classes: PropTypes.object,
  todoId: PropTypes.string
}