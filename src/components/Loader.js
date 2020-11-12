import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../index.css';

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress disableShrink />
    </div>
  );
};

export default Loader;
