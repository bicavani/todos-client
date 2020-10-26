import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import TodosList from './TodosList';
import clsx from 'clsx';
import drawerWidth from '../../app/MenuLeft'

const styles = theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(9),
    paddingLeft: theme.spacing(9),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(11),
      paddingLeft: theme.spacing(11),
    }
  },
  todos: {
    width: '100%',
  },
  todosShiftRight: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '65%',
      marginRight: '35%'
    },
  },
  todosShiftLeft: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '88%',
      marginLeft: '12%',
    }
  },
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

const Todos = (props) => {
  const {classes, isMenuLeftOpen} = props
  const [title, setTitle] = useState('')
  const [isClickInput, setIsClickInput] = useState(false)
  const [isTodoUpdateOpen, setIsTodoUpdateOpen] = useState(false)

  useEffect(
    () => {
      const handleWindowClick = (e) => {
        if(e.target.id != 'addTodo' &&
           e.target.tagName != 'path' &&
           e.target.id != 'addTodo-Label' &&
           e.target.id != 'addTodo-Input' &&
           e.target.id != 'addIcon') {
           setIsClickInput(false) 
           }
      }

      if (isClickInput) {
        window.addEventListener('click', handleWindowClick)
      } 
      return () => window.removeEventListener('click', handleWindowClick)
    },
    [isClickInput, setIsClickInput]
  )
  
  const handleInputChange = e => setTitle(e.target.value)
  const handleInputClick = e => {
    setIsClickInput(true)
    document.getElementById('addTodo-Input').focus()
  }
  const handleTodoUpdateOpen = e => setIsTodoUpdateOpen(true)
  const handleTodoUpdateClose = e => setIsTodoUpdateOpen(false)    
  
  const renderIcon = () => {
    if (isClickInput) {
      return <RadioButtonUncheckedIcon />
    } else {
      return <AddIcon id="addIcon" />
    }
  }
  

  return (
    <Paper 
      elevation={0} 
      className={clsx(classes.root,
        {[classes.todos]: (!isMenuLeftOpen && !isTodoUpdateOpen)},
        {[classes.todosShiftRight]: isTodoUpdateOpen},
        {[classes.todosShiftLeft]: isMenuLeftOpen}
      )}
    >
      <FormControl id="addTodo" className={classes.formControl} onClick={handleInputClick}>
        <InputLabel id="addTodo-Label" htmlFor="addTodo">Thêm tác vụ</InputLabel>
        <Input
          value={title}
          id="addTodo-Input"
          onChange={handleInputChange}
          startAdornment={
            <InputAdornment id="addTodo-Ador" position="start" className={classes.cursor}>
              {renderIcon()}
            </InputAdornment>
          }
        />
      </FormControl>
      <TodosList  
        isTodoUpdateOpen={isTodoUpdateOpen}
        handleTodoUpdateOpen={handleTodoUpdateOpen} 
        handleTodoUpdateClose={handleTodoUpdateClose}
      />
    </Paper>
  )
}

export default withStyles(styles)(Todos)

