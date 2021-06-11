import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import {ProductsTypes} from '../Product'

import './index.css';
import leftArrowIcon from '../../assets/arrow-back-icon.svg';
import favoriteIcon from '../../assets/favorite-icon.svg';
import api from '../../services/api';
import CurrencyConverter from '../../utils/CurrencyConverter';

export interface ProductType extends ProductsTypes {
  quantity: number;
  isPromotion: boolean;
  percent?: number;
}

export default function ProductsDetails(props: RouteComponentProps) {
  const history = useHistory();
  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    const {id} = props.match.params as {id: string};
    api.get('/product', {
      params: {
        id
      }
    }).then(res => {
      setProduct(res.data);
    }).catch(err => {
      console.log(err.message);
    }).finally(() => {
    });
  },[props])

  function handleGoBack() {
    history.goBack()
  }

  if (!product) return (
    <div className="product-details">
      <Header title="Loading..."/>
    </div>
  );
  return (
    <div className="products-details">
      <Header title="Detalhes"/>
      <main>
        <div className="header">
          <button
            className="button"
            onClick={handleGoBack}
          >
            <img src={leftArrowIcon} alt="back" />
          </button>
          <h2>{product.title}</h2>
          <button
            className="button"
          >
            <img src={favoriteIcon} alt="gostei" />
          </button>
        </div>
        
        <div className="content-view">
          <img src={product.image} alt={product.title} className="image" />
          <div className="content">
            <p className="description">{product.description}</p>
            <div className="informations">
              <p className="value"><strong>{CurrencyConverter(product.value)} a vista</strong><br/>ou<br/><strong>10x {CurrencyConverter(product.value / 10)} sem juros.</strong></p>
              <span
                className="quantity"
                id={product.quantity === 0? 'hidden':''}
              > <strong>estoque: </strong>{
                product.quantity <= 10?
                `apenas ${product.quantity}`:
                `${product.quantity} unidades`
                }
              </span>
              <button
                className="buy-button"
                id={product.quantity === 0? 'disable': ''}
                onClick={
                  product.quantity === 0?
                  () => {}:
                  () => {history.push(`/product/buy/${product.id}`)}
                }
              >
                {
                  product.quantity === 0?
                  'out of stock':
                  'comprar'
                }
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};