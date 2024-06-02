import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SuprAdmin() {
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [response, setResponse] = useState(null); // State to hold server response

  const handleData1Change = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Allow only numbers
      setData1(value);
    }
  };

  const handleData2Change = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Allow only numbers
      setData2(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      data1: data1,
      data2: data2
    };

    try {
      const response = await fetch('https://power-control-backend.onrender.com/setCost', {
      // const response = await fetch('http://localhost:3002/setCost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      setResponse(result); // Store server response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <h1>SuprAdmin</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formData1">
          <Form.Label column sm="2">
            Data 1
          </Form.Label>
          <Col sm="10">
            <Form.Control 
              type="text" 
              value={data1} 
              onChange={handleData1Change} 
              placeholder="Enter Data 1" 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formData2">
          <Form.Label column sm="2">
            Data 2
          </Form.Label>
          <Col sm="10">
            <Form.Control 
              type="text" 
              value={data2} 
              onChange={handleData2Change} 
              placeholder="Enter Data 2" 
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {response && (
        <div>
          <h2>Server Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
}
