import React, { useState } from 'react';
import Header from '../../components/Header';

import './index.css';
import userIcon from '../../assets/user-icon.svg';
import visibityIcon from '../../assets/visibility-icon.svg';
import visibilityOffIcon from '../../assets/visibility-off-icon.svg';

export default function Login() {
  const [visiblePassword, setVisiblePassord]  = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleLogin() {
    setLoading(true);
    setLoading(false);

  }
  return (
    <div className="login">
      <Header title="Login"/>
      <main>
        <div/>

        <div className="form">
          <img src={userIcon} alt="user" className="user-icon" />
          <div className="input-and-button">
            <input type="email" name="email" id="email" placeholder="Digite seu email..." autoComplete='off'/>
            <div className="password-input">
              <input
                type={visiblePassword? 'text': 'password'}
                name="password"
                id="password"
                placeholder="Digite sua senha..."
                autoComplete='off'
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