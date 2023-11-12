import React from 'react';
import {useNavigate} from "react-router-dom";
import CART from '../../images/icon/cart.svg';
import {Button} from "../common";
import {useAddProductToCartMutation} from "../../store/cart/cartAPI";
import styles from './Product.module.css';
import {IProductsItem} from "../../@types/productType";

const Product: React.FC<IProductsItem> = ({id, title, price, img, author}) => {
    const [addProduct] = useAddProductToCartMutation();
    const navigate = useNavigate();

    return (
        <div>
            <div className={styles.collectionCard}>
                <div onClick={() => navigate(`/products/${title}`)} className={styles.collectionCardBlock}>
                    <div className={styles.collectionCardImage}>
                        <img src={img}
                             alt={title}/>
                    </div>
                    <div className={styles.collectionCardTitle}>
                        <span>{title}</span>
                    </div>
                    <div className={styles.collectionCardAuthor}>
                        {author}
                    </div>
                    <div className={styles.collectionCardPrice}>
                        {price} $
                    </div>
                </div>
                <Button onClick={() => addProduct(id)} addClass={styles.collectionCardBtn}>
                    <img src={CART} alt={'cart'}/><span>Add to Cart</span>
                </Button>
            </div>
        </div>
    );
};

export default Product;