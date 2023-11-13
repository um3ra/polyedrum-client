import React, {useEffect, useState} from 'react';
import {useGetProductByNameQuery} from "../../store/products/productsAPI";
import {useAddProductToCartMutation} from "../../store/cart/cartAPI";
import {Link, useParams} from "react-router-dom";
import SingleBookDetails from "./SingleBookDetails";
import {Button, Modal} from '../common';
import Loader from "../common/Loader/Loader";
import styles from './SingleBookPage.module.css';

const SingleBookPage: React.FC = () => {
    const { productName } = useParams();
    const [currentBookDetail, setCurrentBookDetail] = useState("Description");
    const {data: productData} = useGetProductByNameQuery(productName ?? '');
    const [addProduct, {data: addProductData, isSuccess}] = useAddProductToCartMutation();
    const [showModal, setShowModal] = useState(false);
    const [activeButton, setActiveButton] = useState(false);


    useEffect(() => {
        if (isSuccess){
            setShowModal(true);
            setActiveButton(false);
        }
    }, [isSuccess])

    if (!productData){
        return <Loader/>
    }

    const handleClick = (id: number) => {
        addProduct(id);
        setActiveButton(true);
    }

    return (
        <div className={`fix-wrapper ${styles.singleBook}`}>
            <div className={styles.singleBookBlock}>
                <div className={styles.singleBookImg}>
                    <img src={productData.data.imageURL} alt="book"/>
                </div>

                <div className={styles.singleBookInfo}>
                    <div className={styles.singleBookTitle}>
                        <h2>{productData.data.title}</h2>
                    </div>
                    <div>
                        <Link to={`/collections/author/${productData.data.author}`}>
                            {productData.data.author}
                        </Link>
                    </div>
                    <div>
                        {productData.data.additional.numberOfPages} pages
                    </div>
                    <div className={styles.singleBookPrice}>
                        {productData.data.price}$
                    </div>
                    <div className={styles.singleBookBtn}>
                        <Button disabled={activeButton}
                                onClick={() =>productData.data.id&&handleClick(productData.data.id)}>{activeButton ? "Processing..." : "Add to Cart"}</Button>
                    </div>
                </div>
            </div>
            <ul className={styles.singleBookAdditional}>
                <li className={currentBookDetail === 'Description' ? styles.singleBookAdditionalActive : ""}
                    onClick={(e) => setCurrentBookDetail((e.target as HTMLElement).innerText)}>
                    Description
                </li>
                <li className={currentBookDetail === 'Details' ? styles.singleBookAdditionalActive : ""}
                    onClick={(e) => setCurrentBookDetail((e.target as HTMLElement).innerText)}>
                    Details
                </li>
            </ul>
            <div className={styles.singleBookAdditionalInfo}>
                {currentBookDetail === 'Details' &&
                    <SingleBookDetails productData={productData.data}/>
                }
                {currentBookDetail === 'Description' &&
                    <div className={`${styles.singleBookAdditionalDescription}`}>
                        {productData.data.additional.description}
                    </div>
                }
            </div>
            <Modal active={showModal} callback={() => setShowModal(false)}>
                <span className={'successMessage'}>
                    {addProductData?.message}
                </span>
            </Modal>
        </div>
    );
};

export default SingleBookPage;