import { ThemeProvider } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { initializeApp } from './bll/app-reducer'
import { AppRootStateType } from './bll/store'
import { Appbar } from './components/Appbar/Appbar'
import InfoSnackbar from './components/InfoSnackbar/InfoSnackbar'
import Preloader from './components/Preloader/Preloader'
import { Routes } from './components/Routes/Routes'
import { theme } from './UITheme/theme'

function App() {
  const dispatch = useDispatch()

  const error = useSelector<AppRootStateType, null | string>(
    (state) => state.appReducer.error
  )
  const info = useSelector<AppRootStateType, null | string>(
    (state) => state.appReducer.info
  )
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.appReducer.isInitialized
  )

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {isInitialized ? (
          <>
            <Appbar />
            <Routes />
          </>
        ) : (
          <Preloader />
        )}
        {error && <InfoSnackbar info={error} severity="error" />}
        {info && <InfoSnackbar info={info} severity="success" />}
      </ThemeProvider>
    </div>
  )
}

export default App
