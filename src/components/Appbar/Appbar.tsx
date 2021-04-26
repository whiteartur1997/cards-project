import { Button, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutUser } from '../../bll/auth-reducer'
import { AppRootStateType } from '../../bll/store'
import { PATH } from '../Routes/Routes'

const useAppStyles = makeStyles({
  toolbar: {
    display: 'flex',
  },
  signLinks: {
    display: 'flex',
    marginLeft: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#000',

    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
})

export function Appbar() {
  const classes = useAppStyles()

  const dispatch = useDispatch()
  const isAuth = useSelector<AppRootStateType, boolean>(
    (state) => state.authReducer.isAuth
  )

  const logoutHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <NavLink className={classes.link} to={PATH.PROFILE}>
          <MenuItem>Profile</MenuItem>
        </NavLink>

        <NavLink className={classes.link} to={PATH.PACKS}>
          <MenuItem>Packs</MenuItem>
        </NavLink>
        <NavLink className={classes.link} to={PATH.FORGOTPASSWORD}>
          <MenuItem>Forgot password</MenuItem>
        </NavLink>
        <NavLink className={classes.link} to={PATH.NEWPASSWORD}>
          <MenuItem>Set new password</MenuItem>
        </NavLink>

        <div className={classes.signLinks}>
          {isAuth ? (
            <Button onClick={logoutHandler}>Log out</Button>
          ) : (
            <>
              <NavLink className={classes.link} to={PATH.LOGIN}>
                <MenuItem>Sign in</MenuItem>
              </NavLink>
              <NavLink className={classes.link} to={PATH.REGISTRATION}>
                <MenuItem>Sign up</MenuItem>
              </NavLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
