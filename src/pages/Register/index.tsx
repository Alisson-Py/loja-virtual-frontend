import React, { useState } from 'react';
import Header from '../../components/Header';

import './index.css';
import userIcon from '../../assets/user-icon.svg';
import api from '../../services/api';
import { useHistory } from 'react-router';

export default function Register() {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repitePassword, setRepeatPassword] = useState<string>('');

  function handleRegister() {
    setLoading(true);
    const data = {
      firstName,
      lastName,
      email,
      password
    };
    if(password !== repitePassword) {
      alert('wrong password');
      setLoading(false);
      return;
    };
    api.post('/users', data).then(res => {
      localStorage.setItem('id', res.data.id);
      localStorage.setItem('email', email);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('hierarchy', res.data.hierarchy);
      history.goBack();
    }).catch(err => {
      alert('algo de errado');
    }).finally(() => {
      setLoading(false);
    });

  }
  
  return (
    <div className="register">
      <Header title="Register"/>
      <main>
        <div/>

        <div className="form">
          <img src={userIcon} alt="user" className="user-icon" />
          <div className="input-and-button">
            <input
              type="text"
              name="first-name"
              id="first-name"
              placeholder="Digite seu nome..."
              autoComplete='off'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />

            <input
              type="text"
              name="last-name"
              id="last-name"
              placeholder="Digite seu sobrenome..."
              autoComplete='off'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email..."
              autoComplete='off'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite uma senha..."
              autoComplete='off'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="repeat-password"
              id="repeat-password"
              className={password !== repitePassword? "wrong-password": ""}
              placeholder="Repita sua senha..."
              autoComplete='off'
              value={repitePassword}
              onChange={e => setRepeatPassword(e.target.value)}
              
            />

            <button onClick={handleRegister}>
              {
                !loading?
                <p>Register</p>:
                <div className="loading-view"/>
              }
            </button>
          </div>
        </div>

        <div/>
      </main>
    </div>
  );
};