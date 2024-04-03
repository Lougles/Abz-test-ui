import axios from 'axios';

const API_URL = 'https://abz-test-api-production.up.railway.app/api/v1';

const ApiService = {
  getToken: () => {
    return axios.get(`${API_URL}/token`);
  },
  
  getDataByToken: (token) => {
    return axios.get(`${API_URL}/${token}`);
  },
  
  getAllPositions: () => {
    return axios.get(`${API_URL}/positions/all`);
  },
  
  addPosition: (positionData) => {
    return axios.post(`${API_URL}/positions/add`, positionData);
  },
  
  getAllUsers: (page, count, offset) => {
    return axios.get(`${API_URL}/users/getAll`, {
    params: {page, count, offset}
    });
  },
  
  createUser: (userData, token) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return axios.post(`${API_URL}/users/create`, userData, config);
  }
};

export default ApiService;
