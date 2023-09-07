import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/navbar.component';
import Customer from './pages/Customer';
import Seller from './pages/Seller';
import Product from './pages/Product';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import ViewSellers from './pages/ViewSellers-Admin';
import ViewCate from './pages/ViewCate-Admin';
import AddCate from './pages/AddCate-Admin';

function App() {
  return (
    <Router>
      <div className='container'>
        <NavBar />
        <br />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/customer/:userID' Component={Customer} />
          <Route path='/seller/:userID' Component={Seller}/>
          <Route path='/product/:productID' Component={Product}/>
          <Route path='/register' Component={Register} />
          <Route path='/login' Component={Login} />
          <Route path='/admin/:userID' Component={ViewSellers} />
          <Route path='/admin/:userID/category' Component={ViewCate} />
          <Route path='/admin/:userID/category/add' Component={AddCate} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
