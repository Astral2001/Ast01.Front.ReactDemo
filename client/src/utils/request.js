import axios from 'axios'

const request = axios.create({
    baseURL: 'https://reqres.in/api/',
})

export default request