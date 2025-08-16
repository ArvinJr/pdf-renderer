import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

instance.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  return Promise.reject(err)
})

export default instance
