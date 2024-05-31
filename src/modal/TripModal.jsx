import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';

function TripModal({ show, handleClose }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {
    // 제출 처리 로직
    console.log('Title:', title);
    console.log('File:', file);
    handleClose();
  };

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
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TripModal;
