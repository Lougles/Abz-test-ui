import React, {useState} from 'react';
import ToastNotification from "./Toast";
import {Button, Container, Form} from "react-bootstrap";
import ApiService from "../service/axios.requests";



const CreateUser = ({fetchUsers, currentPage}) => {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [token, setToken] = useState('');
  
  const createUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await ApiService.createUser(formData, token);
      if (response?.data?.success) {
        event.target.reset();
        await fetchUsers(currentPage);
        setToast({show: true, message: response.data.message, type: 'success'});
      } else {
        let errorMessage = response.data.message;
        if (response?.data?.fails) {
          const errors = Object.values(response.data.fails).flat();
          errorMessage = errors.join('. ');
        }
        setToast({show: true, message: errorMessage, type: 'error'});
      }
    } catch (e) {
      let errorMessage;
      if (e.response?.data?.fails) {
        const errors = Object.values(e.response.data.fails).flat();
        errorMessage = errors.join('. ');
      } else {
        errorMessage = e.response?.data?.message || e.message || 'Unknown error occurred';
      }
      setToast({show: true, message: errorMessage, type: 'error'});
    }
  }
  
  return (
    <Container>
      <h1>Create User</h1>
      <Form onSubmit={createUser}>
        <Form.Group controlId="formToken">
          <Form.Label>Token</Form.Label>
          <Form.Control onChange={(e) => setToken(e.target.value)} type="text" placeholder="Enter token"/>
        </Form.Group>
        
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control name='name' type="text" placeholder="Enter name"/>
        </Form.Group>
        
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control name='email' type="email" placeholder="Enter email"/>
        </Form.Group>
        
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control name='phone' type="tel" placeholder="Enter phone"/>
        </Form.Group>
        
        <Form.Group controlId="formPositionId">
          <Form.Label>Position ID</Form.Label>
          <Form.Control name='position_id' type="number"/>
        </Form.Group>
  
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Photo </Form.Label>
          <Form.Control name='photo' type="file" size="lg"/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastNotification
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        type={toast.type}
      />
    </Container>
  );
}
export default CreateUser;
