import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'

const reducers = combineReducers({
  appReducer: appReducer,
  authReducer: authReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducers>

//@ts-ignore
window.store = store
