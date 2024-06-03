import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./JoinPage.style.css";
import logo from "../../img/logo.png";
import { Container, Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // useNavigate를 사용하여 페이지 이동

// 유효성 검사 스키마 정의
const schema = yup.object().shape({
  email: yup.string()
    .required("이메일은 필수 항목 입니다.")
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/, "이메일 형식이 올바르지 않습니다."),
  name: yup.string().required("닉네임은 필수 항목 입니다."),
  password: yup.string()
    .required("비밀번호는 필수 항목 입니다.")
    .min(4, "비밀번호는 최소 4자, 최대 12자를 입력해주세요.")
    .max(12, "비밀번호는 최소 4자, 최대 12자를 입력해주세요.")
});

const JoinPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage === "회원가입이 완료되었습니다.") {
      navigate('/login'); // 회원가입 완료 메시지일 경우 로그인 페이지로 이동
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    axios.post('/member/new', data)
      .then(response => {
        console.log(response.data);
        setModalMessage("회원가입이 완료되었습니다.");
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setModalMessage(error.response?.data || '서버 오류가 발생했습니다.');
        setShowModal(true);
      });
  };

  return (
    <Container className="mt-3 join-form">
      <div className="logo-area">
        <img src={logo} alt="" width={250} className="mt-3"></img>
        <h2>
          <strong color="sky">회원가입</strong>
          <h6 className="fw-bolder mb-3">로그인을 통해, 여행을 계획해보세요</h6>
        </h2>
      </div>

      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" {...register("email")} />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3 mt-3" controlId="formBasicName">
            <Form.Label>닉네임</Form.Label>
            <Form.Control type="text" {...register("name")} />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type={showPassword ? "text" : "password"} {...register("password")} />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </Form.Group>

          <Form.Check aria-label="option 1" label="비밀번호 보기" onClick={toggleShowPassword} />
          <button type="submit" className="join-button mt-3">회원가입</button>
        </Form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default JoinPage;
