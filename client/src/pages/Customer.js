import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function WelcomPage() {
    const [productList, setProductList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [productFilter, setProductFilter] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const params = useParams();
    const id = params.userID;

    //Function to add products to cart.
    function AddToCart(itemId, itemName, itemSellerID) {
        let bool = true;
        for (let i = 0; i < cartList.length; i++) {
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
        if (bool) {
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

    //When the page loads up, receive data of all products from backend.
    useEffect(() => {
        Axios.get('http://localhost:3000/product')
            .then((response) => {
                setProductList(response.data)
                setProductFilter(response.data)
            });
    }, []);

    //Get all products currently in the cart.
    useEffect(() => {
        Axios.get('http://localhost:3000/cart')
            .then((response) => setCartList(response.data));
    }, []);

    //Get all ordered products.
    useEffect(() => {
        Axios.get(`http://localhost:3000/order/customer/${id.toString()}`)
            .then((response) => setOrderList(response.data));
    }, []);


    //Search function:
    useEffect(() => {
        if (searchInput === '') {
            setProductFilter(productList);
        } else {
            const filteredProducts = productList.filter((product) =>
                product.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setProductFilter(filteredProducts);
        }
    }, [searchInput, productList]);

    return (
        <div>
            <label>Search:</label>
            <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
            <p></p>
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
                    for (let i = 0; i < cartList.length; i++) {
                        Axios.delete(`http://localhost:3000/cart/delete/${cartList[i]._id}`)
                    }
                    setCartList([]);
                }}>Clear Cart</button><br />
                <p></p>
                <button onClick={async () => {
                    if (cartList.length === 0) return;
                    for (let i = 0; i < cartList.length; i++) {
                        await Axios.post(`http://localhost:3000/order/add/${id.toString()}/${cartList[i].sellerID.toString()}`, {
                            productName: cartList[i].name,
                            productQuantity: cartList[i].quantity
                        })
                        await Axios.delete(`http://localhost:3000/cart/delete/${cartList[i]._id}`)
                    }

                    await Axios.get(`http://localhost:3000/order/customer/${id.toString()}`).then((response) =>
                        setOrderList(response.data)
                    )
                    setCartList([])
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
                                            _id: item._id,
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
                                            _id: item._id,
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
                            ) : (
                                <></>
                            )}

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}






