import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';

import './index.css';

export default function AddCart() {
  const [fullName, setFullName] = useState<string>();
  const [cardNumber, setCardNumber] = useState<number>();
  const [cardNumberView, setCardNumberView] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [ccv, setCcv] = useState<number>();

  useEffect(() => {},[]);

  function handleAddCard() {

  }

  function maskInput(value: number): string {
    // const mask = 'xxxx xxxx xxxx xxxx';
    // const valueStr = value.toString().split('');
    // const returnedmask = mask.split('').map((item, index) => {
    //   if(valueStr[index]){
    //     return valueStr[index];
    //   };
    //   if ((index - 5)%4 === 0) return `${item}`
    //   return item;
    // });
    // return returnedmask.join('');
    return value.toString();
  }

  function updateCardNumber(e: ChangeEvent<HTMLInputElement>) {
    setCardNumber(Number(e.target.value));
    setCardNumberView(maskInput(Number(e.target.value)))
  }

  return (
    <div className="add-card">
      <Header title="Adicionar Cartao"/>
      <main>
        <div className="content">
          <div className="card-view">
            <p className="card-number">{
              cardNumberView?
              cardNumberView:
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
              onChange={e => setFullName(e.target.value.toUpperCase())}
            />
            <input
              type="text"
              name="card-number"
              id="card-number"
              placeholder="Digite o numero do cartao..."
              autoComplete='off'
              maxLength={16}
              value={cardNumber}
              onChange={updateCardNumber}
            />
            <div className="date-and-ccv-input">
              <input
                type="text"
                name="expiration-date"
                id="expiration-date"
                placeholder="Digite o expiration date..."
                autoComplete='off'
                maxLength={5}
                value={expirationDate}
                onChange={e => setExpirationDate(
                  e.target.value.length === 2?
                  e.target.value + '/':
                  e.target.value
                )}
              />
              <input
                type="text"
                name="ccv"
                id="ccv"
                placeholder="Digite o ccv..."
                autoComplete='off'
                value={ccv}
                maxLength={3}
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