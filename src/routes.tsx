import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AddCart from './pages/AddCard';
import BuyProduct from './pages/BuyProduct';
import Login from './pages/Login';

import Product from './pages/Product';
import ProductCreate from './pages/ProductCreate';
import ProductsDetails from './pages/ProductsDetails';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ShowPayment from './pages/ShowTransactions';
import UpdateProfile from './pages/UpdateProfile';


export default function Routes() {
  return (
    <BrowserRouter>
      {/* <Route path="/landing" component={} /> */}
      <Route exact path="/" component={Product} />
      <Route exact path="/product/:id" component={ProductsDetails} />
      <Route exact path="/products/create" component={ProductCreate} />
      <Route exact path="/add-card" component={AddCart} />
      <Route exact path="/product/buy/:id" component={BuyProduct} />
      <Route exact path="/checkout" component={ShowPayment} />
      
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/update" component={UpdateProfile} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      {/* <Route exact path="/" component={} /> */}
    </BrowserRouter>
  );
}