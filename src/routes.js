import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreateNewUserPage from './pages/CreateNewUserPage';
import UsersPage from './pages/UsersPage';
import useLocalStorage from './hooks/useLocalStorage';

const Routes = () => {
  const [token] = useLocalStorage('token');

  return (
    <Switch>
      <Route exact path="/login" component={AuthPage} />
      <Route
        path="/users"
        exact
        render={() =>
          token !== null ? <UsersPage /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/users/new"
        exact
        render={() =>
          token !== null ? <CreateNewUserPage /> : <Redirect to="/login" />
        }
      />
      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default Routes;
