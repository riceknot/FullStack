import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/navbar.component';
import welcomPage from './components/welcomPage';
import sellerList from './components/sellerList.component';
import EditSeller from './components/editSeller.component';
import CreateCustomer from './components/createCustomer';
import CreateSeller from './components/createSeller.component';
import customerList from './components/customerList.component';
import EditCustomer from './components/editCustomer.component';
import productPage from './components/productPage';
import productCreate from './components/createProduct';

import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className='container'>
        <NavBar />
        <br />
        <Routes>
          <Route path='/' Component={welcomPage} />
          <Route path='/customer' Component={customerList} />
          <Route path='/sellers' Component={sellerList} />
          <Route path='/customer/edit/:id' Component={EditCustomer} />
          <Route path='/seller/edit/:id' Component={EditSeller} />
          <Route path='/customer/create' Component={CreateCustomer} />
          <Route path='/sellers/create' Component={CreateSeller} />
          <Route path='/product' Component={productPage} />
          <Route path='/product/create' Component={productCreate} />
          <Route path='/register' Component={Register} />
        </Routes>
      </div>
    </Router>
  );
}
