import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../components/Header';
import ProductsView from '../../components/Product';
import CurrencyConverter from '../../utils/CurrencyConverter';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { ProductType } from '../ProductsDetails';
import { CreditCardTypes } from '../Profile';

import './index.css';

export default function BuyProduct(props: RouteComponentProps) {
  const [product, setProduct] = useState<ProductType>();
  const [card, setCard] = useState<CreditCardTypes[]>();
  const [cardSelected, setCardSelected] = useState<string>()
  const [finalQuantityProduct, setFinalQuantityProduct] = useState<number>(1);
  const [ccv, setCcv] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const {id} = props.match.params as {id: string};
    const token = localStorage.getItem('token');

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
    })
  },[props]);

  function renderOpnions(quant: number): any {
    let array = [];
    for (var i = 0; i < quant; i++) {
      array[i] = i+1;
    };
    return array.map(item => (
      <option key={item}>{item}</option>
    ))
  };

  function handleFinalCheckout() {
    setLoading(true)
    const token = localStorage.getItem('token');
    if(!(product && card)) {
      alert('dados faltando');
      return
    }
    api.post('/checkout',{
      productId: product.id,
      quantity: finalQuantityProduct,
      ccv: 123,
      cardId: card[0].id,
    },{
      headers: {
        authorization: `Baerer ${token}`
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }

  if(!product) return (
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
            name="cards-show"
            id="cards-show"
            value={cardSelected}
            onChange={e => setCardSelected(e.target.value)}
          >
            {
              card?
              card.map(item => (
                <option key={item.id} value={item.id}>*** {item.creditCardNumber}</option>
              )):
              <Link to="/add-card">adicionar cartao</Link>
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