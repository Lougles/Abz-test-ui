import React, {useEffect, useState} from 'react';
import {Container, ListGroup} from "react-bootstrap";
import ApiService from "../service/axios.requests";
import ToastNotification from "./Toast";


const User = () => {
  const [user, setUser] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  useEffect(() => {
    (async () => {
      try {
        const response = await ApiService.getAllUsers();
        if (response.data && response.data.success) {
          setUser(response.data.users);
          setToast({ show: true, message: 'Користувачі отримані', type: 'success' });
        } else {
          setToast({ show: true, message: 'Не вдалось отримати користувачів', type: 'error' });
        }
      } catch (e) {
        setToast({ show: true, message: e.message, type: 'error' });
      }
    })()
  }, []);
  
  return (
    <Container>
      <h1>User</h1>
      <ToastNotification
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        type={toast.type}
      />
      <ListGroup>
        {user.map((item, index) => (
          <ListGroup.Item key={index}>
            <img src={item.photo}/>
            {item.id} - {item.name},
            <span> Позиція:  {item.position} </span>
          </ListGroup.Item>
        ))
        }
      </ListGroup>
    </Container>
  )
}

export default User;
