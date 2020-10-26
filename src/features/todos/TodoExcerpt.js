import React from 'react'
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

const styles = theme => ({
  borderBottom: {
    borderBottom: "1px solid "+ [theme.palette.grey[400]],
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
  }
})

const TodoExcerpt = (props) => {
    const {todo, classes, handleTodoUpdateOpen} = props

    const renderIcon = () => {
      return todo.isComplete ?
        <CheckCircleIcon /> : <RadioButtonUncheckedIcon />
    }

    return (
      <ListItem key={todo.id} 
        role={undefined} 
        dense button 
        className = {classes.borderBottom}
      >
        <ListItemIcon>
          {renderIcon()}
        </ListItemIcon>
        <ListItemText id={todo.id} 
          primary={todo.title} 
          className={clsx({[classes.textLineThrough]: todo.isComplete})}
          onClick={handleTodoUpdateOpen}
        />
        <ListItemSecondaryAction className={classes.padding16}>
          <IconButton edge="end" aria-label="description" onClick={handleTodoUpdateOpen}>
            <CommentIcon />
          </IconButton>
          <IconButton edge="end" aria-label="important">
            <StarBorderIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
}

export default withStyles(styles)(TodoExcerpt)