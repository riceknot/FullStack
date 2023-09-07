import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewCate() {
    const [mainCateList, setMainCateList] = useState([]);
    const [subCateList, setSubCateList] = useState([]);
    const [ssubCateList, setSsubCateList] = useState([]);

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


    return (
        <div className="container">
            <h1>Cate List:</h1>
            <button type="button"><Link to='add'>Add new category</Link></button>
            <div className="list">

                <h2>Main cate:</h2>
                {mainCateList.map((mainCate) => (
                    <div className="user-card" key={mainCate._id}>
                        <p>CateID: {mainCate._id}</p>
                        <p>Category Name: {mainCate.categoryName}</p>
                        <h3>Sub-category:</h3>

                        {subCateList
                            .filter(filCate => filCate.parentID === mainCate._id && filCate.categoryType === 'sub')
                            .map((subCate) => (
                                <div className="user-card" key={subCate._id}>
                                    <p>CateID: {subCate._id}</p>
                                    <p>Category Name: {subCate.categoryName}</p>
                                    <h5>Sub-sub-categories:</h5>
                                    <select>
                                        {ssubCateList
                                            .filter(filCate => filCate.parentID === subCate._id && filCate.categoryType === 'ssub')
                                            .map((ssubCate) => (
                                                <option className="user-card" key={ssubCate._id}>
                                                    CateID: {ssubCate._id} || Category Name: {ssubCate.categoryName}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}