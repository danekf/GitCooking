import axios from 'axios';
import { useState, useEffect } from 'react';

function useApplicationData() {
  const [user, setUser] = useState({ user: 'No User' });

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/login',
    }).then((response) => {
      setUser({ ...response.data });
    });
  }, []);

  function logout() {
    axios({
      method: 'post',
      url: '/api/logout',
    }).then(() => {
      window.location = '/';
    });
  }
  return {
    user,
    logout,
  };
}

export default useApplicationData;
