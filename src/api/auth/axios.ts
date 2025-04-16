/*
    Configura Axios con la URL base de la API
*/

import axios from 'axios';
import env from './env';

const url = env().API_URL;
const instance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;