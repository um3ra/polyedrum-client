import React, {useEffect} from 'react';
import {getAllProducts} from "../../../store/products/productsSlice";
import styles from "../AdminPage.module.css";
import {Button} from "../../common";
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import {useNavigate} from "react-router-dom";
import {useDeleteProductMutation} from "../../../store/products/productsAPI";
import Pagination from "../../Pagination/Pagination";
import {useAppDispatch} from "../../../store/store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const AdminPageProducts: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useTypedSelector(state => state.products.productList);
    const pagination = useTypedSelector(state => state.products.filter.pagination);
    const [deleteProduct, {data: deleteProductData}] = useDeleteProductMutation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProducts({}))
    }, [dispatch, deleteProductData])

    if (!products) {
        return <div>Loading</div>
    }

    return (
        <div className={styles.adminContentWrapper}>
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
                            <button className={styles.adminContentBtnsDelete} onClick={() => product.id&&deleteProduct(product.id)}>
                                <AiOutlineDelete/></button>
                        </div>
                    })}
                </div>
            </div>
            <Pagination pagination={pagination}/>
        </div>
    );
};

export default AdminPageProducts;