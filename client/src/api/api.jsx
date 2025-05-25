// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/engzone',
  withCredentials: true, // Nếu backend yêu cầu credentials
});

export default instance;
