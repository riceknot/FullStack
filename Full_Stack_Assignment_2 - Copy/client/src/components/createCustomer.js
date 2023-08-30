import React, { Component } from 'react'
import Axios from 'axios'

export default class CreateCustomer extends Component{
    constructor() {
        super();

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            number: '',
            password: '',
            address: ''
        }
    }
    //function run on email change
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    //function run on number change
    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        });
    }
    //function run on pwd change
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    //function run on address change
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    //function run on submit
    onSubmit(e) {
        e.preventDefault();

        const customer = {
            email: this.state.email,
            number: this.state.number,
            password: this.state.password,
            address: this.state.address,
        }

        console.log(customer);

        Axios.post('http://localhost:5000/customer/add', customer)
            .then(res => console.log(res.data));

    }

    render(){
        return (
            <div>
                <p>You are on Create Customer Component</p>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Email: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Phone number: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.number}
                            onChange={this.onChangeNumber}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Password: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Address: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                            />
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Create Account' className='btn btn-primary'/>
                    </div>
                </form>
            </div>  
        );
    }
    
}
