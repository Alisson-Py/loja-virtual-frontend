import React from 'react';
import Header from '../../components/Header';
import ProductsView from '../../components/Product';

export default function Product() {
  return (
    <div className="product">
      <Header title="Produtos"/>
      <main>
        <section>
          <h2 className="sub-title">Recentes</h2>
          <ProductsView props={{description: 'awraerawe', image: 'eawerawa', name: 'afarwawar', value: 1200}} />
        </section>
        <section>
          <h2 className="sub-title">Em promoção</h2>
        </section>
      </main>
    </div>
  );
};