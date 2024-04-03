import React, {useState} from 'react';
import ToastNotification from "./Toast";
import {Button, Form} from "react-bootstrap";



const CreateUser = () => {
  
  const [photo, setPhoto] = useState('');
  const [position, setPosition] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const createUser = (event) => {
    event.preventDefault();
    console.log(event);
  }
  
  return (
    <Form onSubmit={(e) => {
      createUser(e)
    }}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" defaultValue="Vova" />
      </Form.Group>
      
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" defaultValue="chelidze.v.a@gmail.com" />
      </Form.Group>
      
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Enter phone" defaultValue="+380935014329" />
      </Form.Group>
      
      <Form.Group controlId="formPositionId">
        <Form.Label>Position ID</Form.Label>
        <Form.Control onChange={(e) => setPosition(e.target.value)} type="number" defaultValue="4" />
      </Form.Group>
      
      <Form.Group>
        <Form.File
          type="file"
          className="custom-file-label"
          id="inputGroupFile01"
          label={photo}
          onChange={(e) => setPhoto(e.target.files[0].name)}
          custom
        />
        {/*<Form.File type='file' id="formPhoto" label="Photo"  />*/}
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
export default CreateUser;
