import React, { useState, FormEvent, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ProductsView from '../../components/Product';
import CurrencyConverter from '../../utils/CurrencyConverter';
import api from '../../services/api';

import { ProductType } from '../ProductsDetails';
import { CreditCardTypes } from '../Profile';

import './index.css';

export default function BuyProduct(props: RouteComponentProps) {
  const history = useHistory();
  const [product, setProduct] = useState<ProductType>();
  const [card, setCard] = useState<CreditCardTypes[]>();
  const [finalCardSelected, setFinalCardSelected] = useState<string>();
  const [finalQuantityProduct, setFinalQuantityProduct] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const {id} = props.match.params as {id: string};
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.replace('/login');
      return;
    } 

    api.get('/product', {
      params: {id}
    }).then(res => {
      setProduct(res.data);
    }).catch(err => {
      console.log(err)
    });

    api.get('/cards', {
      headers: {
        authorization: `Baerer ${token}`
      }
    }).then(res => {
      setCard(res.data);
    }).catch(err => {
      console.log(err);
    }).finally(() => {});
  }, [props]);

  function renderOpnions(quant: number): any {
    let array = [];
    for (var i = 0; i < quant; i++) {
      array[i] = i+1;
    };
    return array.map(item => (
      <option key={item}>{item}</option>
    ))
  };


  function handleFinalCheckout(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const ccv = prompt('CCV');
    
    api.post('/checkout', {
      productId: product?.id,
      quantity: finalQuantityProduct,
      ccv,
      cardId: finalCardSelected
    },{
      headers: {
        authorization: `Baerer ${token}`
      }
    }).then(res => {
      console.log(res);
      history.push('/');
    }).catch(err => {
      console.log(err);
      alert('Problemas com a compra');
    }).finally(() => {
      setLoading(false);
    })
  }

  if(!(product && card)) return (
    <Header title="Loading..."/>
  );

  return (
    <div className="buy-product">
      <Header title="Comprar"/>
      <main>
        <div className="product-review">
          <ProductsView props={product}/>
          <div className="product-quantity">
            <p>Quantidade</p>
            <select
              name="quanttity"
              id="quantity"
              value={finalQuantityProduct}
              onChange={e => setFinalQuantityProduct(Number(e.target.value))}
            >
              {
                product.quantity >= 10?
                renderOpnions(10):
                renderOpnions(product.quantity)
                
              }
            </select>
          </div>

        </div>
        <div className="product-cost">
          <div className="product-cost-content-block">
            <p>Valor unitario:</p>
            <span>{CurrencyConverter(product.value)}</span>
          </div>
          <div className="product-cost-content-block">
            <p>Valor total:</p>
            <span>{CurrencyConverter(product.value * finalQuantityProduct)}</span>
          </div>
          <div className="product-cost-content-block">
            <p>Desconto:</p>
            <span>{CurrencyConverter(product.value * (product.percent || 0) / 100 * finalQuantityProduct)}</span>
          </div>
          <div className="product-cost-content-block">
            <p>Total a pagar:</p>
            <span>{CurrencyConverter(
              (product.value * finalQuantityProduct) -
              (product.value * (product.percent || 0) / 100 * finalQuantityProduct)
            )}</span>
          </div>
        </div>
        <div className="final-purchase">
          <div className="credit-card-selection">
            <select
              name="quanttity"
              id="quantity"
              value={finalCardSelected}
              onChange={e => setFinalCardSelected(e.target.value)}
            >
              {
                card.map((card, index) => (
                  <option key={index} value={card.id}>**** {card.creditCardNumber}</option>
                ))
              }
            </select>
          </div>
          <button
            className="checkout-button"
            onClick={handleFinalCheckout}
          >{
            loading?
            <div className="loading-view"/>:
            'Comprar'
          }</button>
        </div>
      </main>
    </div>
  );
}