import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import SignUp from '../signUp/SignUp'

export const PATH = {
  PROFILE: '/profile',
  REGISTRATION: '/sign-up',
  LOGIN: '/login',
  NEWPASSWORD: '/new-password',
  FORGOTPASSWORD: '/forgot-password',
  PACKS: '/packs',
  CARDS: '/cards/:id?',
  LEARN: '/learn/:id?',
}

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Profile />} />
      <Route path={PATH.REGISTRATION} render={() => <SignUp />} />
      <Route path={PATH.LOGIN} render={() => <Login />} />
      <Route path={PATH.PROFILE} render={() => <Profile />} />
    </Switch>
  )
}
