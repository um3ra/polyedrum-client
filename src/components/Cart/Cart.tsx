import styles from "./Cart.module.css";
import { useEffect, useState } from "react";
import CART from "../../images/icon/cart.svg";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import CartContent from "./CartContent/CartContent";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useGetCartQuery } from "../../store/cart/cartAPI";
import clsx from "clsx";

const Cart = () => {
	const [showCart, setShowCart] = useState(false);
	const isLoggedIn = useTypedSelector((state) => state.auth.isLoggedIn);
	const [showAnimation, setShowAnimation] = useState(false);
	const navigate = useNavigate();
	const { data: cartData, isFetching } = useGetCartQuery(null);

	useEffect(() => {
		if (!isFetching) {
			setTimeout(() => {
				setShowAnimation(false);
			}, 300);
			setShowAnimation(true);
		}
	}, [isFetching]);

	const handleClick = () => {
		if (isLoggedIn) {
			setShowCart(!showCart);
		} else {
			navigate("login");
		}
	};
	return (
		<div className={styles.cartContainer}>
			<div className={styles.cartBlockIcon} onClick={handleClick}>
				<img src={CART} alt="cart" />

				{cartData?.data.amountProducts !== 0 && (
					<span
						className={clsx(
							styles.amountProducts,
							showAnimation && styles.animate
						)}
					>
						{cartData?.data.amountProducts}
					</span>
				)}
			</div>
			<CSSTransition
				in={showCart}
				timeout={300}
				classNames={{
					enterActive: styles.cartEnterActive,
					enterDone: styles.cartEnterDone,
					exitActive: styles.cartExitActive,
					exitDone: styles.cartExit
				}}
				unmountOnExit
			>
				<>
					<div className={styles.cartInner}>
						<CartContent />
					</div>
					<div
						onClick={() => setShowCart(false)}
						className={styles.cartOverlay}
					/>
				</>
			</CSSTransition>
		</div>
	);
};

export default Cart;
