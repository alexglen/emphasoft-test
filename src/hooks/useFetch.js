import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

export const useFetch = (url) => {
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [options, setOptions] = useState(null);

  const [token] = useLocalStorage('token');

  const apiUrl = 'http://emphasoft-test-assignment.herokuapp.com';

  const setData = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          Authorization: token ? `Token ${token}` : '',
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    };

    if (isLoading) {
      axios(`${apiUrl}${url}`, requestOptions)
        .then((res) => {
          setRes(res);
          setIsLoading(false);
        })

        .catch((err) => {
          setErr(err);
          setIsLoading(false);
        });
    }
  }, [isLoading, url, options, token]);

  return [{ isLoading, res, err }, setData];
};
