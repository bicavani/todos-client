import React from 'react'
import 'date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Box, ListItemSecondaryAction, Paper, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { add, compareAsc, format, parseISO } from 'date-fns'
import CloseIcon from '@material-ui/icons/Close';
import BtnSaveDate from './BtnSaveDate'

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

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [openDateInput, setOpenDateInput] = React.useState(false)
  const [text, setText] = React.useState(expDateParsed || "Thêm ngày đến hạn")

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  const handleopenDateInput = () => setOpenDateInput(!openDateInput)

  //Add minutes and hours to selectedDate => format selectedDate(mm/dd/yy 23:59:ss)
  const selectedDateAdded = add(selectedDate, {
    hours: 23 - selectedDate.getHours(),
    minutes: 59 - selectedDate.getMinutes(),
  })
  const isCheckDate = checkDate(selectedDateAdded) !== 1

  const handleSaveDate = (e) => {
    const date = format(selectedDateAdded, 'dd/MM/yyyy')
    setText(`Đến hạn vào ${date}`)
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
          <DateRangeIcon color={expDate ? 'primary' : 'disabled'} />
        </ListItemIcon>
        <ListItemText
          primary={text}
        />
        <ListItemSecondaryAction style={{ cursor: 'pointer' }}>
          {expDate && <CloseIcon fontSize="small" onClick={handleIconCloseClick} />}
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
        <BtnSaveDate
          isCheckDate={isCheckDate}
          handleSaveDate={handleSaveDate}
        />
      </Paper>
    </Box>
  )
}

export default withStyles(styles)(DatePicker)