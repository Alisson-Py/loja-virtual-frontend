import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

import './index.css';
import leftArrowIcon from '../../assets/arrow-back-icon.svg';
import favoriteIcon from '../../assets/favorite-icon.svg';
import productIcon from '../../assets/product-icon.png';

export default function ProductsDetails() {
  return (
    <div className="products-details">
      <Header title="Detalhes"/>
      <main>
        <div className="header">
          <Link to="/">
            <img src={leftArrowIcon} alt="back" />
          </Link>
          <h2>title</h2>
          <button>
            <img src={favoriteIcon} alt="gostei" />
          </button>
        </div>
        <div className="content">
          <div className="image">
            <img src={productIcon} alt="producto" />
          </div>
          <div className="content-2">
            <p className="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos quam ullam distinctio harum repellendus? Voluptatum soluta maxime facilis reiciendis, nulla, inventore eum.</p>
            <div className="price-and-shop">
              <p className="value">11111</p>
              <button>Comprar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};