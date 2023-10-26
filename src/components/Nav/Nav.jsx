import React from 'react';
import styles from './Nav.module.css';
import {useGetCategoriesQuery} from "../../store/category/categoryAPI";
import SubNavigation from "./SubNavigation/SubNavigation";


const Nav = () => {
    const {data: categoryData} = useGetCategoriesQuery();
    return (
        <div className={styles.mainNav}>
            <nav>
                <ul className={`${styles.primaryNavigation} fix-wrapper`}>
                    {categoryData?.data.map(category => {
                        return (
                            <li key={category.id}>
                                <SubNavigation title={category.name} genres={category.genres}/>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Nav;