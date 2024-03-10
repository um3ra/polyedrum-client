import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useDeleteProductFromCartMutation } from "../../../store/cart/cartAPI";
import { useNavigate } from "react-router-dom";
import styles from "../Cart.module.css";

interface CartContentItemProps {
    productId: number;
    sum: number;
    quantity: number;
    productTitle: string;
    imgURL: string;
}

const CartContentItem: React.FC<CartContentItemProps> = ({
    productTitle,
    quantity,
    imgURL,
    productId,
    sum
}) => {
    const [deleteProduct, { isSuccess }] = useDeleteProductFromCartMutation();
    const [removeStatus, setRemoveStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (quantity && isSuccess) {
            setRemoveStatus(false);
        }
    }, [quantity]);

    const handleRemoveButton = (id: number) => {
        deleteProduct(id);
        setRemoveStatus(true);
    };

    return (
        <div
            className={`${styles.cartProduct} ${removeStatus && styles.remove}`}
        >
            <div
                onClick={() => navigate(`products/${productTitle}`)}
                className={styles.cartProductImage}
            >
                {productTitle}
                <img src={imgURL} alt="" />
            </div>
            <div>
                <p>{quantity}</p>
            </div>
            <div>
                <p>{sum} $</p>
            </div>
            {!removeStatus ? (
                <div
                    onClick={() => handleRemoveButton(productId)}
                    className={styles.cartProductBtn}
                >
                    <TiDeleteOutline size={"40"} color={"red"} />
                </div>
            ) : (
                <div>
                    <TiDeleteOutline size={"40"} color={"grey"} />
                </div>
            )}
        </div>
    );
};

export default CartContentItem;
