import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Product() {
    const [product, setProduct] = useState([]);
    const params = useParams();
    const id = params.productID;
    Axios.get(`http://localhost:3000/product/${id.toString()}`).then((response) => setProduct(response.data));
    console.log(product)
  return (
    <div>
        <p>Product:</p>
        {product.length === 0 ? (
            <p>Product does not exist</p>
        ) : (
            <div>
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
            </div>    
        )
        }
    </div>
  )
}
