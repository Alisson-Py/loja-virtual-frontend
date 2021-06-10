import React, { useEffect, useState } from 'react';
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

interface CreditCardTypes {
  id: string;
  creditCardNumber: string;
  fullName: string;
  expirationDate: string;
}

export default function Profile() {
  const [user, setUser] = useState<UsersTypes>();
  const [creditCard, setCreditCard] = useState<CreditCardTypes[]>();

  useEffect(() => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    api.get(`/user/${id}`).then((res) => {
      const data = res.data as UsersTypes
      setUser(data);
    }).catch(err => {
      console.log(err.message)
    })

    api.get('/cards',{
      headers: {
        authorization: `Baerer ${token}`
      }
    }).then(res => {
    const data = res.data as CreditCardTypes[];
    setCreditCard(data);
    }).catch(err => {
      alert('nao deu pra buscar os cartoes de creditos');
    });

  },[]);

  if (!(user && creditCard)) return (
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
                  creditCard.map((card, index) => (
                    <div className="card-view" key={index.toString()}>
                      <span>*** *** *** {card.creditCardNumber}</span>
                      <div className="botton-card-data">
                        <span>{card.fullName.toLowerCase()}</span>
                        <div className="date-and-ccv">
                          <span>{card.expirationDate}</span>
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