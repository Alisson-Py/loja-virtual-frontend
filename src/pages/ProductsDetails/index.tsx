import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import {ProductsTypes} from '../Product'

import './index.css';
import leftArrowIcon from '../../assets/arrow-back-icon.svg';
import favoriteIcon from '../../assets/favorite-icon.svg';
import productIcon from '../../assets/product-icon.png';
import api from '../../services/api';

interface ProductType extends ProductsTypes {
  quantity: number;
  isPromotion: boolean;
  percent?: number;
}

export default function ProductsDetails(props: RouteComponentProps) {
  const history = useHistory();
  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    const params = props.match.params;
    api.get('/product', {
      params
    }).then(res => {
      setProduct(res.data);
    }).catch(err => {
      console.log(err.message);
    }).finally(() => {
    });
  },[])

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
        <div className="content">
          <div className="image">
            <img src={productIcon} alt="producto" />
          </div>
          <div className="content-2">
            <p className="description">{product.description}</p>
            <div className="price-and-shop">
              <p className="value">{product.value}</p>
              <button>Comprar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};