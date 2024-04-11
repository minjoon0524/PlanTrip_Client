import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const navigate=useNavigate();

  const goLogin=()=>{
    navigate(`/login`);
  }

  const goJoin=()=>{
    navigate(`/join`);
  }
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary  fixed-top"
      >
        <Container className="navbar-area">
          <Navbar.Brand href="/">
            PLAN TRIP <FontAwesomeIcon icon={faSuitcaseRolling} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={goLogin}>Login</Nav.Link>
              <Nav.Link onClick={goJoin}>Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default AppLayout;
