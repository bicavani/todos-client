import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BtnDeleteAll from './BtnDeleteAll';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    position: 'relative',
    flexShrink: 0,
    flexGrow: 1,
    paddingTop: theme.spacing(9),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(11),
      paddingLeft: theme.spacing(2),
      flexShrink: 1,
    }
  },
})

const Todos = (props) => {
  const { classes, children } = props

  return (
    <Paper
      elevation={0}
      className={classes.root}
    >
      {children}
      <Box display="flex" justifyContent="flex-end" padding={5} >
        <BtnDeleteAll />
      </Box>
    </Paper>
  )
}

export default withStyles(styles)(Todos)

Todos.propsTypes = {
  classes: PropTypes.object,
  children: PropTypes.array
}