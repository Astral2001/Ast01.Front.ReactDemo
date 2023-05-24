import axios from 'axios';

const toUserAPI = axios.create({
    baseURL: 'https://reqres.in/api/',
})

toUserAPI.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export { toUserAPI }