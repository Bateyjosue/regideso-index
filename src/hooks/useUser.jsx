import useSWR from 'swr'
import getToken from "../data/auth"
import { useEffect, useState } from 'react'

const baseUrl = 'https://regi-api.bingwainnovationhub.com/v1/'
const token = getToken()

// const fetcher = (url) => {
//   fetch(url, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         "Content-Type": "application/json",
//       }
//     }).then(response => response.json())
// }


const useUser = (id) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  

  useEffect(() => {
    setLoading(true)
    fetch(`${baseUrl}/subscribers?params={"page":"1", "limit":"100"}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then(response => response.json())
      .then(data => {
      setData(data.subscribersResponse)
      })
      .catch(err => setError(err))
    .finally(() => setLoading(false))
  }, [])
  
  console.log(data, loading, error);

  const userData = data.filter(data => data.identification_code === id)


  return {
    data: userData,
    error,
    loading
  }
}

export default useUser;