import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ProductsView from '../../components/Product';
import api from '../../services/api';

import './index.css';

export interface ProductsTypes {
  id: string;
  image: string;
  title: string;
  description: string;
  value: number;
}

export default function Product() {
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [promotionProducts, setPromotionProducts] = useState<ProductsTypes[]>([]);

  useEffect(() => {
    api.get('/product/search?query=recent').then(res => {
      setProducts(res.data);
    }).catch(err => {
      alert(err.message);
    });
    api.get('/product/search?query=in-promotion').then(res => {
      setPromotionProducts(res.data);
    }).catch(err => {
      alert(err.message);
    });
  },[]);

  return (
    <div className="product">
      <Header title="Produtos"/>
      <main>
        <section>
          <h2 className="sub-title">Recentes</h2>
          <div className="product-container">
            {
            console.log(process.env.REACT_APP_URL)

            }
          {
            products.map((item, index) => (
              <ProductsView props={item} key={index}/>
            ))
          }
          </div>
        </section>
        <section>
          <h2 className="sub-title">Em promoção</h2>
          <div className="product-container">
          {
            promotionProducts.map((item, index) => (
              <ProductsView props={item} key={index}/>
            ))
          }
          </div>
        </section>
      </main>
    </div>
  );
};