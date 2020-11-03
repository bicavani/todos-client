import React from 'react'
import 'date-fns';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, ListItemSecondaryAction, Paper, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns'
import CloseIcon from '@material-ui/icons/Close';
import BtnSaveDate from './BtnSaveDate'
import TextField from '@material-ui/core/TextField';
import { checkDate } from './DatePicker';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const styles = theme => ({
  datePicker: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    position: 'relative'
  },
  dateInput: {
    position: 'absolute',
    zIndex: 50,
    flexDirection: 'column',
    alignItems: 'flex-end',
    background: theme.palette.background.paper,
    top: theme.spacing(5),
    padding: theme.spacing(2)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  show: {
    display: 'flex',
  },
  hide: {
    display: 'none'
  }
})

const Remind = (props) => {
  const { classes, handleChangeRemind, remindTime } = props
  let remindTimeParsed = null

  if (remindTime) remindTimeParsed = format(parseISO(remindTime), 'HH : mm')

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [openDateInput, setOpenDateInput] = React.useState(false)
  const [text, setText] = React.useState(remindTimeParsed || "Nhắc tôi")

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  const handleopenDateInput = () => setOpenDateInput(!openDateInput)

  const isCheckDate = checkDate(selectedDate) !== 1

  const handleSaveDate = (e) => {
    const date = format(selectedDate, 'HH : mm')
    setText(`Nhắc tôi vào ${date}`)
    setOpenDateInput(false)
    handleChangeRemind(selectedDate)
  }

  const handleIconCloseClick = () => {
    setText("Nhắc tôi")
    handleChangeRemind(null)
  }

  return (
    <Box className={classes.datePicker}>
      <ListItem
        role={undefined}
        dense button
        className={classes.paper}
        onClick={handleopenDateInput}
      >
        <ListItemIcon>
          <NotificationsActiveIcon color={remindTime ? 'secondary' : 'disabled'} />
        </ListItemIcon>
        <ListItemText
          primary={text}
        />
        <ListItemSecondaryAction style={{ cursor: 'pointer' }}>
          {remindTime && <CloseIcon fontSize="small" onClick={handleIconCloseClick} />}
        </ListItemSecondaryAction>
      </ListItem>
      <Paper elevation={2}
        className={clsx(classes.dateInput,
          { [classes.show]: openDateInput },
          { [classes.hide]: !openDateInput }
        )}
      >
        <form className={classes.container} noValidate>
          <TextField
            id="datetime-local"
            type="datetime-local"
            value={selectedDate}
            onChange={handleDateChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <BtnSaveDate
          isCheckDate={isCheckDate}
          handleSaveDate={handleSaveDate}
        />
      </Paper>
    </Box>
  )
}

export default withStyles(styles)(Remind)