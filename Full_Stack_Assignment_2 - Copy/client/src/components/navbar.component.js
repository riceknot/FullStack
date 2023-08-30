import React from 'react';
import { Link } from 'react-router-dom';

export default function navbar(){
    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
            <Link to="/" className='navbar-brand'>Full Stack Laz</Link>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav mr-auto'>
                <li className='navbar-item'>
                        <Link to="/" className='nav-link'>Home</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/customer" className='nav-link'>Customer</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/customer/create" className='nav-link'>Create Customer</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/sellers/create" className='nav-link'>Create Seller</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/sellers" className='nav-link'>Sellers</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/product" className='nav-link'>Product Page</Link>
                    </li>
                </ul>
            </div>
        </nav>    
    );
} 

