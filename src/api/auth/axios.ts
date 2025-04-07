/*
    Configura Axios con la URL base de la API
*/

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;