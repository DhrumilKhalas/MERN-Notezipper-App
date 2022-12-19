import React from 'react'
import {Spinner} from "react-bootstrap"

const Loader = () => {
  return ( 
    <>
        <div style={{display:"flex", justifyContent:"center", margin:"20px 0px"}}><Spinner/></div>
    </>
  )
}

export default Loader