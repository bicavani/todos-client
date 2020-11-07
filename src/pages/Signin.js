import React, { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { setAuthToken } from '../features/auth/setAuthToken';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../features/auth/authSlice';
import isEmpty from 'is-empty';
import Axios from 'axios';
import MessageModal from '../app/MessageModal';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin() {
  const classes = useStyles();
  const [messageServer, setMessageServer] = useState({})
  const [openModal, setOpenModal] = useState(false)

  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(
    () => {
      if (isAuth) history.push('/tasks')
    }, [isAuth, history]
  )

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const { register, errors, handleSubmit } = useForm()
  const onSubmit = async data => {
    try {
      const res = await Axios.post('http://localhost:4000/user/login', data)
      const { token } = res.data
      localStorage.setItem('jwtToken', token)

      setAuthToken(token)

      const decoded = jwtDecode(token)
      dispatch(signinUser(decoded))

    } catch (error) {
      setMessageServer(error.response.data)
      handleOpenModal()
    }
  }

  const { message } = messageServer || 'invalid info'

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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({ required: true, pattern: /^\w+@(\w+\.)+[a-zA-z]+$/ })}
            helperText={(errors.email && 'invalid value')}
            error={!isEmpty(errors.email) || (message === 'user not exists')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true, minLength: 6 })}
            helperText={(errors.password && 'invalid value')}
            error={!isEmpty(errors.password) || (message === 'incorrect password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}