import React, { Component } from 'react'
import Axios from 'axios'

export default class createProduct extends Component{
    constructor() {
        super();

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category: '',
            name: '',
            price: ''
        }
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const product = {
            category: this.state.category,
            name: this.state.name,
            price: this.state.price,
        }

        console.log(product);

        Axios.post('http://localhost:5000/product/add', product)
            .then(res => console.log(res.data));
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Category: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.category}
                            onChange={this.onChangeCategory}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Product Name: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Product Price: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            />
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create Product' className='btn btn-primary'/>
                    </div>
                </form>
            </div>  
        );
    }
    
}
