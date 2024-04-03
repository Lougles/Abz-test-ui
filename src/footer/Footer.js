import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', padding: '10px 0', position: 'fixed', left: '0', bottom: '0', width: '100%' }}>
      <Container>
        <Row>
          <Col className="text-center">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
