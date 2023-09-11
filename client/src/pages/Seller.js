import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function NewProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [product, setProduct] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [order, setOrder] = useState([]);
    const [category, setCategory] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const params = useParams();
    const id = params.userID;

    //Add product
    function handleSubmit(e) {
        e.preventDefault()
        console.log(productCategory)
        Axios.post(`http://localhost:3000/product/seller/${id.toString()}/add`, {
            category: productCategory.toString(),
            name: productName,
            price: productPrice,
        })
            .then(() => {
                console.log('Successfully add a new product!');
            })
            .then(() => {
                Axios.get(`http://localhost:3000/product/seller/${id.toString()}`)
                    .then((response) => {
                        setProduct(response.data.product);
                    }
            )})
            .catch((error) => {
                console.log(error.message)
            })
    }

    //Get product and category data.
    useEffect(() => {
        Axios.get(`http://localhost:3000/product/seller/${id.toString()}`)
            .then((response) => {
                setProduct(response.data.product);
                setCategory(response.data.category);
            }
            );
    }, []);

    //Get all orders by seller's ID
    useEffect(() => {
        Axios.get(`http://localhost:3000/order/seller/${id.toString()}`)
            .then((response) => {
                setOrder(response.data)
            }
            );
    }, []);

    //Search bar
    useEffect(() => {
        if (searchInput === '') {
            setProductFilter(product);
        } else {
            const filteredProducts = product.filter((product) =>
                product.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setProductFilter(filteredProducts);
        }
    }, [searchInput, product]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <label>Category:</label><br></br>
                    <select
                        className="productCatergory"
                        onChange={(e) => {
                            setProductCategory(e.target.value);
                        }}
                    >
                        <option value="" selected disabled hidden>Choose here</option>
                        {category.map((cate) => (
                            <option key={cate._id} value={cate.categoryName}>{cate.categoryName}</option>
                        ))}
                    </select>

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
                            <button onClick={async () => {
                                await Axios.delete(`http://localhost:3000/product/${item._id}`)
                                await Axios.get(`http://localhost:3000/product/seller/${id.toString()}`)
                                        .then((response) => setProduct(response.data.product))
                            }}>Delete Product</button>
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
                            ) : (
                                <></>
                            )}

                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

