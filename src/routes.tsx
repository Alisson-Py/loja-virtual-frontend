import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AddCart from './pages/AddCart';
import Login from './pages/Login';

import Product from './pages/Product';
import ProductCreate from './pages/ProductCreate';
import ProductsDetails from './pages/ProductsDetails';
import Profile from './pages/Profile';
import Register from './pages/Register';


export default function Routes() {
  return (
    <BrowserRouter>
      {/* <Route path="/landing" component={} /> */}
      <Route exact path="/" component={Product} />
      <Route exact path="/product/:id" component={ProductsDetails} />
      <Route exact path="/products/create" component={ProductCreate} />
      <Route exact path="/add-card" component={AddCart} />
      {/* <Route exact path="/product/update/:id" component={} /> */}
      <Route exact path="/profile" component={Profile} />
      {/* <Route exact path="/profile/update" component={} /> */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      {/* <Route exact path="/" component={} /> */}
    </BrowserRouter>
  );
}