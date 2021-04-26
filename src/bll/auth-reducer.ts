import { useHistory } from 'react-router'
import { Dispatch } from 'redux'
import { PATH } from '../components/Routes/Routes'
import { authAPI, ILoginData, IRegisterData, UserData } from '../dal/authAPI'
import { createErrorMessage } from '../helpers/handleError'
import { setError, setInfo } from './app-reducer'

// types
type AuthStateType = typeof initialState
type ActionsType =
  | ReturnType<typeof setUserOnSuccess>
  | ReturnType<typeof setWasRegistreted>
  | ReturnType<typeof setAuth>

const initialState = {
  isAuth: false as boolean,
  userData: null as null | UserData,
  wasRegistreted: false as boolean,
}

export const authReducer = (
  state: AuthStateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case 'SET-AUTH': {
      return { ...state, isAuth: action.isAuth }
    }
    case 'SET-USER': {
      return { ...state, userData: action.userData }
    }
    case 'SET-REGISTRETED': {
      return { ...state, wasRegistreted: action.wasRegistreted }
    }
    default:
      return state
  }
}

// thunks
export const registerUser = (registerData: IRegisterData) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await authAPI.register(registerData)
    if (res.data.addedUser?.name) {
      dispatch(
        setInfo(`User ${res.data.addedUser?.name} registered. Please sign in`)
      )
    }
    dispatch(setWasRegistreted(true))
  } catch (err) {
    const error = createErrorMessage(err)
    dispatch(setError(error))
  }
}

export const loginUser = (loginData: ILoginData) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await authAPI.login(loginData)
    dispatch(setUserOnSuccess(res.data))
    dispatch(setAuth(true))
  } catch (err) {
    const error = createErrorMessage(err)
    dispatch(setError(error))
  }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.logout()
    dispatch(setUserOnSuccess(null))
    dispatch(setAuth(false))
    dispatch(setInfo(res.data.info))
  } catch (err) {
    const error = createErrorMessage(err)
    dispatch(setError(error))
  }
}

// actions
export const setUserOnSuccess = (userData: UserData | null) =>
  ({
    type: 'SET-USER',
    userData,
  } as const)

export const setWasRegistreted = (value: boolean) =>
  ({
    type: 'SET-REGISTRETED',
    wasRegistreted: value,
  } as const)

export const setAuth = (value: boolean) =>
  ({
    type: 'SET-AUTH',
    isAuth: value,
  } as const)
