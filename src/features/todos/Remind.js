import React from 'react'
import 'date-fns';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, Button, ListItemSecondaryAction, Paper, Typography, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns'
import CloseIcon from '@material-ui/icons/Close';
import { checkDate } from './DatePicker';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import DateTimePicker from 'react-datetime-picker'
import PropTypes from 'prop-types'


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
  let time = null
  let date = null

  if (remindTime) {
    time = format(parseISO(remindTime), 'HH : mm')
    date = format(parseISO(remindTime), 'E, LLL do yyyy')
  }
  const initialHeadText = () => {
    if (time) return `Nhắc tôi vào ${time}`
    else return 'Nhắc tôi'
  }

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [openDateInput, setOpenDateInput] = React.useState(false)
  const [headText, setHeadText] = React.useState(initialHeadText())
  const [captionText, setCaptionText] = React.useState(date)

  const handleopenDateInput = () => setOpenDateInput(!openDateInput)
  let newTime, newDate
  let canSaveDate

  if (selectedDate) {
    newTime = format(selectedDate, 'HH : mm')
    newDate = format(selectedDate, 'E, LLL do yyyy')

    canSaveDate =
      checkDate(selectedDate) !== 1 &&
      (newTime !== time || newDate !== date)
  } else canSaveDate = false

  const handleSaveDate = (e) => {
    setHeadText(`Nhắc tôi vào ${newTime}`)
    setCaptionText(newDate)
    setOpenDateInput(false)
    handleChangeRemind(selectedDate)
  }

  const handleIconCloseClick = () => {
    setHeadText("Nhắc tôi")
    setCaptionText('')
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
          <NotificationsActiveIcon color={captionText ? 'secondary' : 'disabled'} />
        </ListItemIcon>
        <ListItemText>
          <Box>
            <div>
              {headText}
            </div>
            <Typography variant="caption">
              {captionText}
            </Typography>
          </Box>
        </ListItemText>
        <ListItemSecondaryAction style={{ cursor: 'pointer' }}>
          {(remindTime || captionText) && <CloseIcon fontSize="small" onClick={handleIconCloseClick} />}
        </ListItemSecondaryAction>
      </ListItem>
      <Paper elevation={2}
        className={clsx(classes.dateInput,
          { [classes.show]: openDateInput },
          { [classes.hide]: !openDateInput }
        )}
      >
        <DateTimePicker
          onChange={setSelectedDate}
          value={selectedDate}
        />
        <Button
          disabled={!canSaveDate}
          variant="contained"
          color="primary"
          onClick={handleSaveDate}
        >
          Save
      </Button>
      </Paper>
    </Box>
  )
}

export default withStyles(styles)(Remind)

Remind.propTypes = {
  classes: PropTypes.object,
  handleChangeRemind: PropTypes.func,
  remindTime: PropTypes.string
}