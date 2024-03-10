import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useGetCategoriesQuery } from "../../../store/category/categoryAPI";
import { useGetAllProductAuthorsQuery } from "../../../store/products/productsAPI";
import {
    getAllProducts,
    toggleCurrentSelection
} from "../../../store/products/productsSlice";
import { useAppDispatch } from "../../../store/store";
import Facet from "../../Facet/Facet";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";
import { SecondLoader } from "../../ui/SecondLoader/SecondLoader";
import styles from "./BooksPage.module.css";

const BooksPage = () => {
    const products = useTypedSelector((state) => state.products.productList);
    const loading = useTypedSelector((state) => state.products.loading);
    const pagination = useTypedSelector(
        (state) => state.products.filter.pagination
    );
    const { data: categoryData } = useGetCategoriesQuery(null);
    const { data: authorData } = useGetAllProductAuthorsQuery(null);
    const dispatch = useAppDispatch();
    const locate = useLocation();

    useEffect(() => {
        if (
            !locate.pathname.endsWith("/collections") &&
            locate.pathname.startsWith("/collections")
        ) {
            const sortName = locate.pathname.split("/");
            dispatch(
                getAllProducts({ sortType: sortName[2], name: sortName[3] })
            );
        } else {
            dispatch(getAllProducts({}));
        }
        return () => {
            const sortData = { selectionName: null, selectionType: null };
            dispatch(toggleCurrentSelection(sortData));
        };
    }, [dispatch, locate]);

    if (!authorData || !categoryData) {
        return <SecondLoader />;
    }

    return (
        <div className={`${styles.flexContainer} fix-wrapper`}>
            <Facet
                authorData={authorData.data}
                categoryData={categoryData.data}
            />
            {loading ? (
                <SecondLoader />
            ) : products?.length ? (
                <div>
                    <div className={styles.gridContainer}>
                        {products?.map((product, index) => (
                            <Product
                                key={index}
                                title={product.title}
                                author={product.author}
                                img={product.img}
                                price={product.price}
                                id={product.id}
                            />
                        ))}
                    </div>
                    <Pagination pagination={pagination} />
                </div>
            ) : (
                <div className={styles.notFoundBlock}>Books not found</div>
            )}
        </div>
    );
};

export default BooksPage;
