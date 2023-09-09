import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link,
    // useParams 
} from 'react-router-dom';

export default function WelcomPage(){
    const [productFilter, setProductFilter] = useState([]);
    const [cartList, setCartList] = useState([]);
    function GetCart(){
        let arr = [];
        for (let i = 0; i< localStorage.length; i++){
            arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        setCartList(arr);
    }
    function AddToCart(itemId, itemName, itemSellerID) {
        let bool = true;
        for (let i = 0 ; i < localStorage.length; i++){
            let key = JSON.parse(localStorage.getItem(localStorage.key(i)))
            if (key.id === itemId) {
                let oldQuantity = JSON.parse(localStorage.getItem(`${itemId}`));
                let newQuantity = oldQuantity.quantity + 1
                console.log(newQuantity)
                localStorage.setItem(`${itemId}`, JSON.stringify({
                    id: itemId,
                    name: itemName,
                    quantity: newQuantity,
                    sellerID: itemSellerID
                }))
                console.log('Update local cart')
                GetCart()
                return bool = false;
            }
        }
        if (bool){
            localStorage.setItem(`${itemId}`, JSON.stringify({
                id: itemId,
                name: itemName,
                quantity: 1,
                sellerID: itemSellerID
            }))
            console.log('Add to local cart')
            GetCart()
        }
    }       

    function DeleteItem(id){
        localStorage.removeItem(`${id}`);
        GetCart()
    }

    useEffect(() => {
        Axios.get('http://localhost:3000/product')
            .then((response) => {
                // setProductList(response.data)
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
                {localStorage.length === 0 ? (
                <p>Nothing in cart</p>
                ) : (
                    cartList.map((item, index) => (
                        <div key={index}>
                            <li>Name: {item.name} || Quantity: {item.quantity}</li>
                            <button onClick={() => DeleteItem(item.id)}>Remove</button>
                            <p></p>
                        </div>
                    ))
                )}
                <button onClick={() => {
                    if (localStorage.length === 0) return;
                    setCartList([]);
                    localStorage.clear();
                }}>Clear Cart</button><br/>
            </div>
        </div>
    );
}






