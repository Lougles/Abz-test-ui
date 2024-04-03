import React, {useEffect, useState} from 'react';
import {Container, ListGroup} from "react-bootstrap";
import ApiService from "../service/axios.requests";
import ToastNotification from "./Toast";


const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  useEffect(() => {
    (async () => {
      try {
        const response = await ApiService.getAllPositions();
        if (response.data && response.data.success) {
          setPositions(response.data.positions);
          setToast({ show: true, message: 'Позиції отримані', type: 'success' });
        } else {
          console.log(response);
          setToast({ show: true, message: 'Не вдалось отримати позиції', type: 'error' });
        }
      } catch (e) {
        setToast({ show: true, message: e.message, type: 'error' });
      }
    })()
  }, []);
  
  return (
    <Container>
      <h1>Positions</h1>
      <ToastNotification
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        type={toast.type}
      />
      <ListGroup>
        {positions.map((item, index) => (
          <ListGroup.Item key={index}>{item.id} - {item.name}</ListGroup.Item>
          ))
        }
      </ListGroup>
    </Container>
  )
}

export default Positions;
