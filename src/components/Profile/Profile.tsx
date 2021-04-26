import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { AppRootStateType } from '../../bll/store'

const Profile = () => {
  const isAuth = useSelector<AppRootStateType, boolean>(
    (state) => state.authReducer.isAuth
  )

  if (!isAuth) {
    return <Redirect to="login" />
  }
  return <div>Profile</div>
}

export default Profile
