import React, {useEffect} from 'react';
import Product from "../Product/Product";
import Facet from "../Facet/Facet";
import Pagination from "../Pagination/Pagination";
import {
    getAllProducts,
    toggleCurrentSelection,
} from "../../store/products/productsSlice";
import {useLocation} from "react-router-dom";
import {Loader} from "../common";
import {useGetCategoriesQuery} from "../../store/category/categoryAPI";
import {useGetAllProductAuthorsQuery} from "../../store/products/productsAPI";
import styles from './BooksPage.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAppDispatch} from "../../store/store";


const BooksPage: React.FC = () => {
    const products = useTypedSelector( state => state.products.productList);
    const loading = useTypedSelector(state => state.products.loading);
    const pagination = useTypedSelector(state => state.products.filter.pagination);
    const {data: categoryData} = useGetCategoriesQuery(null);
    const {data: authorData} = useGetAllProductAuthorsQuery(null);
    const dispatch = useAppDispatch();
    const locate = useLocation();


    useEffect(() => {
        if (!locate.pathname.endsWith("/collections") && locate.pathname.startsWith("/collections")) {
            const sortName = locate.pathname.split('/');
            dispatch(getAllProducts({sortType: sortName[2], name: sortName[3]}));
        }else {
            dispatch(getAllProducts({}));
        }
        return () => {
            const sortData = {selectionName: null, selectionType: null}
            dispatch(toggleCurrentSelection(sortData));
        }
    }, [dispatch, locate])

    if (!authorData || !categoryData){
        return <Loader/>
    }

    return (
        <div className={`${styles.flexContainer} fix-wrapper`}>
            <Facet authorData={authorData.data} categoryData={categoryData.data}/>
            {loading ?
                <Loader/>
                :
                <div>
                    <div className={styles.gridContainer}>
                        {
                            products?.map((product, index) => {
                                return <Product key={index}
                                                title={product.title}
                                                author={product.author}
                                                img={product.img}
                                                price={product.price}
                                                id={product.id}
                                />
                            })
                        }
                    </div>
                    <Pagination pagination={pagination}/>
                </div>
            }
        </div>
    );
};

export default BooksPage;