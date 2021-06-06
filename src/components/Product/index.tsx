import React from 'react';
import CurrencyConverter from '../../utils/CurrencyConverter';
import { useHistory } from 'react-router';

import './index.css';
import productIcon from '../../assets/product-icon.png';
import favoriteIcon from '../../assets/favorite-icon.svg';

interface ProductsProps {
  props: {
    id: string;
    image: string;
    title: string;
    description: string;
    value: number;
  }
};

const ProductsView: React.FC<ProductsProps> = ({props}) => {
  const history = useHistory();

  function handleNavigateToProductDetails(id: string): void {
    history.push('/product/' + id);
  }

  return (
    <div className="product-view" onClick={() => handleNavigateToProductDetails(props.id)}>
      <img src={productIcon} alt={props.title} className="img" />
      <h3 className="title">{props.title}</h3>
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