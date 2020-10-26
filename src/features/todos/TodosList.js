import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TodoExcerpt from './TodoExcerpt'
import TodoUpdate from './TodoUpdate';


const styles = theme => ({
  root: {
    width: '100%',
  },
});

const TodoList = (props) => {
  const {classes, 
      isTodoUpdateOpen, 
      handleTodoUpdateOpen,
      handleTodoUpdateClose} = props;

  const todos = [
    {
      id: 1,
      title: 'code todo app',
      content: 'code full client and server',
      isComplete: false
    },
  ]

  const listTodo = todos.map(todo => {
    return (
      <div>
        <TodoExcerpt 
          key={todo.id} 
          todo={todo} 
          handleTodoUpdateOpen={handleTodoUpdateOpen}  
        />
        <TodoUpdate 
          key={todo.id} 
          todo={todo} 
          isOpen={isTodoUpdateOpen}
          handleClose={handleTodoUpdateClose}
        />
      </div>
    )
  })

  return (
    <List className={classes.root}>
        {listTodo}
    </List>
  );
}

export default withStyles(styles)(TodoList)