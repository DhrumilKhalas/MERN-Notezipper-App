import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMsg = ({variant="info", children}) => {
  return ( 
   <>
    <Alert variant={variant}><strong>{children}</strong></Alert>
   </> 
  )
}

export default ErrorMsg