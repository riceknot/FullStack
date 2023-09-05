import React from 'react';
import Axios from 'axios';

export default function welcomPage(){
    const products = Axios.get("http://localhost:3000/product")
                    .then((product) => {
                        console.log("Got all products!" + product)
                    })
                    .catch((error) => console.log(error));
    
    const allProducts = () => products.map((prd) => {
        <tr>
            <td>{prd.category}</td>
            <td>{prd.name}</td>
            <td>{prd.price}</td>
        </tr>
    })
    return (
        <table>
            <thead>
                <tr>
                    <td>Category</td>
                    <td>Name</td>
                    <td>Price</td>
                </tr>
            </thead>
            <tbody>
                {allProducts}
            </tbody>
        </table>
    );
}
