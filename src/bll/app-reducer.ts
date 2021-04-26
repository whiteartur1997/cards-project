import { Dispatch } from 'redux'
import { authAPI } from '../dal/authAPI'
import { createErrorMessage } from '../helpers/handleError'
import { setAuth, setUserOnSuccess } from './auth-reducer'

// types
type AppStateType = typeof initialState
type ActionsType =
  | ReturnType<typeof setInitializedApp>
  | ReturnType<typeof setError>
  | ReturnType<typeof setInfo>

const initialState = {
  isInitialized: false as boolean,
  loading: false as boolean,
  error: null as null | string,
  info: null as null | string,
}

export const appReducer = (
  state: AppStateType = initialState,
  action: ActionsType
): AppStateType => {
  switch (action.type) {
    case 'SET-INIT-APP':
      return { ...state, isInitialized: action.isInitialized }
    case 'SET-ERROR':
      return { ...state, error: action.error }
    case 'SET-INFO':
      return { ...state, info: action.info }
    default:
      return state
  }
}

// thunks
export const initializeApp = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.authMe()
    dispatch(setUserOnSuccess(res))
    dispatch(setAuth(true))
  } catch (err) {
    const error = createErrorMessage(err)
    dispatch(setError(error))
  } finally {
    dispatch(setInitializedApp(true))
  }
}

// actions
const setInitializedApp = (value: boolean) =>
  ({
    type: 'SET-INIT-APP',
    isInitialized: value,
  } as const)

export const setError = (error: string | null) =>
  ({
    type: 'SET-ERROR',
    error,
  } as const)

export const setInfo = (info: string | null) =>
  ({
    type: 'SET-INFO',
    info,
  } as const)
