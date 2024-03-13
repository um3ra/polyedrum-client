import { useNavigate } from "react-router-dom";
import CART from "../../images/icon/cart.svg";
import { Button } from "../ui";
import { useAddProductToCartMutation } from "../../store/cart/cartAPI";
import { IProductsItem } from "../../@types/productType";
import styles from "./Product.module.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Product = ({ id, title, price, img, author }: IProductsItem) => {
    const [addProduct, { isLoading }] = useAddProductToCartMutation();
    const navigate = useNavigate();
    const isLoggedIn = useTypedSelector((state) => state.auth.isLoggedIn);

    const handleClick = () => {
        if (!isLoggedIn) {
            return navigate("/login");
        }
        id && addProduct(id);
    };

    return (
        <div>
            <div className={styles.collectionCard}>
                <div
                    onClick={() => navigate(`/products/${title}`)}
                    className={styles.collectionCardBlock}
                >
                    <div className={styles.collectionCardImage}>
                        <img src={img} alt={title} />
                    </div>
                    <div className={styles.collectionCardTitle}>
                        <span>{title}</span>
                    </div>
                    <div className={styles.collectionCardAuthor}>{author}</div>
                    <div className={styles.collectionCardPrice}>{price} $</div>
                </div>
                <Button
                    disabled={isLoading}
                    onClick={handleClick}
                    addClass={styles.collectionCardBtn}
                >
                    <img src={CART} alt={"cart"} />
                    <span>Add to Cart</span>
                </Button>
            </div>
        </div>
    );
};

export default Product;
