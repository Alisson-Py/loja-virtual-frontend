import React from 'react';
import CurrencyConverter from '../../utils/CurrencyConverter';

import './index.css';
import productIcon from '../../assets/product-icon.png';
import favoriteIcon from '../../assets/favorite-icon.svg';

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
      <img src={productIcon} alt={props.name} className="img" />
      <h3 className="title">{props.name}</h3>
      <p className="description">{props.description}</p>
      <p className="value"><strong>{CurrencyConverter(props.value)}</strong><br/>
        ou
        <br/> 10x <strong>{CurrencyConverter(Number((props.value / 10).toPrecision()))}</strong>
      </p>
      <img src={favoriteIcon} alt="favorites" className="favorite-button"/>
    </div>
  );
};

export default ProductsView;