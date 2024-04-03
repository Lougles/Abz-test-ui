import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

const ToastNotification = ({ show, onClose, message, type, delay = 6000 }) => {
  const [showToast, setShowToast] = useState(show);
  
  useEffect(() => {
    setShowToast(show);
  }, [show]);
  
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        onClose();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [showToast, delay, onClose]);
  
  const toastStyles = {
    position: 'fixed',
    top: 20,
    right: 20,
    zIndex: 9999
  };
  
  const toastBodyStyles = {
    backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
    color: 'white'
  };
  
  return (
    <Toast show={showToast} onClose={() => setShowToast(false)} style={toastStyles} delay={delay} autohide>
      <Toast.Header style={toastBodyStyles}>
        <strong className="me-auto">Уведомление</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;
