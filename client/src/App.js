import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/navbar.component';
import WelcomPage from './components/welcomPage';
import newProduct from './components/newProduct';
import Product from './components/Product';

import Register from './components/Register';
import Login from './components/Login';

import ViewSellers from './components/ViewSellers-Admin';

function App() {
  return (
    <Router>
      <div className='container'>
        <NavBar />
        <br />
        <Routes>
          <Route path='/' Component={WelcomPage} />
          <Route path='/seller/:userID' Component={newProduct}/>
          <Route path='/product/:productID' Component={Product}/>
          <Route path='/register' Component={Register} />
          <Route path='/login' Component={Login} />
          <Route path='/admin/:userID' Component={ViewSellers} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
