import axios from 'axios';
import humps from 'humps';

const initToken = localStorage.getItem('token') || sessionStorage.getItem('token') || ''

const instance = axios.create({
    baseURL: 'https://emrdev.ru/api',
    transformResponse: [
        ...axios.defaults.transformResponse,
        data => humps.camelizeKeys(data)
    ],
    transformRequest: [
        data => humps.decamelizeKeys(data),
        ...axios.defaults.transformRequest
    ],
    headers: {
        common: {
            Authorization: initToken ? 'Bearer ' + initToken : '',
        }
    }
});

export default instance;
