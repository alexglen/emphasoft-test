import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetch } from '../hooks/useFetch';
import ShowError from '../components/ShowError';
import { Button, TextField, Checkbox } from '@material-ui/core';
import '../index.css';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Напишите Ваше имя')
    .max(150, 'Слишком длинное имя')
    .matches(/^[\w.@+-]+$/, 'В Вашем имени использованы некоррректные символы'),
  password: yup
    .string()
    .required('Вы забыли ввести Ваш пароль')
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{8,}$/,
      'Пароль должен содержать цифры, а так же буквы в верхнем и нижнем регистре латинского алфавита и быть не менее 8 символов'
    ),

  first_name: yup
    .string()
    .required('Вы не ввели Ваш first_name')
    .max(30, 'Слишком длиннное имя'),
  last_name: yup
    .string()
    .required('Вы не ввели Ваш last_name')
    .max(150, 'Слишком длиннное имя'),
});

const CreateNewUserPage = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      is_active: false,
    },
  });

  const [{ err, res, isLoading }, setData] = useFetch('/api/v1/users/');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  useEffect(() => {
    if (res) {
      setIsSubmitSuccess(true);
    }
  }, [res]);

  const onSubmit = (data) => {
    setData({
      method: 'post',
      data,
    });
  };

  if (err) {
    return <ShowError />;
  }

  if (isSubmitSuccess) {
    return <Redirect to="/users" />;
  }
  return (
    <div className="container">
      <h2>Создать нового пользователя</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Ваше имя"
          inputRef={register}
          id="username"
          name="username"
          type="text"
          error={!!errors.username}
          helperText={errors?.username?.message}
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
          error={!!errors.password}
          helperText={errors?.password?.message}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ваш first_name"
          inputRef={register}
          id="first_name"
          name="first_name"
          type="text"
          error={!!errors.first_name}
          helperText={errors?.first_name?.message}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ваш last_name"
          inputRef={register}
          id="last_name"
          name="last_name"
          type="text"
          error={!!errors.last_name}
          helperText={errors?.last_name?.message}
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <div className="checkbox">
          <Checkbox
            inputRef={register}
            id="is_active"
            name="is_active"
            color="primary"
          />
          <label htmlFor="is_active">Пользователь активен?</label>
        </div>

        <div className="button-submit">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            className="btn"
          >
            Создать нового юзера
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewUserPage;
