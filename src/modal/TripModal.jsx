import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';

function TripModal({ show, handleClose, handleSubmit, title, setTitle, file, setFile }) {

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>PLAN TRIP <FontAwesomeIcon icon={faSuitcaseRolling} /></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="제목을 입력하세요" 
              value={title} 
              onChange={handleTitleChange} 
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label>사진 첨부</Form.Label>
            <Form.Control 
              type="file" 
              onChange={handleFileChange} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>취소</Button>
        <Button variant="primary" onClick={handleSubmit}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TripModal;