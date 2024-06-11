import React, { useEffect, useState } from "react";
import { faCircleUser, faSuitcaseRolling, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";

const AppLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userName, setUserName] = useState(""); // 사용자 이름 상태 추가
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 사용자 정보를 가져옴
  //   if (isLoggedIn) {
  //     axios
  //       .get("http://localhost:80/member/status", { withCredentials: true })
  //       .then((response) => {
  //         console.log(response)
  //         setUserName(response.data); // 서버로부터 받은 사용자 정보 설정
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user info:", error);
  //       });
  //   }
  // }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 실행

  const handleLogout = () => {
    axios
      .post("http://localhost:80/member/logout", null, { withCredentials: true })
      .then((response) => {
        console.log("로그아웃 테스트: ", response);
        setIsLoggedIn(false);
        setUserName(""); // 로그아웃 시 사용자 이름 초기화
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
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
                  {/* <Nav.Link><FontAwesomeIcon icon={faCircleUser} />{" "}{userName}</Nav.Link> 사용자 이름 표시 */}
                  <Nav.Link><FontAwesomeIcon icon={faCircleUser} />{" "}MJ</Nav.Link> {/* 사용자 이름 표시 */}
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