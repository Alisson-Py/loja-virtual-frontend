import React from 'react';
import Header from '../../components/Header';

import './index.css';

export default function UpdateProfile() {

  return (
    <div className="update-profile">
      <Header title="Atualizar Perfil" />
      <main>
        <div className="form">
          <input type="text" />
        </div>
      </main>
    </div>
  );
};