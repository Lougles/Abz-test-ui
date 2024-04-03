import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import ApiService from "../service/axios.requests";
import ToastNotification from "./Toast";


const Token = () => {
  const [token, setToken] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const getToken = async () => {
    try {
      const response = await ApiService.getToken();
      if (response.data && response.data.success) {
        setToken(response.data.token);
        setToast({ show: true, message: 'Токен створений', type: 'success' });
      } else {
        console.log(response);
        setToast({ show: true, message: 'Не вдалось створити токен', type: 'error' });
      }
    } catch (e) {
      setToast({ show: true, message: e.message, type: 'error' });
    }
  };
  return (
    <Container>
      <h1>Token</h1>
      <button onClick={getToken}>Get Token</button>
      <ToastNotification
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        type={toast.type}
      />
      <p>{token}</p>
    </Container>
  )
}

export default Token;
