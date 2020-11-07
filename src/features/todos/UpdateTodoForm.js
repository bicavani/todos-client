import React, { useContext, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx'
import { List, Box } from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, selectTodoById, updateTodo } from './todosSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import TimeInfo from './TimeInfo'
import DatePicker from './DatePicker'
import BtnDeleteTodo from './BtnDeleteTodo';
import Remind from './Remind';
import { OpenUpdateTodoContext } from '../../pages/DashBoard';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      width: '35%',
    },
  },
  root: {
    position: 'fixed',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    paddingTop: theme.spacing(7),
    zIndex: 80,
    width: '86%',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('sm')]: {
      width: '35%',
      paddingTop: theme.spacing(9),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(10),

    }
  },
  list: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '92%',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(0),
    },
  },
  paper: {
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(1)
  },
  textLineThrough: {
    textDecoration: 'line-through',
    opacity: 0.5
  },
  padding0: {
    padding: 0,
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },

})

const UpdateTodoForm = (props) => {
  const { classes, todoId } = props
  const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')

  const todo = useSelector(state => selectTodoById(state, todoId))
  const { isUpdateTodoFormOpen, closeUpdateTodoForm } = useContext(OpenUpdateTodoContext)
  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [isMyDate, setIsMyDate] = useState(todo.isMyDate)
  const [expDate, setExpDate] = useState(todo.expDate)
  const [remindTime, setRemindTime] = useState(todo.remindTime)


  const handleTitleClick = e => setTitle(e.target.value)
  const handleDescriptionChange = e => setDescription(e.target.value)
  const handleMyDateClick = e => setIsMyDate(!isMyDate)
  const handleExpDateChange = date => setExpDate(date)
  const handleChangeRemind = date => setRemindTime(date)


  const canSave = (
    Boolean(title) &&
    updateRequestStatus === 'idle' &&
    (
      title.trim() !== todo.title.trim() ||
      description.trim() !== todo.description.trim() ||
      isMyDate !== todo.isMyDate ||
      Boolean(expDate) ||
      Boolean(remindTime)
    )
  )


  const handleSaveClick = async () => {
    if (canSave) {
      try {
        setUpdateRequestStatus('pending')
        const resultAction = await dispatch(
          updateTodo({
            todoId,
            todoUpdate:
            {
              title: title.trim(),
              description: description.trim(),
              isMyDate,
              expDate,
              remindTime
            }
          })
        )
        unwrapResult(resultAction)
        closeUpdateTodoForm()
        history.push(`/tasks/${todoId}`)
      } catch (error) {
        console.log('Failed to update the todo: ', error)
      } finally {
        setUpdateRequestStatus('idle')
      }
    }
  }
  const handleDeleteClick = async () => {
    try {
      const resultAction = await dispatch(
        deleteTodo(todoId)
      )
      unwrapResult(resultAction)
      closeUpdateTodoForm()
      history.push('/tasks')
    } catch (error) {
      console.log('Failed to update the todo: ', error)
    }
  }
  const renderIcon = () =>
    todo.isComplete ?
      <CheckCircleIcon color="primary" /> :
      <RadioButtonUncheckedIcon color="secondary" />

  if (!todo) {
    return <h2 style={{ marginTop: 300 }}> Todo not found</h2>
  }

  return (
    <Box className={isUpdateTodoFormOpen ? classes.container : ''}>
      <Box className={clsx(classes.root,
        { [classes.show]: isUpdateTodoFormOpen },
        { [classes.hide]: !isUpdateTodoFormOpen }
      )}>
        <List className={classes.list}>
          <ListItem className={classes.paper}>
            <ListItemIcon>
              {renderIcon()}
            </ListItemIcon>
            <TextField
              id="todoTitle"
              placeholder=""
              multiline
              fullWidth
              onChange={handleTitleClick}
              value={title}
              error={!Boolean(title)}
              helperText={!Boolean(title) && 'invalid title'}
            />
            <ListItemSecondaryAction>
              <StarBorderIcon color={todo.isImportant ? 'primary' : 'disabled'} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className={clsx(classes.paper, classes.padding0)}>
            <TextField
              id="todo-Description"
              label="Ghi chú..."
              multiline
              rows={4}
              placeholder="Thêm mô tả...."
              variant="outlined"
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
            />
          </ListItem>

          <ListItem
            role={undefined}
            dense button
            className={classes.paper}
            onClick={handleMyDateClick}
          >
            <ListItemIcon>
              <FlareIcon color={isMyDate ? 'primary' : 'disabled'} />
            </ListItemIcon>
            <ListItemText
              primary="Thêm vào ngày của tôi"
            />
          </ListItem>
          <DatePicker
            expDate={todo.expDate}
            handleExpDateChange={handleExpDateChange} />
          <Remind
            remindTime={todo.remindTime}
            handleChangeRemind={handleChangeRemind}
          />
          <Box display="flex" justifyContent="space-between" mt={3}>
            <IconButton aria-label="delete" onClick={closeUpdateTodoForm}>
              <ArrowBackIosIcon />
            </IconButton>
            <Box display="flex">
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 4 }}
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSaveClick}
                disabled={!canSave}
              >
                Save
              </Button>
              <BtnDeleteTodo
                todoTitle={todo.title}
                handleClickAgree={handleDeleteClick}
              />
            </Box>
          </Box>
          <Box>
            <TimeInfo todoId={todoId} />
          </Box>
        </List>
      </Box>
    </Box>
  )

}

export default withStyles(styles)(UpdateTodoForm)

UpdateTodoForm.propTypes = {
  classes: PropTypes.object,
  todoId: PropTypes.string
}