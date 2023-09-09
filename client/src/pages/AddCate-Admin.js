import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddCate() {
    const [cateName, setCateName] = useState('');
    const [cateType, setCateType] = useState('main');
    const [cateParent, setCateParent] = useState('');

    function handleSubmit(e) {
        e.preventDefault()

        Axios.post(`http://localhost:3000/admin/:userID/category/add`, {
            categoryName: cateName,
            categoryType: cateType,
            parentID: cateParent
        })
            .then(() => {
                console.log('Successfully add a new category!');
                setCateName('');
                setCateType('main');
                setCateParent('');
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <a href={'/admin/' + useParams().userID} className='btn btn-primary'>View All Seller</a>
            <p></p>
            <a href={'/admin/' + useParams().userID + '/category'} className='btn btn-primary'>Add Category</a>
            <div className="form-outline mb-4">
                <label>Category Name:</label><br></br>
                <input type="text"
                    className="category-name"
                    onChange={(e) => {
                        setCateName(e.target.value);

                    }}
                />
            </div>

            <div className="form-outline mb-4">
                <label>Category Type:</label><br></br>
                <select name="category-type"
                    className="category-type"
                    onChange={(e) => {
                        setCateType(e.target.value)
                    }}>
                    <option value='main'>Main Category</option>
                    <option value='sub'>Sub Category</option>
                    <option value='ssub'>Sub-Sub Category</option>
                </select>
            </div>

            {
                //If Sub or Sub-Sub is chosen, the parentID input will show up.
            }
            {(cateType === 'sub' || cateType === 'ssub') && (
                <div className="form-outline mb-4">
                    <label>ParentID</label><br></br>
                    <input type="text"
                        className="category-parentID"
                        onChange={(e) => { setCateParent(e.target.value) }}
                    />
                </div>
            )}
            <button type='submit' className='btn btn-primary btn-block mb-4'>Create Category</button>
        </form>
    )
}