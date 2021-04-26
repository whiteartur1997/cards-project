import { CircularProgress } from '@material-ui/core'
import React from 'react'

const Preloader = () => {
  return (
    <CircularProgress
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

export default Preloader
