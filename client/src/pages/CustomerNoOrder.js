import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function WelcomPage(){
    const [productList, setProductList] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [cartList, setCartList] = useState([]);

    const params = useParams();
    const id = params.userID;
    function AddToCart(itemId, itemName, itemSellerID) {
        let bool = true;
        for (let i = 0 ; i < cartList.length; i++){
            if (cartList[i].id === itemId) {
                let newQuantity = cartList[i].quantity + 1
                
                return bool = false;
            }
        }
        if (bool){
            localStorage.setItem()
            
        }
    }       

    useEffect(() => {
        Axios.get('http://localhost:3000/product')
            .then((response) => {
                setProductList(response.data)
                setProductFilter(response.data)
            });
    }, []);

    return (
        <div>
            <div className='container border border-primary'>
                {productFilter.length === 0 ? (
                    <p>No data found</p>
                ) : (
                    productFilter.map((item, index) => (
                        <div key={index}>
                            <li>Name: <Link to={`/product/${item._id}`}>{item.name}</Link> || Price: {item.price}</li>
                            <button onClick={() => AddToCart(item._id, item.name, item.sellerID)}>Add To Cart</button>
                            <p></p>
                        </div>
                    ))
                )}
            </div>
            <p></p>
            <div className='container border border-primary'>
                <p>Your Cart:</p>
                {cartList.length === 0 ? (
                <p>Nothing in cart</p>
                ) : (
                    cartList.map((item, index) => (
                        <div key={index}>
                            <li>Name: {item.name} || Quantity: {item.quantity}</li>
                            <button onClick={async () => {
                                await Axios.delete(`http://localhost:3000/cart/delete/${item._id}`)
                                    .then(() => {
                                        console.log('Item removed!');
                                        Axios.get('http://localhost:3000/cart')
                                            .then((response) => setCartList(response.data));
                                    })
                                    .catch((error) => console.log(error.message))
                            }}>Remove</button>
                            <p></p>
                        </div>
                    ))
                )}
                <button onClick={() => {
                    if (cartList.length === 0) return;
                    for (let i = 0; i < cartList.length; i++){
                        Axios.delete(`http://localhost:3000/cart/delete/${cartList[i]._id}`)
                    }
                    setCartList([]);
                }}>Clear Cart</button><br/>
            </div>
        </div>
    );
}






