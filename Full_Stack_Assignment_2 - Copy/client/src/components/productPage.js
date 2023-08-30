import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

const Product = props => (
    <tr>
        <td>{props.product.category}</td>
        <td>{props.product.name}</td>
        <td>{props.product.price}</td>
        <td>
            <Link to={'/edit/' + props.product._id}>Edit</Link> | <button className='btn btn-primary' onClick={() => {props.deleteproduct(props.product._id)}}>Delete</button>
        </td>
    </tr>
)

export default class productPage extends Component{
    constructor(props) {
        super(props);

        this.deleteproduct = this.deleteproduct.bind(this);

        this.state = {product: []}; 
    }

    componentDidMount() {     
        Axios.get('http://localhost:5000/product/')
            .then(response => {
                this.setState({product: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteproduct(id) {
        Axios.delete('http://localhost:5000/product/' + id)
            .then(res => console.log(res.data));
        
        this.setState({
            product: this.state.product.filter(el => el._id !== id)
        })
        // window.location.reload(true);
    }

    productList() {
        return this.state.product.map(currentproduct => {
            return <Product product={currentproduct} deleteproduct={this.deleteproduct} key={currentproduct._id}/>
        })
    }

    render(){
        return (
            <div>
                <h3>Products</h3> 
                <Link to={'/product/create'} className='btn btn-primary'>Create Product</Link>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.productList()}
                    </tbody>
                </table>
            </div>
        );
    }
    
}
