import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {fetchUserLogout} from "../../redux/userSlice"
import "./Header.css"

const Header = ({setSearch}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.user)
  const {userInfo} = userLogin



  const logoutHandler = async () => {
    dispatch(fetchUserLogout())
    navigate("/")
    
    
   
   
  }

  return (
    <>
     


    <Navbar bg="primary" expand="lg" variant="dark"> 

      <Container style={{display:"flex", justifyContent:"space-evenly"}} className="headermain">

        <div className="header1">
        <Link to="/" style={{textDecoration:"none", color:"white"}}>Note Zipper</Link>
        </div>
        

        <div className="header2">
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
        </Form> 
        </div>

          {userInfo ? (
            <div className="header3">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link href="/mynotes"><Link to="/mynotes" style={{textDecoration:"none", color:"inherit"}}>My Notes</Link></Nav.Link>
            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4" onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
              
            </NavDropdown>
            
          </Nav>
          
        </Navbar.Collapse>
        </div>
          ) : (
            <div className="header3" style={{color:"white"}}><Nav.Link href="/login">Login</Nav.Link></div>
          )}
          
        
      </Container>
    </Navbar>
  


    </>
  )
}

export default Header