import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetch } from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import { Button, TextField } from '@material-ui/core';
import '../index.css';

const schema = yup.object().shape({
  username: yup.string().required('Напишите Ваше имя'),
  password: yup.string().required('Вы забыли ввести Ваш пароль'),
});

const AuthPage = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [, setToken] = useLocalStorage('token');

  const [{ err, res, isLoading }, setData] = useFetch('/api-token-auth/');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  useEffect(() => {
    if (res) {
      setToken(res.data.token);
      setIsSubmitSuccess(true);
    }
  }, [res, setToken]);

  const onSubmit = (data) => {
    setData({
      method: 'post',
      data,
    });
  };

  if (isSubmitSuccess) {
    return <Redirect to="/users" />;
  }

  return (
    <div className="container">
      <h2>Войти</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Ваше имя"
          inputRef={register}
          id="username"
          name="username"
          type="text"
          error={!!errors.username || !!err}
          helperText={
            !!err ? 'Вы ввели неверные данные' : errors?.username?.message
          }
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ваш пароль"
          inputRef={register}
          id="password"
          name="password"
          type="password"
          error={!!errors.password || !!err}
          helperText={
            !!err ? 'Вы ввели неверные данные' : errors?.password?.message
          }
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <div className="button-submit">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            className="btn"
          >
            Войти в систему
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
