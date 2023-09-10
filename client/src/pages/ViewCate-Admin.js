import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ViewCate() {
    const [mainCateList, setMainCateList] = useState([]);
    const [subCateList, setSubCateList] = useState([]);
    const [ssubCateList, setSsubCateList] = useState([]);
    const [reset, setReset] = useState(true);
    {
        //reset and setReset is used to reset the page only.
    }

    {
        //using useEffect to fetch all CAtegory data at the start of every render.
    }
    useEffect(() => {
        Axios.get('http://localhost:3000/admin/:userID/category')
            .then((res) => {
                const data = res.data;
                const Main = data.filter((cate) => cate.categoryType === 'main');
                const Sub = data.filter((cate) => cate.categoryType === 'sub');
                const SSub = data.filter((cate) => cate.categoryType === 'ssub');
                setMainCateList(Main);
                setSubCateList(Sub);
                setSsubCateList(SSub);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    {
        //function to delete a MAIN category
    }
    function deleteCategoryM(inputID) {
        Axios.post('http://localhost:3000/admin/:userID/category/delete-main', {
            id: inputID
        })
            .then(() => {
                console.log('Successfully deleted main category!');
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    {
        //function to delete a SUB category
    }
    function deleteCategoryS(inputID) {
        Axios.post('http://localhost:3000/admin/:userID/category/delete-sub', {
            id: inputID
        })
            .then(() => {
                console.log('Successfully deleted sub category!');
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    {
        //function to delete a  Sub-Sub category
    }
    function deleteCategorySS(inputName) {
        Axios.post('http://localhost:3000/admin/:userID/category/delete-ssub', {
            categoryName: inputName
        })
            .then(() => {
                console.log('Successfully deleted sub-sub category!');
            })
            .catch((error) => {
                console.log(error.message);
            })
    }


    return (
        <div className="container">
            <a href={'/admin/' + useParams().userID} className='btn btn-primary'>View All Seller</a>
            <p></p>
            <Link to="add" className='btn btn-primary'>Add Category</Link>
            <h1>Cate List:</h1>
            <div className="list">

                <h2>Main cate:</h2>
                {mainCateList.map((mainCate) => (
                    <div className="user-card" key={mainCate._id}>
                        <p>CateID: {mainCate._id}</p>
                        <p>Category Name: {mainCate.categoryName}</p>
                        <button className='btn btn-primary btn-block mb-4' onClick={() => deleteCategoryM(mainCate._id)}>Delete main category</button>

                        {subCateList
                            .filter(filCate => filCate.parentID === mainCate._id && filCate.categoryType === 'sub')
                            .map((subCate) => (
                                <div className="user-card" key={subCate._id}>
                                    <h3>Sub-category:</h3>
                                    <p>CateID: {subCate._id}</p>
                                    <p>Category Name: {subCate.categoryName}</p>
                                    <button className='btn btn-primary btn-block mb-4' onClick={() => deleteCategoryS(subCate._id)} >Delete sub category</button>
                                    <h5>Sub-sub-categories:</h5>

                                    {ssubCateList
                                        .filter(filCate => filCate.parentID === subCate._id && filCate.categoryType === 'ssub')
                                        .map((ssubCate) => (
                                            <div className="user-card" key={ssubCate._id}>
                                                <p>CateID: {ssubCate._id}</p>
                                                <p>Category Name: {ssubCate.categoryName}</p>
                                                <button className='btn btn-primary btn-block mb-4' onClick={() => deleteCategorySS(ssubCate.categoryName)}>Delete sub-sub category</button>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
