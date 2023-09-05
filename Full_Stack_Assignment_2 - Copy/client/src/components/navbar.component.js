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
                        <Link to="/product" className='nav-link'>Product Page</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/login" className='nav-link'>Login</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/register" className='nav-link'>Register</Link>
                    </li>
                </ul>
            </div>
        </nav>    
    );
} 

