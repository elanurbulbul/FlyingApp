import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 

const AppNavbar = () => {
  return (
    <Navbar expand="xxl" className="bg-body-tertiary">
      <Container fluid="xl">
      <Navbar.Brand style={{ fontSize:"35px", fontWeight: "700", marginRight:"25px", alignSelf:"center" }} className="align-self-center" href="/">FlyWise</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ fontSize:"20px", fontWeight: "500", color:"black" }} className="me-auto ">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/myflights">My Flights</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
