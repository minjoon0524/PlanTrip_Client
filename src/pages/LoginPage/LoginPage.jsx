// src/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import axios from "axios";
import "./LoginPage.style.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:80/member/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("로그인 실패. 다시 시도해주세요.");
    }
  };

  return (
    <div className="mt-3">
      <Container className="logo-area margin-main">
        <img src={logo} alt="Logo" width={250} />
        <div>
          <h2>
            <strong className="first-sen">방문해주셔서 감사합니다</strong>
          </h2>
          <h6 className="fw-bolder mb-3">로그인을 통해, 여행을 계획해보세요</h6>
        </div>
      </Container>
      <Container className="login-area">
        <Form className="login-form" onSubmit={loginUser}>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-button mt-3">
            로그인
          </button>
          <button
            type="button"
            className="join-button mt-3"
            onClick={() => navigate("/join")}
          >
            회원가입
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
