import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
    const [role, setRole] = useState("");
    console.log(role)
    useEffect(() => {
        setRole(localStorage.getItem('role'))
    }, []);
    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
            <Link to="/" className='navbar-brand'>Full Stack Laz</Link>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to="/" className='nav-link'>Login</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/register" className='nav-link'>Register</Link>
                        </li>   
                    {/* <li className='navbar-item'>
                        <Link to="/login" className='nav-link'>Login</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/register" className='nav-link'>Register</Link>
                    </li> */}
                </ul>
            </div>
        </nav>    
    );
} 

