import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function NewProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const params = useParams();
    const id = params.userID;

    function handleSubmit(e){
        e.preventDefault()

        Axios.post(`http://localhost:3000/product/seller/${id.toString()}/add`, {
            category: productCategory,
            name: productName,
            price: productPrice
        })
            .then(() => {
                console.log('Successfully add a new product!');
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
            <label>Category:</label><br></br>
            <input type="text" 
                className="productCatergory"
                onChange={(e) => { setProductCategory(e.target.value);
                    
                }}
            />       
        </div>
        <div className="form-outline mb-4">
            <label>Name:</label><br></br>
            <input type="text" 
                className="productName"
                onChange={(e) => { setProductName(e.target.value) }}
            />       
        </div>
        <div className="form-outline mb-4">
            <label>Price:</label><br></br>
            <input type="number" 
                className="productPrice"
                onChange={(e) => { setProductPrice(e.target.value) }}
            />       
        </div>
        <button type='submit' className='btn btn-primary btn-block mb-4'>Create Product</button>
    </form>
  )
}
