import React, {useEffect, useState} from 'react';
import {useGetCartQuery} from "../../store/cart/cartAPI";
import {useGetUserProfileQuery} from "../../store/user/userApi";
import {useCheckoutMutation} from "../../store/order/orderAPI";
import {Button, Loader, Modal} from "../common";
import styles from './Checkout.module.css';
import {useNavigate} from "react-router-dom";

const Checkout = () => {
    const {data: cartData} = useGetCartQuery();
    const {data: userData} = useGetUserProfileQuery();
    const [checkout, {data: checkoutData, isSuccess}] = useCheckoutMutation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [checkoutStatus, setCheckoutStatus] = useState(false);

    useEffect(() => {
        if (isSuccess){
            setShowModal(true)
            setCheckoutStatus(false);
        }
    }, [isSuccess])

    if (!cartData || !userData){
        return <Loader/>
    }

    const modalClick = () => {
        setShowModal(false)
        navigate("/");
    }

    const handleCheckout = () => {
        setCheckoutStatus(true);
        checkout();
    }

    return (
        <div className={`fix-wrapper ${styles.checkout}`}>
            <div className={styles.checkoutUser}>
                <div>
                    <Modal onClick={() => alert("ok")} setActive={setShowModal} callback={modalClick} active={showModal}>
                        {checkoutData?.message && <span className={'successMessage'}>{checkoutData?.message}</span>}
                    </Modal>
                    <div>
                        <span>
                            Firstname: {userData.data.firstName}
                        </span>
                    </div>
                    <div>
                        <span>
                            Lastname: {userData.data.lastName}
                        </span>
                    </div>
                    <div>
                        <span>
                            email: {userData.data.email}
                        </span>
                    </div>
                </div>
                <div className={styles.checkoutButton}>
                    <Button disabled={!cartData.data.bucketDetails.length||checkoutStatus}
                            onClick={handleCheckout}>
                        Complete order
                    </Button>
                </div>
            </div>
            <div className={styles.orderDetails}>
                {cartData.data.bucketDetails.length ?
                    cartData.data.bucketDetails.map(d => {
                        return (
                            <ul className={styles.orderDetailsItem} key={d.title}>
                                <li>
                                    <ul>
                                        <li className={styles.OrderDetailsTitle}><h3>{d.title}</h3></li>
                                        <li><span>price: </span>{d.price}$</li>
                                        <li><span>Quantity: </span>{d.amount}</li>
                                    </ul>
                                </li>
                                <li>
                                    <div className={styles.orderDetailsImage}>
                                        <img src={d.imageURL} alt=""/>
                                    </div>
                                </li>
                            </ul>
                        )
                    })
                    : <h3>You have no items in your basket...</h3>
                }
            </div>
        </div>
    );
};

export default Checkout;