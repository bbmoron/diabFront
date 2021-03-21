import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const LogOut = () => {
  const [deauthorized, setDeauthorized] = useState(false);
  useEffect(() => {
    localStorage.setItem('data', null);
    setDeauthorized(true);
  }, []);
  return(deauthorized ? <Redirect to="/" /> : <div></div>);
};

export default LogOut;
