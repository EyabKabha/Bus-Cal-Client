import axios from 'axios';
const fetcher = axios.create({
    baseURL: 'http://45.88.72.8:3001',
    withCredentials: true
});

export default fetcher;