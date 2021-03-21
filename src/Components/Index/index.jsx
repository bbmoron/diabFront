import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import background from './background.png';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${background});
`;

const LoginForm = styled.div`
  width: 28vw;
  background: rgba(255,255,255,1);
  border-radius: 5px;
  box-shadow: 1px 0px 5px rgba(0,0,0,0.3);
  padding: 30px 10px 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  height: 24px;
  font-size: 22px;
  padding-left: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 18px;
  border: 1px solid rgba(126, 126, 126, 0.3);
  outline: none;
`;

const Error = styled.p`
  color: red;
  padding: 0;
  margin: 0;
  padding-bottom: 12px;
`;

const NLink = styled(Link)`
  color: #3E3E3E;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInButton = styled.div`
  width: 140px;
  height: 40px;
  background: #3E3E3E;
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;

  &:hover {
    background: #252525;
  }
`;

function Index() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const submitForm = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const urlencoded = new URLSearchParams();
    urlencoded.append('email', 'test@mail.ru');
    urlencoded.append('password', '123456');
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: urlencoded,
      redirect: 'follow'
    };
    fetch('http://194.87.248.56:8080/docauth', requestOptions)
    .then(response => response.json())
    .then(body => {
      console.log(body);
      const { ID, name, email, ready } = body;
      if(ID > 0) {
        localStorage.setItem('data', JSON.stringify({
          id: ID, name: name, email: email, ready: ready
        }));
        setAuthorized(true);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2700);
      }
    }).catch(err => {
      console.error(err);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2700);
    });
  }

  return(
    authorized ? <Redirect to="/panel" /> : <Wrap>
      <LoginForm>
        <h2>Log In</h2>
        <Error style={{ 'visibility': error ? 'visible' : 'hidden' }}>*Wrong login and/or password</Error>
        <Input type="text" placeholder="Login or E-mail address" name="login" id="login" value={login} onChange={e => setLogin(e.target.value)} />
        <Input type="password" placeholder="Password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        <SignInButton onClick={submitForm}>
          Submit
        </SignInButton>
        <br />
        <NLink to="/#">Forgot password?</NLink>
      </LoginForm>
    </Wrap>
  );
}

export default Index;
