import axios from 'axios'
import getToken from './auth'

const token = getToken()

export const fetcher = (url) => axios.get(url).then(response => response.data)

export const postData = (url, data) => axios.post(url,data, {
  headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  }, manuel: true
}).then(response => response.data)

export const addData = (url, data) => fetch(url, {
        method: "POST",
        cache: "reload",
        mode: "cors",
  headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
    
        },
        body: JSON.stringify(data)
},).then(response => response.json())
      .catch(err => err.message)

