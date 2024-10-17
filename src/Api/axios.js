import axios from 'axios';

export const axiosPrivate = axios.create({
    baseURL: 'https://Osei.pythonanywhere.com',
    withCredentials: true
});