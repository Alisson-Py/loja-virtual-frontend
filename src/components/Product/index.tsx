import React from 'react';
import CurrencyConverter from '../../utils/CurrencyConverter';

import './index.css';

interface ProductsProps {
  props: {
    image: string;
    name: string;
    description: string;
    value: number;
  }
};

const ProductsView: React.FC<ProductsProps> = ({props}) => {
  return (
    <div className="product-view">
      <img src={props.image} alt={props.name} />
      <h3 className="title">{props.name}</h3>
      <p className="description">{props.description}</p>
      <p className="value"><strong>{CurrencyConverter(props.value)}</strong><br/>
        ou
        <br/> 10x <strong>{CurrencyConverter(Number((props.value / 10).toPrecision()))}</strong>
      </p>
    </div>
  );
};

export default ProductsView;