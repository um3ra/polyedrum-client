import React from 'react';
import styles from './Cart.module.css';
import {useState} from "react";
import CART from '../../images/icon/cart.svg';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import CartContent from "./CartContent/CartContent";


const Cart = () => {
    const [showCart, setShowCart] = useState(false);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const handleClick = () => {
        if (isLoggedIn){
            setShowCart(!showCart);
        }else{
            navigate('login');
        }
    };
    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartBlockIcon} onClick={handleClick}>
                <img src={CART} alt="cart"/>
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
                unmountOnExit>
                <>
                    <div className={styles.cartInner}>
                        <CartContent/>
                    </div>
                    <div onClick={() => setShowCart(false)} className={styles.cartOverlay}/>
                </>
            </CSSTransition>
        </div>
    );
};

export default Cart;