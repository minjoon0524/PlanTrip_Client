import React, { useEffect, useState } from "react";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import axios from 'axios';

const AppLayout = ({isLoggedIn,setIsLoggedIn}) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:80/member/checkLoginStatus', { withCredentials: true })
      .then(response => {
        console.log("로그인 상태 체크 응답: ", response.data);
        if (response.data.isLoggedIn !== undefined || response.data.isLoggedIn === false ) {
          setIsLoggedIn(response.data.isLoggedIn);
        }
      })
      .catch(error => {
        console.error('Error checking login status:', error);
      });
  }, []);
  

  const handleLogout = () => {
    axios.get('http://localhost:80/member/logout', { withCredentials: true })
      .then(response => {
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  const goLogin = () => {
    navigate(`/login`);
  };

  const goJoin = () => {
    navigate(`/join`);
  };

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
              {isLoggedIn ? (
                <>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={goLogin}>Login</Nav.Link>
                  <Nav.Link onClick={goJoin}>Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default AppLayout;
