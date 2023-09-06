import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function WelcomPage(){
    const [productList, setProductList] = useState([]);
    
    Axios.get('http://localhost:3000/product').then((response) => setProductList(response.data));
    console.log(productList);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                {productList.length === 0 ? (
                    <tbody>
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No data found</td>
                        </tr>
                    </tbody>
                ) : (
                    productList.map((item) => (
                        <tbody>
                            <tr key={item._id}>
                                <td>{item.category}</td>
                                <td><Link to={`/product/${item._id}`}>{item.name}</Link></td>
                                <td>{item.price}</td>
                                <td>{item.id}</td>
                            </tr>
                        </tbody>
                    ))
                )}
            </table>
        </div>
    );
}


