import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { addNewTodo } from './todosSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: 0,
    width: '95%',
  },
  cursor: {
    cursor: 'pointer'
  }
})

const AddTodoForm = (props) => {
  const [title, setTitle] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [isFocusForm, setIsFocusForm] = useState(false)

  const { classes, placeholderInput, option } = props

  const dispatch = useDispatch()

  useEffect(
    () => {
      const handleWindowClick = (e) => {
        if (e.target.id !== 'addTodo' &&
          e.target.tagName !== 'path' &&
          e.target.id !== 'addTodo-Label' &&
          e.target.id !== 'addTodo-Input' &&
          e.target.id !== 'addIcon') {
          setIsFocusForm(false)
        }
      }

      if (isFocusForm) {
        window.addEventListener('click', handleWindowClick)
      }
      return () => window.removeEventListener('click', handleWindowClick)
    },
    [isFocusForm, setIsFocusForm]
  )

  const handleInputChange = e => setTitle(e.target.value)
  const handleFormClick = e => {
    setIsFocusForm(true)
    document.getElementById('addTodo-Input').focus()
  }
  const canSubmit = Boolean(title) && addRequestStatus === 'idle'
  const handleFormSubmit = async () => {
    if (canSubmit) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTodo({
            title: title.trim(),
            isComplete: false,
            ...option
          })
        )
        unwrapResult(resultAction)
        setTitle('')
      } catch (error) {
        console.log('Failed to save the todo: ', error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
  const handleInputKeyUp = e => {
    e.preventDefault()
    if (e.keyCode === 13) {
      handleFormSubmit()
    }
  }
  const renderIcon = () => {
    if (isFocusForm) {
      return <RadioButtonUncheckedIcon />
    } else {
      return <AddIcon id="addIcon" />
    }
  }

  return (
    <FormControl
      id="addTodo"
      className={classes.formControl}
      onClick={handleFormClick}>
      <InputLabel id="addTodo-Label" htmlFor="addTodo">{placeholderInput}</InputLabel>
      <Input
        value={title}
        id="addTodo-Input"
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
        startAdornment={
          <InputAdornment id="addTodo-Ador" position="start" className={classes.cursor}>
            {renderIcon()}
          </InputAdornment>
        }
      />
    </FormControl>
  )

}

export default withStyles(styles)(AddTodoForm)

AddTodoForm.propTypes = {
  classes: PropTypes.object,
  placeholderInput: PropTypes.string,
  option: PropTypes.object
}