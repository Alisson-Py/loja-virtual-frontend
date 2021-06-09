import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';

import './index.css';
import userAccountIcon from '../../assets/user-account-icon.svg';

interface UsersTypes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cep: number;
  street: string;
  district: string;
  city: string;
  state: string;
  country: string;
  numberHome: number;
  avatar: string | null;
  gender: 'M' | 'F';
  hierarchy: 'owner' | 'user';
}

export default function Profile() {
  const [user, setUser] = useState<UsersTypes>();

  useEffect(() => {
    const id = localStorage.getItem('id');
    api.get(`/user/${id}`).then((res) => {
      const data = res.data as UsersTypes
      setUser(data);
   }).catch(err => {
     console.log(err.message)
   })
  },[])

  if (!user) return (
    <div className="profile">
      <Header title="Loading..."/>
    </div>
  );

  return (
    <div className="profile">
      <Header title="Perfil"/>
      <main>
        <div className="header">
          <img src={userAccountIcon} alt="account" />
          <h1 className="user-name">{`Olá ${user.firstName} ${user.lastName}`}</h1>
        </div>
        <div className="content">
          <div className="data">
            <div className="data-block">
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>
            <div className="data-block">
              <h3>Cartões</h3>
              <div className="card-grid">
                {
                  [1,2,3].map(item => (
                    <div className="card-view" key={item.toString()}>
                      <span>*** *** *** {`${item}${item}${item}${item}`}</span>
                      <div className="botton-card-data">
                        <span>Alisson Silva dos Santos</span>
                        <div className="date-and-ccv">
                          <span>12/30</span>
                          <span>***</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="data-block">
              <h3>Endereço</h3>
              <p>
                {user.street}<br/>
                {user.numberHome}<br/>
                {user.district}<br/>
                {user.city}, {user.state}, {user.country}
              </p>
            </div>
          </div>
          <div className="actions">
            <button
              className="update-account"
              onClick={() => {}}
            >Atualizar cadastro</button>

            <Link to='#' className="link">alterar senha</Link>
            <Link to='/add-card' className="link">alterar/adcionar cartão</Link>
            <Link to='#' className="link">alterar endereço</Link>

            <button
              className="delete-account"
              onClick={() => {}}
            >Deletar conta</button>
          </div>
        </div>
      </main>
    </div>
  );
};