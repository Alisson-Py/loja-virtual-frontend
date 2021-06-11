import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../../components/Header';
import api from '../../services/api';

import './index.css';

export default function UpdateProfile() {
  const history = useHistory();
  const [cep, setCep] = useState<number>();
  const [street, setStreet] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [numberHome, setNumberHome] = useState<number>();
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!(email && token && id)) {
      window.location.replace('/login');
      return;
    };

    api.get(`/user/${id}`).then(res => {
      const data = res.data;
      setCep(data.cep);
      setCountry(data.country);
      setDistrict(data.district);
      setGender('M');
      setState(data.state);
      setStreet(data.street);
      setCity(data.city);
      setNumberHome(data.numberHome);
    }).catch(err => {
      console.log(err);
    });
  },[]);


  function hadnleUpdateProfile() {
    setLoading(true);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const data = {
      email,
      cep,
      street,
      district,
      state,
      country,
      gender,
      city,
      numberHome
    };

    api.put('/user/update',data,{
      headers: {
        authorization: `Baerer ${token}`
      }
    }).then(res => {
      alert('atualizado');
      history.goBack();
    }).catch(err => {
      alert('nao atualizado');
      console.log({err: err});
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className="update-profile">
      <Header title="Atualizar Perfil" />
      <main>
        <div className="form">
          <div className="input-block">
            <label htmlFor="street">Endereço</label>
            <input
              type="text"
              name="street"
              id="street"
              className="text-input"
              value={street}
              onChange={e => setStreet(e.target.value)}
              placeholder="Ex.: Rua da bagunça"
              autoComplete="off"
            />
          </div>
          <div className="input-block">
            <label htmlFor="number-home">numero</label>
            <input
              type="text"
              name="number-home"
              id="number-home"
              className="text-input"
              value={numberHome}
              onChange={e => setNumberHome(Number(e.target.value))}
              placeholder="Ex.: 10"
              autoComplete="off"
            />
          </div>
          <div className="input-block">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              name="cep"
              id="cep"
              className="text-input"
              value={cep}
              onChange={e => setCep(Number(e.target.value))}
              placeholder="Ex.: 12.123-123"
              autoComplete="off"
            />
          </div>
          <div className="input-block">
            <label htmlFor="district">Bairro</label>
            <input
              type="text"
              name="district"
              id="district"
              className="text-input"
              value={district}
              onChange={e => setDistrict(e.target.value)}
              placeholder="Ex.: Centro"
              autoComplete="off"
            />
          </div>
          <div className="input-block">
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              name="city"
              id="city"
              className="text-input"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Ex.: Salvador"
              autoComplete="off"
            />
          </div>
          <div className="input-block">
            <label htmlFor="state">Estado</label>
            <input
              type="text"
              name="state"
              id="state"
              className="text-input"
              value={state}
              onChange={e => setState(e.target.value)}
              placeholder="Ex.: BA"
              autoComplete="off"
            />
          </div>
          <div className="input-block">
            <label htmlFor="country">País</label>
            <input
              type="text"
              name="country"
              id="country"
              className="text-input"
              value={country}
              onChange={e => setCountry(e.target.value)}
              placeholder="Ex.: BR"
              autoComplete="off"
            />
          </div>
          <div className="input-block">
            <label htmlFor="gender">Genero</label>
            <div className="ratio-input-view">
              <input
                className="input-radio"
                type="radio"
                name="gender"
                id="female"
                value="F"
                onChange={e => setGender(e.target.value)}
              />
              <input
                className="input-radio"
                type="radio"
                name="gender"
                id="male"
                value="M"
                onChange={e => setGender(e.target.value)}
              />
            </div>
          </div>
          <button
            className="update-profile-submit"
            onClick={hadnleUpdateProfile}
          >
            {
              loading?
              <div className="loading-view"/>:
              'atualizar'
            }
          </button>
        </div>
      </main>
    </div>
  );
};