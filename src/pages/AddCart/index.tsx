import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

import './index.css';

export default function AddCart() {
  const [fullName, setFullName] = useState<string>();
  const [cardNumber, sertCardNumber] = useState<number>();
  const [cardNumberView, sertCardNumberView] = useState<number>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [ccv, setCcv] = useState<number>();

  useEffect(() => {},[]);

  function handleAddCard() {

  }

  return (
    <div className="add-card">
      <Header title="Adicionar Cartao"/>
      <main>
        <div className="content">
          <div className="card-view">
            <p className="card-number">{
              cardNumber?
              cardNumber:
              'xxxx xxxx xxxx xxxx'
            }</p>
            <div className="botton-card-data">
              <p className="name">{
                fullName?
                fullName:
                'PROPRIETÁRIO DO CARTÃO'
              }</p>
              <div className="date-and-ccv">
                <p className="expiration-date">{
                  expirationDate?
                  expirationDate:
                  'MM/AA'
                }</p>
                <p className="ccv">{
                  ccv?
                  ccv:
                  '***'
                }</p>
              </div>
            </div>
          </div>
          <div className="form">
            <input
              type="text"
              name="card-number"
              id="card-number"
              placeholder="Digite o nome do titular..."
              autoComplete='off'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
            <input
              type="text"
              name="card-number"
              id="card-number"
              placeholder="Digite o numero do cartao..."
              autoComplete='off'
              value={cardNumber}
              onChange={e => sertCardNumber(Number(e.target.value))}
            />
            <div className="date-and-ccv-input">
              <input
                type="text"
                name="expiration-date"
                id="expiration-date"
                placeholder="Digite o expiration date..."
                autoComplete='off'
                value={expirationDate}
                onChange={e => setExpirationDate(e.target.value)}
              />
              <input
                type="text"
                name="ccv"
                id="ccv"
                placeholder="Digite o ccv..."
                autoComplete='off'
                value={ccv}
                onChange={e => setCcv(Number(e.target.value))}
              />
            </div>
            <button
              className="add-card-submit-button"
              onClick={handleAddCard}
            >Cadastrar Cartão</button>
          </div>
        </div>
      </main>
    </div>
  );
}