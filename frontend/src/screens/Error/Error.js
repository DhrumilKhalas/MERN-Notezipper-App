import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import "./Error.css"

const Error = () => {
    const navigate = useNavigate()
    const {userInfo }= useSelector(state=>state.user)

    const clickHandler = () => {
        if(userInfo){
            navigate("/mynotes")
        } else {
            navigate("/")
        }
    }

  return (
    <>
        

       
        
        <div className='errormain'> 

            <div className="err1">OOPS! PAGE NOT FOUND</div>
            <div className="err2">Sorry, The page you are looking for could not be found.</div>
            <div className="err3">
            <Button onClick={()=>{navigate(-1)}} className="err31">GO TO PREVIOUS PAGE</Button>
            <Button onClick={clickHandler} className="err32">GO TO HOME PAGE</Button>
            </div>
           
            
        </div>
        
        
    
    </>
  )
}

export default Error