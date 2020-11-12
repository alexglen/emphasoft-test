import React, { Fragment, useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import { funcSorting, searchUser } from '../utils';
import Loader from '../components/Loader';
import ShowError from '../components/ShowError';
import '../index.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UsersPage = () => {
  const [token] = useLocalStorage('token');
  const [typeOfSorting, setTypeOfSorting] = useState('none');
  const [searchValue, setSearchValue] = useState('');
  const [{ err, res, isLoading }, setData] = useFetch('/api/v1/users/');

  const classes = useStyles();

  useEffect(() => {
    if (token) {
      setData();
    }
  }, [setData, token]);

  const sortById = () => {
    if (typeOfSorting === 'FROM_LESS') {
      setTypeOfSorting('FROM_MORE');
    } else {
      setTypeOfSorting('FROM_LESS');
    }
  };

  const posts = funcSorting(res?.data && res.data, typeOfSorting);
  const postsAfterSearch = searchUser(posts, searchValue);

  if (err) {
    return <ShowError />;
  }

  return (
    <div className="container">
      <nav className="menu">
        <ul>
          <li>
            <NavLink to="/users/new">Создать нового юзера</NavLink>
          </li>
          <li onClick={() => localStorage.removeItem('token')}>
            <NavLink to="logout">Выйти</NavLink>
          </li>
        </ul>
      </nav>
      {postsAfterSearch && !isLoading ? (
        <Fragment>
          <h1>Пользователи</h1>

          <TextField
            label="Найди юзера"
            id="usersearch"
            name="usersearch"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={({ target: { value } }) => setSearchValue(value)}
          ></TextField>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="right"
                    onClick={sortById}
                    style={{ fontWeight: 700, cursor: 'pointer' }}
                  >
                    ID
                  </TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">FirstName</TableCell>
                  <TableCell align="right">LastName</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postsAfterSearch &&
                  postsAfterSearch.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.username}</TableCell>
                      <TableCell align="right">{row.first_name}</TableCell>
                      <TableCell align="right">{row.last_name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UsersPage;
