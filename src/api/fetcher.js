import axios from 'axios';
const fetcher = axios.create({
    baseURL: 'http://buscal.co.il:3001',
    withCredentials: true
});

export default fetcher;