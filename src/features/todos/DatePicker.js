import React from 'react'
import 'date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Box, Button, ListItemSecondaryAction, Paper, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { add, compareAsc, format, parseISO } from 'date-fns'
import CloseIcon from '@material-ui/icons/Close';
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
  show: {
    display: 'flex',
  },
  hide: {
    display: 'none'
  }
})

export const checkDate = date => {
  return compareAsc(new Date(), date)
}

const DatePicker = (props) => {
  const { classes, handleExpDateChange, expDate } = props
  let expDateParsed = null

  if (expDate) expDateParsed = format(parseISO(expDate), 'dd/MM/yyyy')
  const initialText = () => {
    if (expDateParsed) return `Đến hạn ${expDateParsed}`
    else return 'Thêm ngày đến hạn'
  }

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [openDateInput, setOpenDateInput] = React.useState(false)
  const [text, setText] = React.useState(initialText())

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  const handleopenDateInput = () => setOpenDateInput(!openDateInput)

  //Add minutes and hours to selectedDate => format selectedDate(mm/dd/yy 23:59:ss)
  let selectedDateAdded
  let date
  let canSaveDate
  if (selectedDate) {
    selectedDateAdded = add(selectedDate, {
      hours: 23 - selectedDate.getHours(),
      minutes: 59 - selectedDate.getMinutes(),
    })

    date = format(selectedDateAdded, 'dd/MM/yyyy')

    canSaveDate =
      checkDate(selectedDateAdded) !== 1 &&
      date !== expDateParsed
  } else canSaveDate = false

  const handleSaveDate = (e) => {
    setText(`Đến hạn ${date}`)
    setOpenDateInput(false)
    handleExpDateChange(selectedDateAdded)
  }

  const handleIconCloseClick = () => {
    setText("Thêm ngày đến hạn")
    handleExpDateChange(null)
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
          <DateRangeIcon color={text !== 'Thêm ngày đến hạn' ? 'primary' : 'disabled'} />
        </ListItemIcon>
        <ListItemText
          primary={text}
        />
        <ListItemSecondaryAction style={{ cursor: 'pointer' }}>
          {(expDate || text !== 'Thêm ngày đến hạn') && <CloseIcon fontSize="small" onClick={handleIconCloseClick} />}
        </ListItemSecondaryAction>
      </ListItem>
      <Paper elevation={2}
        className={clsx(classes.dateInput,
          { [classes.show]: openDateInput },
          { [classes.hide]: !openDateInput }
        )}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
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

export default withStyles(styles)(DatePicker)

DatePicker.propTypes = {
  classes: PropTypes.object,
  handleExpDateChange: PropTypes.func,
  expDate: PropTypes.string
}