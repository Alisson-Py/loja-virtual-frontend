import React, { useEffect, useState } from 'react';

import './index.css';
import userIcon from '../../assets/user-icon.svg';
import cartIcon from '../../assets/cart-icon.svg';
import { Link, useHistory } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  const history = useHistory();
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [name, setName] = useState<string | null>();
  const [hierarchy, setHierarchy] = useState<string | null>();

  useEffect(() => {
    setName(localStorage.getItem('firstName'));
    setHierarchy(localStorage.getItem('hierarchy'));
  },[]);

  function handleLoOutUser() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('token');
    setName(null);
    setOpenProfile(false);
    history.push('/')
  }

  return (
    <header>
      <Link to='/' className="link">
        <img src={cartIcon} alt="cart" about="cart"/>
      </Link>
      <h1 className="title">{title}</h1>
      <button
        className="open-popup"
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
            {
              hierarchy === 'owner'?
              <Link to="/products/create" className="link">Adicionar produto</Link>:
              ''
            }
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