import React, { useState } from 'react';
import Header from '../../components/Header';

import './index.css';
import userIcon from '../../assets/user-icon.svg';
import visibityIcon from '../../assets/visibility-icon.svg';
import visibilityOffIcon from '../../assets/visibility-off-icon.svg';
import api from '../../services/api';
import { useHistory } from 'react-router';

export default function Login() {
  const history = useHistory();
  const [visiblePassword, setVisiblePassord]  = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleLogin() {
    setLoading(true);
    api.get('/login', {
      auth: {
        username: email,
        password
      }
    }).then(res => {
      const {
        id,
        email,
        firstName,
        lastName,
        token
      } = res.data;

      localStorage.setItem('id', id);
      localStorage.setItem('email', email);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('token', token);
      
      history.goBack();
    }).catch(err => {
      alert('deu algo errado')
    }).finally(() => {
      setLoading(false);
    })

  }
  return (
    <div className="login">
      <Header title="Login"/>
      <main>
        <div/>

        <div className="form">
          <img src={userIcon} alt="user" className="user-icon" />
          <div className="input-and-button">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email..."
              autoComplete='off'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="password-input">
              <input
                type={visiblePassword? 'text': 'password'}
                name="password"
                id="password"
                placeholder="Digite sua senha..."
                autoComplete='off'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <img
                src={visiblePassword? visibityIcon: visibilityOffIcon}
                alt={visiblePassword? 'opened-eye': 'closed-eye'}
                onClick={() => setVisiblePassord(!visiblePassword)}
                className="password-visible-button"
              />
              <p className="forgot-password">Esqueçeu a senha?</p>
            </div>
            <button onClick={handleLogin}>{
              !loading?
              <p>Login</p>:
              <div className="loading-view"/>
            }</button>
          </div>
          <div/>
        </div>

        <div/>
      </main>
    </div>
  );
};