import { useState, useEffect } from 'react';
import supabase from '../data/supabase';

const useUser = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // start loading
      const { data, error } = await supabase.from('User').select(`name, role`);
      const users = await supabase.from('User').select('*').range(0, 10);

      console.log(error, "=============================");
      console.log(users);

      if (error) {
        setError(error);
      } else {
        setData(data);
      }
      setLoading(false); // stop loading after fetch
    };

    fetchData();
  }, [ error]); // Empty dependency array means it runs once when the component mounts

  return {
    data,
    error,
    loading,
  };
};

export default useUser;
