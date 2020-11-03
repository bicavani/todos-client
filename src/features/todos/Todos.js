import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    position: 'relative',
    flexShrink: 0,
    flexGrow: 1,
    paddingTop: theme.spacing(9),
    paddingLeft: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(11),
      paddingLeft: theme.spacing(1),
      flexShrink: 1,
    }
  },
})

const Todos = (props) => {
  const {classes, children} = props
  
  return (
    <Paper 
      elevation={0} 
      className={classes.root}
    > 
      {children}
    </Paper>
  )
}

export default withStyles(styles)(Todos)

