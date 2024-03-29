import styles from "../Cart.module.css";
import CartContentItem from "./CartContentItem";
import { Button } from "../../ui";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../../../store/cart/cartAPI";
import { SecondLoader } from "../../ui/SecondLoader/SecondLoader";

const CartContent = () => {
    const navigate = useNavigate();
    const { data: cartData } = useGetCartQuery(null);

    return (
        <div className={styles.cartContent}>
            <div>
                <div className={styles.cartTitle}>
                    <h2>Cart item(s)</h2>
                </div>
                {!cartData?.data ? (
                    <SecondLoader />
                ) : (
                    <div className={styles.cartList}>
                        {!cartData?.data?.bucketDetails.length ? (
                            <div className={styles.cartListEmpty}>Empty</div>
                        ) : (
                            cartData?.data?.bucketDetails.map((c) => {
                                return (
                                    <CartContentItem
                                        key={c.productId}
                                        productTitle={c.title}
                                        quantity={c.amount}
                                        imgURL={c.imageURL}
                                        productId={c.productId}
                                        sum={c.sum}
                                    />
                                );
                            })
                        )}
                        {}
                    </div>
                )}
                <div className={styles.cartInfo}>
                    Total: {cartData?.data?.amountProducts}
                </div>
                <div className={styles.cartInfo}>
                    Sum: {cartData?.data?.sum} $
                </div>
                <div className={styles.cartBlock}>
                    <Button
                        disabled={!cartData?.data.amountProducts}
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartContent;
