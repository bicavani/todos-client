import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signupUser } from '../features/auth/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import isEmpty from 'is-empty';
import { useForm } from "react-hook-form";
import MessageModal from '../app/MessageModal'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Todos197
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false)

  const { message } = useSelector(state => state.auth.message) || 'Invalid Your Info'
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, errors, handleSubmit, watch } = useForm()
  const password = useRef({})
  password.current = watch('password', '')


  if (isAuth) history.push('/tasks')

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => {
    setOpenModal(false)
    if (message === 'register succeeded') history.push('/signin')
  }

  const onSubmit = async data => {
    try {
      const resultAction = await dispatch(
        signupUser(data)
      )
      unwrapResult(resultAction)
      handleOpenModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <MessageModal
        open={openModal}
        message={message}
        handleClose={handleCloseModal}
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                inputRef={register({ required: true, pattern: /^\w+$/i })}
                helperText={errors.username && 'invalid value'}
                error={!isEmpty(errors.username)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({ required: true, pattern: /^\w+@(\w+\.)+[a-zA-z]+$/ })}
                helperText={errors.email && 'invalid value!'}
                error={!isEmpty(errors.email) || (message === 'user allready exists')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({ required: true, minLength: 6 })}
                helperText={errors.password && 'invalid value'}
                error={!isEmpty(errors.password)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                inputRef={register({
                  required: true,
                  validate: value =>
                    value === password.current
                })}
                helperText={errors.confirmPassword && 'not match password'}
                error={!isEmpty(errors.confirmPassword)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}