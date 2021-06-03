import React from 'react';
import Header from '../../components/Header';
import ProductsView from '../../components/Product';

import './index.css';

export default function Product() {
  const description = 'Lorem ipsum dolor sit amet ullam alias. Et, magnam consequuntur eveniet iure. Possimus temporibus quas commodi.'
  const data = {description, image: 'eawerawa', name: 'afarwawar', value: 1200, id: '1'}
  return (
    <div className="product">
      <Header title="Produtos"/>
      <main>
        <section>
          <h2 className="sub-title">Recentes</h2>
          <div className="product-container">
          {
            [1,2,3,4,5,6,7,8,9,0].map(item => (
              <ProductsView props={data} key={item}/>
            ))
          }
          </div>
        </section>
        <section>
          <h2 className="sub-title">Em promoção</h2>
          <div className="product-container">
          {
            [1,2,3,4,5,6,7,8,9,0].map(item => (
              <ProductsView props={data} key={item}/>
            ))
          }
          </div>
        </section>
      </main>
    </div>
  );
};