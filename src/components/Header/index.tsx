import React from 'react';

import './index.css';
import userIcon from '../../assets/user-icon.svg';
import cartIcon from '../../assets/cart-icon.svg';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <header>
      <Link to='/cart' className="link">
        <img src={cartIcon} alt="cart" about="cart"/>
      </Link>
      <h1 className="title">{title}</h1>
      <Link to='/profile' className="link">
        <img src={userIcon} alt="profile" about="profile" />
      </Link>
    </header>
  );
};

export default Header;