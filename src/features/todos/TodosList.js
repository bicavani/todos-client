import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TodoExcerpt from './TodoExcerpt'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import SkeletonTodo from '../../app/SkeletonTodo'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
});

const TodoList = props => {
  const { classes, todosIds } = props
  const todosStatus = useSelector(state => state.todos.status)
  const error = useSelector(state => state.todos.error)

  let content
  if (todosStatus === 'loading') {
    content = <SkeletonTodo />
  } else if (todosStatus === 'succeeded') {
    content = todosIds.map(todoId =>
      <TodoExcerpt
        key={todoId}
        todoId={todoId}
      />
    )
  } else if (todosStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <List className={classes.root}>
      {content}
    </List>
  );
}

export default withStyles(styles)(TodoList)

TodoList.propTypes = {
  classes: PropTypes.object,
  todosIds: PropTypes.array
}