import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useFormik } from 'formik'
import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { PATH } from '../Routes/Routes'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../bll/store'
import { loginUser } from '../../bll/auth-reducer'
import { ILoginData } from '../../dal/authAPI'

const useLoginStyles = makeStyles({
  signInWrapper: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: '#000',

    '&:hover': {
      color: '#4caf50',
    },
  },
})

const Login = () => {
  const classes = useLoginStyles()

  const dispatch = useDispatch()
  const isAuth = useSelector<AppRootStateType, boolean>(
    (state) => state.authReducer.isAuth
  )

  const loginFormik = useFormik({
    initialValues: {
      login: 'whiteartur1997@gmail.com',
      password: 'qwerty123',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Must be 8 characters password or more')
        .required('Required'),
      login: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(
        loginUser({
          email: values.login,
          password: values.password,
          rememberMe: values.rememberMe,
        })
      )
    },
  })

  if (isAuth) {
    return <Redirect to={PATH.PROFILE} />
  }
  return (
    <Box className={classes.signInWrapper}>
      <form onSubmit={loginFormik.handleSubmit}>
        <Typography variant="h5">Sign in</Typography>
        <Box m={1}>
          <TextField
            id="login"
            label="Login"
            error={
              loginFormik.touched.login && Boolean(loginFormik.errors.login)
            }
            helperText={loginFormik.touched.login && loginFormik.errors.login}
            {...loginFormik.getFieldProps('login')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box m={1}>
          <TextField
            id="password"
            label="password"
            type="password"
            error={
              loginFormik.touched.password &&
              Boolean(loginFormik.errors.password)
            }
            helperText={
              loginFormik.touched.password && loginFormik.errors.password
            }
            {...loginFormik.getFieldProps('password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box m={1}>
          <FormControlLabel
            control={
              <Checkbox
                id="rememberMe"
                color="primary"
                {...loginFormik.getFieldProps('rememberMe')}
                name="rememberMe"
              />
            }
            label="Remember me"
          />
        </Box>
        <Button fullWidth type="submit" variant="contained" color="primary">
          Sign in
        </Button>
      </form>
      <Box m={2}>
        <NavLink className={classes.link} to={PATH.FORGOTPASSWORD}>
          <Typography variant="subtitle2">Forgot password?</Typography>
        </NavLink>
      </Box>
      <Box m={1}>
        <NavLink className={classes.link} to={PATH.REGISTRATION}>
          <Typography variant="subtitle2">
            Not registered yet? Sign up!
          </Typography>
        </NavLink>
      </Box>
    </Box>
  )
}

export default Login
