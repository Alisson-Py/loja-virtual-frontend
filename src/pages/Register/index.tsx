import React, { useState } from 'react';
import Header from '../../components/Header';

import './index.css';
import userIcon from '../../assets/user-icon.svg';

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);

  function handleRegister() {
    setLoading(true);
    setLoading(false);

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
            />

            <input
              type="text"
              name="last-name"
              id="last-name"
              placeholder="Digite seu sobrenome..."
              autoComplete='off'
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email..."
              autoComplete='off'
            />
            
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite uma senha..."
              autoComplete='off'
            />
            <input
              type="password"
              name="repeat-password"
              id="repeat-password"
              placeholder="Repita sua senha..."
              autoComplete='off'
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