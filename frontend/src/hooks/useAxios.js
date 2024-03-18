import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config = { headers: headers ? JSON.parse(headers) : {} };
        const requestBody = body ? JSON.parse(body) : null;
        const res = await axios[method](url, requestBody, config);
        setResponse(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useAxios;
