import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../../store/products/productsSlice";
import styles from "../AdminPage.module.css";
import {Button} from "../../common";
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import {useNavigate} from "react-router-dom";
import button from "../../common/Button/Button";
import {useDeleteProductMutation} from "../../../store/products/productsAPI";
import Pagination from "../../Pagination/Pagination";

const AdminPageProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.productList);
    const [deleteProduct, {data: deleteProductData}] = useDeleteProductMutation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProducts(''))
    }, [dispatch, deleteProductData])

    if (!products) {
        return <div>Loading</div>
    }

    return (
        <div className={styles.adminContent}>
            <div onClick={() => navigate('create-product')}>
                <Button>
                    Create new
                </Button>
            </div>
            <div className={styles.adminInnerContent}>

                <ul className={styles.adminContentList}>
                    <li>id</li>
                    {products.map(product => {
                        return <li key={product.id}>{product.id}</li>
                    })}
                </ul>

                <ul className={styles.adminContentList}>
                    <li>title</li>
                    {products.map(product => {
                        return <li key={product.id}>{product.title}</li>
                    })}
                </ul>

                <ul className={styles.adminContentList}>
                    <li>price</li>
                    {products.map(product => {
                        return <li key={product.id}>{product.price}$</li>
                    })}
                </ul>

                <ul className={styles.adminContentList}>
                    <li>author</li>
                    {products.map(product => {
                        return <li key={product.id}>{product.author}</li>
                    })}
                </ul>
            </div>

            <div className={`${styles.adminContentList} ${styles.adminContentBtns}`}>
                <div>Options</div>
                {products.map(product => {
                    return <div key={product.id}>
                        <button className={styles.adminContentBtnsEdit}
                                onClick={() => navigate(`update-product/${product.title}`)}><AiOutlineEdit/></button>
                        <button className={styles.adminContentBtnsDelete} onClick={() => deleteProduct(product.id)}>
                            <AiOutlineDelete/></button>
                    </div>
                })}
            </div>
        </div>
    );
};

export default AdminPageProducts;