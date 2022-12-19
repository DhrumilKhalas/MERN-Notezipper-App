import React, { useState, useEffect } from "react";
import MainScreen from "../MainScreen";
import Button from "react-bootstrap/Button";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { fetchUserLogin } from "../../redux/userSlice";
import { STATUSES } from "../../redux/userSlice";
import Loader from "../Loader/Loader";

const LoginScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state=>state.user) // user object from redux
  const {status, userInfo, isError } = userLogin

  useEffect(()=>{
    if(userInfo){
      navigate("/mynotes")
    }
  }, [navigate, userInfo])
  
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(fetchUserLogin(email, password))
  };

  return (
    <>
      <MainScreen title="LOGIN">
        {isError && <ErrorMsg variant="danger">{isError}</ErrorMsg>}
        {status===STATUSES.LOADING && <Loader/>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              autoComplete="off"
            />
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password" 
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              autoComplete="off"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            LOGIN
          </Button>
        </Form>
        <div style={{ marginTop: "20px" }}>
          New User? Click <Link to="/register">here</Link> to Register.
        </div>
      </MainScreen>
    </>
  );
};

export default LoginScreen;
