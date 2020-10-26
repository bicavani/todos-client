import React, {useState} from 'react'
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
import { List } from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = theme => ({
  root: {
    position: 'fixed',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    paddingTop: theme.spacing(7),
    zIndex: 80,
    width: '85%',
    background: theme.palette.grey[100],
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
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  }

})

const TodoUpdate = (props) => {
  const {classes, todo, isOpen, handleClose} = props
  const [title, setTitle] = useState(todo.title)

  const handleInputChange = e => setTitle(e.target.value)
  const renderIcon = () => 
    todo.isComplete ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon /> 

  return (
    <div className={clsx(classes.root, 
      { [classes.show]: isOpen },
      { [classes.hide]: !isOpen }
    )}>
      <List key={todo.id} className={classes.list}>
        <ListItem className={classes.paper}>
          <ListItemIcon>
            {renderIcon()}
          </ListItemIcon>
          <TextField
            id="todoTitle"
            placeholder=""
            multiline
            fullWidth
            onChange={handleInputChange}
            value={title}
            className={clsx({[classes.textLineThrough]: todo.isComplete})}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="important">
              <StarBorderIcon />
            </IconButton>
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
          />
        </ListItem>
        
        <ListItem  
          role={undefined} 
          dense button
          className={classes.paper}
        >
          <ListItemIcon>
            <FlareIcon />
          </ListItemIcon>
          <ListItemText  
            primary="Thêm vào ngày của tôi" 
          />
        </ListItem>
        <ListItem  
          role={undefined} 
          dense button 
          className={classes.paper}
        >
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText  
            primary="Nhắc tôi" 
          />
        </ListItem>
        <ListItem  
          role={undefined} 
          dense button 
          className={classes.paper}
        >
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          <ListItemText  
            primary="Thêm ngày đến hạn" 
          />
        </ListItem>
        <div className={classes.buttons}>
          <IconButton aria-label="delete" onClick={handleClose}>
            <ArrowBackIosIcon />
          </IconButton>
          <div style={{display: 'flex'}}>
            <Button
            variant="contained"
            color="primary"
            size="small"
            style={{marginRight: 4}}
            className={classes.button}
            startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div> 
          
        </div>   
      </List>
    </div>
  )

}

export default withStyles(styles)(TodoUpdate)