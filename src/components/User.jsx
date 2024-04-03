import React, {useCallback, useEffect, useState} from 'react';
import {Container, Dropdown, ListGroup} from "react-bootstrap";
import ApiService from "../service/axios.requests";
import ToastNotification from "./Toast";
import Pagination from 'react-bootstrap/Pagination';
import CreateUser from "./CreateUser";


const MAX_PAGES_DISPLAYED = 10;
const User = () => {
  const [user, setUser] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [dataLinks, setDataLinks] = useState();
  const [shouldFetch, setShouldFetch] = useState(true);
  
  const fetchUsers = useCallback(async (page) => {
    try {
      const response = await ApiService.getAllUsers(page, usersPerPage, usersPerPage * (page - 1));
      if (response?.data?.success) {
        setUser(response.data.users);
        setDataLinks({links: response.data.links})
        setCurrentPage(response.data.page);
        setTotalPages(response.data.total_pages);
        setToast({ show: true, message: 'Користувачі отримані', type: 'success' });
      } else {
        setToast({ show: true, message: 'Не вдалось отримати користувачів', type: 'error' });
      }
    } catch (e) {
      setToast({ show: true, message: e.message, type: 'error' });
    }
  }, [usersPerPage, setUser, setDataLinks, setCurrentPage, setTotalPages, setToast])
  
  useEffect(() => {
    if (shouldFetch) {
      fetchUsers(currentPage);
    }
    setShouldFetch(true);
  }, [currentPage, usersPerPage, fetchUsers, shouldFetch]);
  

  
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };
  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      try {
        const response = await fetch(dataLinks.links.next_url);
        const data = await response.json();
        setShouldFetch(false);
        setDataLinks({links: data.links})
        setUser(data.users);
        setCurrentPage(currentPage + 1);
        setToast({show: true, message: 'Користувачі отримані', type: 'success'});
      } catch (e) {
        setToast({show: true, message: e.message, type: 'error'});
      }
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      try {
        const response = await fetch(dataLinks.links.prev_url);
        const data = await response.json();
        setShouldFetch(false);
        setDataLinks({links: data.links})
        setUser(data.users);
        setCurrentPage(currentPage - 1);
        setToast({show: true, message: 'Користувачі отримані', type: 'success'});
      } catch (e) {
        setToast({show: true, message: e.message, type: 'error'});
      }
    }
  };
  
  function getPagination(currentPage, totalPages) {
    let startPage, endPage;
    
    if (totalPages <= MAX_PAGES_DISPLAYED) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(MAX_PAGES_DISPLAYED / 2);
      const maxPagesAfterCurrentPage = Math.ceil(MAX_PAGES_DISPLAYED / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = MAX_PAGES_DISPLAYED;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - MAX_PAGES_DISPLAYED + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    
    return Array.from({ length: (endPage + 1) - startPage }).map((_, index) => startPage + index);
  }
  
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
            <img alt={item.img} style={{marginRight: '20px'}} src={item.photo}/>
            {item.name},
            <span> Позиція{ item.position_id}:  {item.position}, </span>
            <span> Тел: {item.phone}</span>
            <span> Пошта: {item.email}</span>
          </ListGroup.Item>
        ))
        }
      </ListGroup>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {usersPerPage}
        </Dropdown.Toggle>
    
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setUsersPerPage(2)}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => setUsersPerPage(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => setUsersPerPage(10)}>10</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Pagination style={{marginTop: '20px'}}>
        <Pagination.First onClick={handleFirstPage} disabled={currentPage === 1}/>
        <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1}/>
        {getPagination(currentPage, totalPages).map(pageNum => (
          <Pagination.Item
            key={pageNum}
            active={pageNum === currentPage}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}/>
        <Pagination.Last onClick={handleLastPage} disabled={currentPage === totalPages || totalPages === 0}/>
      </Pagination>
      <CreateUser fetchUsers={fetchUsers} currentPage={currentPage}/>
    </Container>
  )
}

export default User;
