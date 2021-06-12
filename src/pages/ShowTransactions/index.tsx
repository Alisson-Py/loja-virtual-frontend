import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';

interface TransactionsType {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalValue: number;
  processing: string;
}


export default function ShowTransactions() {
  const history = useHistory();
  const [transactions, setTransactions] = useState<TransactionsType[]>()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
    api.get('/checkout',{
      headers: {
        authorization: `Baerer ${token}`
      }
    }).then(res => {
      setTransactions(res.data);
    }).catch(err => {
      console.log(err);
    })
  },[history]);

  if (!transactions) return (
    <div className="show-payment">
      <Header title="Loading..." />
    </div>
  );

  return (
    <div className="show-payment">
      <Header title="Compras registradas" />
      <main>
        <div className="block">
          <h2>Transações</h2>
          <div className="block-block">
            {
              transactions.map(transaction => {
                return (
                  <div key={transaction.id} className="transaction-view">
                    <p>transaction ID: {transaction.id}</p>
                    <p>Product ID: {transaction.productId}</p>
                    <p>Quantidade: {transaction.quantity}</p>
                    <p>Valor da compra: {transaction.totalValue}</p>
                    <p>Proccess: {transaction.processing}</p>
                    <br/>
                  </div>
                );
              })
            }
          </div>
        </div>
      </main>
    </div>
  );
};