import axios from 'axios';

const toAPI = axios.create({
    baseURL: 'https://reqres.in/api/',
})

toAPI.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default toAPI