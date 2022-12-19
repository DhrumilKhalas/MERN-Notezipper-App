import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Footer = () => { 
  return (
  
      <footer
  style={{
    width:"100%",
    posotion:"relative",
    bottom:0,
    display:"flex",
    justifyContent:"center",
    backgroundColor:"#158CBA",
    color:"white"
  }}>
  <Container>
    <Row>
      <Col className='text-center py-3'>Copyright &copy; Note Zipper</Col>
    </Row>
  </Container>
      </footer>
    
  )
}

export default Footer