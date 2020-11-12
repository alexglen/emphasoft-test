import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue = '') => {
  const [data, setData] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, data);
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
