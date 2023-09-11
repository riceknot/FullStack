import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewSellers() {
    const [sellerList, setSellerList] = useState([]);

    //using useEffect to fetch all sellers data at the start of every render.
    useEffect(() => {
        Axios.get('http://localhost:3000/admin/:userID')
            .then((res) => {
                setSellerList(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);


    //function to let the Admin approve a seller to login into their account then update the client-side list.
    function toggleApproval(userID, pending) {
        Axios.put('http://localhost:3000/admin/:userID', {
            userID: userID,
            pending: !pending
        })
            .then((res) => {
                console.log('Successfully change seller status!');
                setSellerList(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="container">
            <Link to="category" className='btn btn-primary'>View All Category</Link>
            <p></p>
            <Link to="category/add" className='btn btn-primary'>Add Category</Link>
            <h1>User List:</h1>
            <div className="list">
                {sellerList.map((user) => (
                    <div className="user-card" key={user._id}>
                        <p>UserID: {user._id}</p>
                        <p>Role: {user.role}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Approval: {String(user.pending)}</p>
                        {
                            //An Approve or Unapprove button will show up depends on user's approval.
                        }
                        {user.pending ? (
                            <button type='button' onClick={() => toggleApproval(user._id, user.pending)}>Unapprove</button>
                        ) : (
                            <button type='button' onClick={() => toggleApproval(user._id, user.pending)}>Approve</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
