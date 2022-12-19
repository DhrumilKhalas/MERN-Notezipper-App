import React, { useEffect, useState } from "react";
import MainScreen from "../MainScreen";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import Loader from "../Loader/Loader";
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {fetchUserRegister} from "../../redux/userSlice"
import {STATUSES} from "../../redux/userSlice" 

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state=>state.user)
  const {status, userInfo, isError} = userLogin

  useEffect(()=>{
    if(userInfo){
      navigate("/")
    }
  }, [userInfo, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      return setMessage("Password & Confirm Password doesn't match!")
    } else {
      setMessage(null)
      dispatch(fetchUserRegister(name, email, password, pic))
    }
    

  }

  return (
    <>
      <MainScreen title="REGISTER">
      {isError && <ErrorMsg variant="danger">{isError}</ErrorMsg>}
      {message && <ErrorMsg variant="danger">{message}</ErrorMsg>}
      {status=== STATUSES.LOADING && <Loader/>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} required autoComplete="off" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required autoComplete="off"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword"> 
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required autoComplete="off"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required autoComplete="off"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProfilePicture">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="text" placeholder="Enter profile picture URL" value={pic} onChange={(e)=>setPic(e.target.value)} autoComplete="off"/>
          </Form.Group>

          <Button variant="primary" type="submit">
            REGISTER
          </Button>
        </Form>

        <div className="alreadyaccount" style={{ marginTop: "20px" }}>
          Have an Account? Click <Link to="/login">here</Link> to Login.
        </div>
      </MainScreen>
    </>
  );
};

export default RegisterScreen;
