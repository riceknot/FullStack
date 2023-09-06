import React, { useState } from 'react';
import Axios from 'axios';

export default function Register() {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [approval, setApproval] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        Axios.post('http://localhost:3000/register', {
            role: role,
            email: email,
            phone: phone,
            password: password,
            address: address,
            businessName: businessName,
            pending: approval,
        })
            .then(() => {
                console.log('Account successfully registered!');
                window.location = '/login';
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Role:</label><br></br>
                <select className="role" onChange={(e) => { 
                    setRole(e.target.value)
                    {e.target.value === 'seller' ? (
                        setApproval('false')
                    ):(
                        setApproval('true')
                    )}
                    {e.target.value === 'customer' ? (
                        setBusinessName('')
                    ):(
                        setAddress('')
                    )}
                }}>
                    <option value="">Choose a role</option>
                    <option value="seller">Seller</option>
                    <option value="customer">Customer</option>
                </select>
            <div className="form-outline mb-4">
                <label>Email address:</label><br></br>
                <input type="email"
                    className="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </div>
            <div className="form-outline mb-4">
                <label>Phone Number:</label><br></br>
                <input
                    className="phone"
                    type="text"
                    onChange={(e) => { setPhone(e.target.value) }}
                />
            </div>
            <div className="form-outline mb-4">
                <label>Password:</label><br></br>
                <input
                    className="password"
                    type="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </div>
            {
                // If the user choose 'customer', shows Address input and hide Business Name.
            }
            {role === 'customer' && (
                <div className="form-outline mb-4">
                    <label>Address:</label><br></br>
                    <input
                        className="address"
                        type="text"
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                </div>
            )}

            {
                // If the user choose 'seller', shows Business Name input and hide Address.
            }
            {role === 'seller' && (
                <div className="form-outline mb-4">
                    <label>Business Name:</label><br></br>
                    <input
                        className="businessName"
                        type="text"
                        onChange={(e) => { setBusinessName(e.target.value) }}
                    />
                </div>
            )}
            <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
        </form>
        // <div className="container">
        //     <div className="Register-form">
        //         <form onSubmit={handleSubmit}>
        //             <label>Role</label>
        //             <select className="role" onChange={(e) => { setRole(e.target.value) }}>
        //                 <option value="">Choose a role</option>
        //                 <option value="seller">Seller</option>
        //                 <option value="customer">Customer</option>
        //             </select>

        //             <label>Email</label>
        //             <input
        //                 className="email"
        //                 type="text"
        //                 onChange={(e) => { setEmail(e.target.value) }}
        //             />

        //             <label>Phone</label>
        //             <input
        //                 className="phone"
        //                 type="number"
        //                 onChange={(e) => { setPhone(e.target.value) }}
        //             />

        //             <label>Password</label>
        //             <input
        //                 className="password"
        //                 type="text"
        //                 onChange={(e) => { setPassword(e.target.value) }}
        //             />

        //             {
        //                 // If the user choose 'customer', shows Address input and hide Business Name.
        //             }
        //             {role === 'customer' && (
        //                 <div>
        //                     <label>Address</label>
        //                     <input
        //                         className="address"
        //                         type="text"
        //                         onChange={(e) => { setAddress(e.target.value) }}
        //                     />
        //                 </div>
        //             )}

        //             {
        //                 // If the user choose 'customer', shows Business Name input and hide Address.
        //             }
        //             {role === 'seller' && (
        //                 <div>
        //                     <label>Business Name</label>
        //                     <input
        //                         className="businessName"
        //                         type="text"
        //                         onChange={(e) => { setBusinessName(e.target.value) }}
        //                     />
        //                 </div>
        //             )}

        //             <button type="submit">Submit</button>
        //         </form>
        //     </div>
            
        // </div>
    );
}