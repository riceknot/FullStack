import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function WelcomPage(){
    const [productList, setProductList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const params = useParams();
    const id = params.userID;
    function AddToCart(itemId, itemName) {
        let bool = true;
        for (let i = 0 ; i < cartList.length; i++){
            if (cartList[i].id === itemId) {
                let newQuantity = cartList[i].quantity + 1
                Axios.put(`http://localhost:3000/cart`, {
                    _id: cartList[i]._id,
                    quantity: newQuantity
                }).then(() => {
                    console.log('Successfully update cart!');
                }).catch((error) => {
                    console.log(error.message)
                })
                return  window.location.reload(false);
            }
        }
        if (bool){
            Axios.post(`http://localhost:3000/cart/add/${id.toString()}`, {
                    id: itemId,
                    name: itemName,
                    quantity: 1
                })
                    .then(() => {
                        console.log('Successfully add to cart!');
                    })
                    .then(() => window.location.reload(false))
                    .catch((error) => {
                        console.log(error.message)
                    }
            )
        }
    }

    useEffect(() => {
        Axios.get('http://localhost:3000/product')
            .then((response) => setProductList(response.data));
    }, []);

    useEffect(() => {
        Axios.get('http://localhost:3000/cart')
            .then((response) => setCartList(response.data));
    }, []);

    return (
        <div>
            {productList.length === 0 ? (
                <p>No data found</p>
            ) : (
                productList.map((item, index) => (
                    <div key={index}>
                        <li><Link to={`/product/${item._id}`}>{item.name}</Link> {item.price}</li>
                        <button onClick={() => AddToCart(item._id, item.name)}>Add To Cart</button>
                        <p></p>
                    </div>
                ))
            )}

            <div>
                <p>Your Cart:</p>
                {cartList.length === 0 ? (
                <p>Nothing in cart</p>
                ) : (
                    cartList.map((item, index) => (
                        <div key={index}>
                            <li>{item.name} {item.quantity}</li>
                            <button onClick={async () => {
                                await Axios.delete(`http://localhost:3000/cart/delete/${item._id}`)
                                    .then(() => {
                                        console.log('Item removed!');
                                        window.location.reload(false);
                                    })
                                    .catch((error) => console.log(error.message))
                            }}>Remove</button>
                        </div>
                    ))
                )}
            </div>
            <button onClick={() => {
                Axios.delete(`http://localhost:3000/cart/delete/${id.toString()}`).then(console.log('Cart cleared!'))
            }}>Clear Cart</button>
        </div>
    );
}

// onClick={AddToCart(item._id, item.name, id.toString())}





