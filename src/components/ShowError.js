import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import '../index.css';

const ShowError = () => {
  const history = useHistory();
  return (
    <div>
      <h2 className="error-message">
        Произошла ошибка. Вернитесь на главную
        <SentimentVeryDissatisfiedIcon fontSize="large" />
      </h2>
      <div className="button-error">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push('/')}
          className="btn"
        >
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default ShowError;
