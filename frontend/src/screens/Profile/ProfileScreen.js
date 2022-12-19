import React, {useState, useEffect} from 'react'
import MainScreen from '../../components/MainScreen'
import {useSelector, useDispatch} from "react-redux"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import {fetchUpdateProfile, STATUSES} from "../../redux/userSlice"
import Loader from '../../components/Loader/Loader';


const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pic, setPic] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [matchError, setMatchError] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector(state=>state.user)
    const {userInfo, status, isError} = userLogin

    useEffect(()=>{
        if(!userInfo){
            navigate("/")
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
            setPic(userInfo.pic)

        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password!==confirmPassword){
            setMatchError("Password & Confirm Password doesn't match!")
           
        } else {
            dispatch(fetchUpdateProfile({name, email, password, pic}))

        }
       
    }

  return (
    <>
        <MainScreen title="EDIT PROFILE">

       {matchError && <ErrorMsg variant="danger">{matchError}</ErrorMsg>}
       {isError && <ErrorMsg variant="danger">{isError}</ErrorMsg>}
       {status===STATUSES.LOADING && <Loader/>}

    <Form onSubmit={submitHandler}>

    <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} autoComplete="off" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="off" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="off" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} autoComplete="off" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPic">
        <Form.Label>Change Profile Picture</Form.Label>
        <Form.Control type="text" placeholder="Enter new Profile Picture URL" value={pic} onChange={(e)=>setPic(e.target.value)} autoComplete="off" />
      </Form.Group>
 
      <Button variant="warning" type="submit">
        UPDATE
      </Button>

    </Form>

            
        </MainScreen>
    </>
  )
}

export default ProfileScreen