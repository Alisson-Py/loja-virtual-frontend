import React, { useEffect, useState } from 'react';

import './index.css';
import userIcon from '../../assets/user-icon.svg';
import cartIcon from '../../assets/cart-icon.svg';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [name, setName] = useState<string | null>();

  useEffect(() => {
    setName(localStorage.getItem('firstName'));
  });

  function handleLoOutUser() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('token');
    setName(null);
    setOpenProfile(false);
  }

  return (
    <header>
      <Link to='#' className="link">
        <img src={cartIcon} alt="cart" about="cart"/>
      </Link>
      <h1 className="title">{title}</h1>
      <button
        className="link"
        onClick={() => setOpenProfile(!openProfile)}
      >
        <img src={userIcon} alt="profile" about="profile" />
      </button>
      {
        name?(
          <div
            className="profile"
            id={!openProfile? 'hidden': ''}
          >
            <p className="name">Olá, {name}</p>
            <Link to='/profile' className="link">Perfil</Link>
            <button
              className="log-out"
              onClick={handleLoOutUser}
            >Log-out</button>
          </div>
        ):(
          <div
            className="profile"
            id={!openProfile? 'hidden': ''}
          >
        <Link to='/login' className="link">Login</Link>
        <Link to='/register' className="link">Register</Link>
      </div>
        )
      }
    </header>
  );
};

export default Header;