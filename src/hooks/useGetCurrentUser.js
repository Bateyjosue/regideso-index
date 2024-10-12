import { useEffect, useState } from "react";
import supabase from "../data/supabase";

const useGetCurrentUser = async() => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  
  useEffect(() => {
    (async() => {
      try {
        setLoading(true)

        const { data: user } = await supabase.auth.getUser()
        setUser(user)

        setLoading(false)
    
      } catch (error) {
        setError(error)
        throw new Error(`${error}`)
      }

    })()
  }, [])

  return {
    user,
    error,
    loading
  }

}

export default useGetCurrentUser;