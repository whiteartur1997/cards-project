import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setInfo } from '../../bll/app-reducer'

type InfoSnackbarType = {
  info: string
  severity: 'success' | 'error'
}

const InfoSnackbar: React.FC<InfoSnackbarType> = (props) => {
  const ref = useRef()
  const [open, setOpen] = useState(Boolean(props.info))
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setError(null))
    dispatch(setInfo(null))
    setOpen(false)
  }

  useEffect(() => {
    // to avoid error in console
    // when I close it by myself
    return () => {
      const node = ref.current as any
      if (node) {
        node.removeEventListener('click', handleClose)
      }
    }
  })

  return (
    <Snackbar
      ref={ref}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        {props.info}
      </Alert>
    </Snackbar>
  )
}

export default InfoSnackbar
