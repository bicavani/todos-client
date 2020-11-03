import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => {

}

const BtnDeleteTodo = props => {
  const {todoTitle, handleClickAgree} = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex">
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`"${todoTitle}" sẽ bị xóa vĩnh viễn.`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn sẽ không thể hoàn tác hành động này.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" size="small">
            Hủy bỏ
          </Button>
          <Button onClick={handleClickAgree} variant="contained" color="secondary" size="small" autoFocus>
            Xóa tác vụ
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
}

export default withStyles(styles)(BtnDeleteTodo)