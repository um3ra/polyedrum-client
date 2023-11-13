import React from 'react';
import {useDeleteCategoryByNameMutation, useGetCategoriesQuery} from "../../../store/category/categoryAPI";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {Button} from "../../common";
import styles from '../AdminPage.module.css';

const AdminCategoriesPage: React.FC = () => {
    const {data: categoryData} = useGetCategoriesQuery(null);
    const [deleteCategory] = useDeleteCategoryByNameMutation();
    const navigate = useNavigate();
    if(!categoryData){
        return <div>Loading</div>
    }
    return (
        <div className={styles.adminContent}>
            <div onClick={() => navigate('create-category')}>
                <Button>
                    Create new
                </Button>
            </div>
            <div className={styles.adminInnerContent}>
                <ul className={styles.adminContentList}>
                    <li>
                        id
                    </li>
                    {categoryData?.data?.map(category => {
                        return <li key={category.id}>
                            {category.id}
                        </li>
                    })}
                </ul>
                <ul className={styles.adminContentList}>
                    <li>
                        name
                    </li>
                    {categoryData?.data?.map(category => {
                        return <li key={category.id}>
                            {category.name}
                        </li>
                    })}
                </ul>
                <ul className={styles.adminContentList}>
                    <li>
                        genres
                    </li>
                    {categoryData?.data?.map(category => {
                        return <li key={category.id}>
                            <div>
                                {category.genres.length? category.genres.map(genre => {
                                    return <span key={genre.id}>{genre.name}, </span>
                                }) : <span>empty</span>}
                            </div>
                        </li>
                    })}
                </ul>
            </div>

            <div  className={`${styles.adminContentList} ${styles.adminContentBtns}`}>
                <div>Options</div>
                {categoryData.data.map(category => {
                    return <div key={category.id}>
                        <button className={styles.adminContentBtnsEdit} onClick={() => navigate(`update-category/${category.name}`)}><AiOutlineEdit/></button>
                        <button className={styles.adminContentBtnsDelete} onClick={() => deleteCategory(category.name)}><AiOutlineDelete/></button>
                    </div>
                })}
            </div>
        </div>
    );
};

export default AdminCategoriesPage;