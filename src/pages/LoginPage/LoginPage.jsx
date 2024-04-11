// import React, { useState } from 'react'
import logo from "../../img/logo.png";
import Form from "react-bootstrap/Form";
import "./LoginPage.style.css";
import { Container } from "react-bootstrap";

const LoginPage = () => {
  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");

  // const loginUser = (event) => {
  //   event.preventDefault();
  //   console.log("login user function");
  //   dispatch(authenticateAction.login(id, password));
  //   navigate("/");
  // };

  return (
    <div className="mt-3 ">
      <Container className="logo-area margin-main">
        <img src={logo} alt="" width={250}></img>
        <div>
          <h2>
            <strong color="sky" class="first-sen">
              방문해주셔서 감사합니다
            </strong>
          </h2>
          <h6 class="fw-bolder mb-3">로그인을 통해, 여행을 계획해보세요</h6>
        </div>
      </Container>
      <Container className="login-area">
        <Form className="login-form">
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"

              // onChange={(event) => setId(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"

              // onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          <button type="text" class="login-button mt-3">
            로그인
          </button>
          <button type="text" class="join-button mt-3">
            회원가입
          </button>
        </Form>
      </Container>{" "}
    </div>
  );
};
export default LoginPage;
