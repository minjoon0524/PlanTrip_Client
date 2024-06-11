import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 CSRF 토큰을 가져옵니다.
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://localhost:80/csrf-token");
        setCsrfToken(response.data.token);
        console.log(response)
      } catch (error) {
        console.error("CSRF 토큰을 가져오는 중 오류 발생:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const loginUser = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력하세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); // 이전 에러 메시지 초기화

    const data = {
      email: email,
      password: password
    };

    axios.post(
      "http://localhost:80/member/login",  // 로그인 처리 URL
      data, 
      {
        headers: {
          "Content-Type": "application/json",

        },
        withCredentials: true // 쿠키 포함
      }
    )
    .then(response => {
      setIsLoggedIn(true);
      navigate("/");
      return response;
    })
    .catch(error => {
      console.error("Error:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data || "로그인 실패. 다시 시도해주세요.");
    })
    .finally(() => {
      setIsLoading(false);
    });
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
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
            />
          </Form.Group>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-button mt-3" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
          <button
            type="button"
            className="join-button mt-3"
            onClick={() => navigate("/join")}
            disabled={isLoading}
          >
            회원가입
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
