import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function NewProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const params = useParams();
    const id = params.userID;

    function handleSubmit(e){
        e.preventDefault()

        Axios.post(`http://localhost:3000/product/seller/${id.toString()}/add`, {
            category: productCategory,
            name: productName,
            price: productPrice,
        })
            .then(() => {
                console.log('Successfully add a new product!');
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        Axios.get(`http://localhost:3000/product/${id.toString()}`)
            .then((response) => {
                setProduct(response.data)
            }
        );
    }, []);

    useEffect(() => {
        Axios.get(`http://localhost:3000/order/seller/${id.toString()}`)
            .then((response) => {
                setOrder(response.data)
            }
        );
    }, []);
    
  return (
    <div>
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
        <br></br>
        <div className='container border border-primary'>
            {product.length === 0 ? (
                <p>No data found</p>
            ) : (
                product.map((item, index) => (
                    <div key={index}>
                        <li>Name: <Link to={`/product/${item._id}`}>{item.name}</Link> || Price: {item.price}</li>
                        <p></p>
                    </div>
                ))
            )}
        </div>
        <p></p>
        <div className='container border border-primary'>
            <p>Your Order:</p>
            {order.length === 0 ? (
            <p>Nothing in order</p>
            ) : (
                order.map((item, index) => (
                    <div key={index}>
                        <li>Name: {item.productName} || Quantity: {item.productQuantity} || Status: {item.status}</li>
                        
                        {item.status === "NEW" ? (
                            <div>
                                <button onClick={() => {
                                    Axios.put(`http://localhost:3000/order`, {
                                        _id: item._id,
                                        status: "Shipped"
                                    }).then(() => {
                                        console.log('Successfully update order to ship!');
                                        Axios.get(`http://localhost:3000/order/seller/${id.toString()}`)
                                        .then((response) => setOrder(response.data));
                                    }).catch((error) => {
                                        console.log(error.message)
                                    })
                                }}>Ship</button>
                                <button onClick={() => {
                                    Axios.put(`http://localhost:3000/order`, {
                                        _id: item._id,
                                        status: "Cancelled"
                                    }).then(() => {
                                        console.log('Successfully update order to cancel!');
                                        Axios.get(`http://localhost:3000/order/seller/${id.toString()}`)
                                        .then((response) => setOrder(response.data));
                                    }).catch((error) => {
                                        console.log(error.message)
                                    })
                                }}>Cancel</button>
                            </div>
                        ):(
                            <></>
                        )}
                        
                    </div>
                ))
            )}
        </div>
    </div>
  )
}
