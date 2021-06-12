import React, { ChangeEvent, useState } from 'react';
import Header from '../../components/Header';

import './index.css';
import closeIcon from '../../assets/close-icon.svg';
import addPhotoIcon from '../../assets/add-photo-icon.svg';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

export default function ProductCreate() {
  const history = useHistory();
  const [loading,setLoading] = useState<boolean>(false);
  const [isVisible,setIsVisible] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [inPromotion, setInPromotion] = useState<boolean>();
  const [percent, setPercent] = useState<string>('');

  async function handleCreateProduct() {
    setLoading(true);
    const data = new FormData();
    const token = localStorage.getItem('token');

    data.append('title', name);
    data.append('description', description);
    data.append('value', value);
    data.append('quantity', quantity);
    data.append("inPromotion", String(inPromotion));
    data.append('percent', percent);
    if (file){
      data.append('image', file);
    }
    api.post('/product', data, {
      headers: {
        authorization: `Baerer ${token}`
      },
    }).then(res => {
      alert('success');
      history.goBack();
    }).catch(err => {
      alert('nao deu certo');
    }).finally(() => {
      setLoading(false);
    });
    return;
  };

  function handleUploadedImg(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if(!e.target.files) return 

    setFile(e.target.files[0]);

    const imgDiv = document.getElementById('img-view');
    if (!imgDiv) return;
    imgDiv.style.background = `url(${URL.createObjectURL(e.target.files[0])}) no-repeat center center`;
    setIsVisible(true);
  };
  
  function handleRemoveImg() {
    setFile(null);
    const imgDiv = document.getElementById('img-view');
    if (!imgDiv) return;
    imgDiv.style.background = ``;
    setIsVisible(false)
  };

  return (
    <div className="product-create">
      <Header title="Criar"/>
      <main>
        <div className="form">
          <div className="img" id="img-view">
            <button
              className={`clear-bg`}
              id={`${isVisible? '': 'invisible'}`}
              onClick={handleRemoveImg}
            >
              <img src={closeIcon} alt="clear" />
            </button>
            <label
              htmlFor="add-file"
              id={isVisible? 'invisible': ''}
            >
              <img src={addPhotoIcon} alt="add" className="add"/>
            </label>
            <input type="file" name="add-file" id="add-file" onChange={handleUploadedImg} />
          </div>
          
          <div className="input-text-view">
            <label htmlFor="">Nome</label> <br/>
            <input
              type="text"
              className="input-text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          
          <div className="input-text-view">
            <label htmlFor="">Descrição</label> <br/>
            <input
              type="text"
              className="input-text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="input-flex">
            
            <div className="input-text-view">
              <label htmlFor="">Valor</label> <br/>
              <input
                type="number"
                className="input-text"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </div>
            
            <div className="input-text-view">
              <label htmlFor="">Quantidade</label> <br/>
              <input
                type="number"
                className="input-text"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="input-flex">
            
            <div className="input-text-view">
              <label htmlFor="">Em Promoção</label> <br/>
              <input
                type="checkbox"
                className="input-text"
                onChange={e => setInPromotion(e.target.checked)}
              />
            </div>
            
            <div className="input-text-view">
              <label htmlFor="">Porcentagem da promoção</label> <br/>
              <input
                type="number"
                className="input-text"
                value={percent}
                onChange={e => setPercent(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleCreateProduct}
          >
            {
              !loading?
              <p>Criar</p>:
              <div className="loading-view"></div>
            }
          </button>
        </div>
      </main>
    </div>
  );
};