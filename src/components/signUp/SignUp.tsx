import {
  Box,
  Button,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import { registerUser, setWasRegistreted } from '../../bll/auth-reducer'
import { AppRootStateType } from '../../bll/store'
import { PATH } from '../Routes/Routes'

const useSignUpStyles = makeStyles({
  signUpWrapper: {
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

const SignUp = () => {
  const dispatch = useDispatch()
  const wasRegistreted = useSelector<AppRootStateType, boolean>(
    (state) => state.authReducer.wasRegistreted
  )
  const classes = useSignUpStyles()
  const signupFormik = useFormik({
    initialValues: {
      email: 'whiteartur1997@gmail.com',
      password: 'qwerty123',
      confirmPassword: 'qwerty123',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Must be 8 characters password or more')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match!")
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(
        registerUser({
          email: values.email,
          password: values.password,
        })
      )
    },
  })

  useEffect(() => {
    return () => {
      dispatch(setWasRegistreted(false))
    }
  }, [])

  if (wasRegistreted) {
    return <Redirect to={PATH.LOGIN} />
  }

  return (
    <Box className={classes.signUpWrapper}>
      <form onSubmit={signupFormik.handleSubmit}>
        <Typography variant="h5">Sign up</Typography>
        <Box m={1}>
          <TextField
            id="email"
            label="E-mail"
            type="email"
            error={
              signupFormik.touched.email && Boolean(signupFormik.errors.email)
            }
            helperText={signupFormik.touched.email && signupFormik.errors.email}
            {...signupFormik.getFieldProps('email')}
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
            label="Password"
            type="password"
            error={
              signupFormik.touched.password &&
              Boolean(signupFormik.errors.password)
            }
            helperText={
              signupFormik.touched.password && signupFormik.errors.password
            }
            {...signupFormik.getFieldProps('password')}
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
          <TextField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            error={
              signupFormik.touched.confirmPassword &&
              Boolean(signupFormik.errors.confirmPassword)
            }
            helperText={
              signupFormik.touched.confirmPassword &&
              signupFormik.errors.confirmPassword
            }
            {...signupFormik.getFieldProps('confirmPassword')}
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
          <Button fullWidth type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </Box>
      </form>
      <Box m={2}>
        <NavLink className={classes.link} to={PATH.LOGIN}>
          <Typography variant="subtitle2">
            Have an account? Please sign in
          </Typography>
        </NavLink>
      </Box>
    </Box>
  )
}

export default SignUp
