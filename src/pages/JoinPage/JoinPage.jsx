import React, { useState } from "react";
import "./JoinPage.style.css";
import logo from "../../img/logo.png";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const JoinPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword=()=>{
    setShowPassword(!showPassword);

   
  }
  return (
    <Container className="mt-3 join-form">
      {/* 회원가입 영역 */}
      <div className="logo-area">
        <img src={logo} alt="" width={250} className="mt-3"></img>
        <h2>
          <strong color="sky">
            회원가입
          </strong>
          <h6 class="fw-bolder mb-3">로그인을 통해, 여행을 계획해보세요</h6>
        </h2>
      </div>

      {/* 입력창 */}
      <div>
        <Form>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" />
          </Form.Group>

          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label>닉네임</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type={showPassword ? "text" : "password"} />
          </Form.Group>

          <Form.Check aria-label="option 1"  label="비밀번호 보기" onClick={toggleShowPassword}/>
          <button type="text" class="join-button mt-3">
            회원가입
          </button>
        </Form>
      </div>
    </Container>
  );
};

export default JoinPage;
