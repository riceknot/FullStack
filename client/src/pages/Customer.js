import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function WelcomPage(){
    const [productList, setProductList] = useState([]);
    // const [productFilterByName, setProductFilterByName] = useState([]);
    // const [productFilterByPriceFrom, setProductFilterByPriceFrom] = useState([]);
    // const [productFilterByPriceTo, setProductFilterByPriceTo] = useState([]);
    // const [productFilterByDate, setProductFilterByDate] = useState([]);
    // const [searchInput, setSearchInput] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    // const [button, setButton] = useState(false);

    // const [inputText, setInputText] = useState('');
    // const [input1, setInput1] = useState('');
    // const [input2, setInput2] = useState('');


    // const handleInputChange1 = (e) => {
    //     const value = e.target.value;

    //     // Allow only positive numbers
    //     if (/^[0-9]*$/.test(value)) {
    //         setInput1(value);
    //     }
    // };

    // const handleInputChange2 = (e) => {
    //     const value = e.target.value;

    //     // Allow only positive numbers
    //     if (/^[0-9]*$/.test(value)) {
    //         setInput2(value);
    //     } 
    // };

    const params = useParams();
    const id = params.userID;
    function AddToCart(itemId, itemName, itemSellerID) {
        let bool = true;
        for (let i = 0 ; i < cartList.length; i++){
            if (cartList[i].id === itemId) {
                let newQuantity = cartList[i].quantity + 1
                Axios.put(`http://localhost:3000/cart`, {
                    _id: cartList[i]._id,
                    quantity: newQuantity
                }).then(() => {
                    console.log('Successfully update cart!');
                    Axios.get('http://localhost:3000/cart')
                    .then((response) => setCartList(response.data));
                }).catch((error) => {
                    console.log(error.message)
                })
                return bool = false;
            }
        }
        if (bool){
            Axios.post(`http://localhost:3000/cart/add/${id.toString()}`, {
                    id: itemId,
                    name: itemName,
                    quantity: 1,
                    sellerID: itemSellerID
                })
                    .then(() => {
                        console.log('Successfully add to cart!');
                        Axios.get('http://localhost:3000/cart')
                        .then((response) => setCartList(response.data));
                    })
                    .catch((error) => {
                        console.log(error.message)
                    }
            )
        }
    }       

    useEffect(() => {
        Axios.get('http://localhost:3000/product')
            .then((response) => {
                setProductList(response.data)
                setProductFilter(response.data)
            });
    }, []);

    useEffect(() => {
        Axios.get('http://localhost:3000/cart')
            .then((response) => setCartList(response.data));
    }, []);

    useEffect(() => {
        Axios.get(`http://localhost:3000/order/customer/${id.toString()}`)
            .then((response) => setOrderList(response.data));
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
                <p></p>
                <button onClick={() => {
                    if (cartList.length === 0) return;
                    for (let i = 0; i < cartList.length; i++){
                        Axios.post(`http://localhost:3000/order/add/${id.toString()}/${cartList[i].sellerID.toString()}`, {
                            productName: cartList[i].name,
                            productQuantity: cartList[i].quantity
                        })
                        Axios.delete(`http://localhost:3000/cart/delete/${cartList[i]._id}`)
                    }
                    Axios.get(`http://localhost:3000/order/customer/${id.toString()}`).then((response) => setOrderList(response.data));
                    setCartList([]);
                }}>Order Cart</button>
                <p></p>
            </div>
            <p></p>
            <div className='container border border-primary'>
                <p>Your Order:</p>
                {orderList.length === 0 ? (
                <p>Nothing in order</p>
                ) : (
                    orderList.map((item, index) => (
                        <div key={index}>
                            <li>Name: {item.productName} || Quantity: {item.productQuantity} || Status: {item.status}</li>
                            
                            {item.status === "Shipped" ? (
                                <div>
                                    <button onClick={() => {
                                        Axios.put(`http://localhost:3000/order`, {
                                            _id:item._id,
                                            status: "Accepted"
                                        }).then(() => {
                                            console.log('Successfully update order!');
                                            Axios.get(`http://localhost:3000/order/customer/${id.toString()}`)
                                            .then((response) => setOrderList(response.data));
                                        }).catch((error) => {
                                            console.log(error.message)
                                        })
                                    }}>Accepted</button>
                                    <button onClick={() => {
                                        Axios.put(`http://localhost:3000/order`, {
                                            _id:item._id,
                                            status: "Rejected"
                                        }).then(() => {
                                            console.log('Successfully update order!');
                                            Axios.get(`http://localhost:3000/order/customer/${id.toString()}`)
                                            .then((response) => setOrderList(response.data));
                                        }).catch((error) => {
                                            console.log(error.message)
                                        })
                                    }}>Rejected</button>
                                </div>
                            ):(
                                <></>
                            )}
                            
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// onClick={AddToCart(item._id, item.name, id.toString())}





