import React from 'react';
import styles from './Profile.module.css';
import {useGetUserOrdersQuery} from "../../store/order/orderAPI";

const OrdersHistory: React.FC = () => {
    const {data: orderData} = useGetUserOrdersQuery(null);

    if (!orderData){
        return <div>Loading</div>
    }

    return (
        <div className={styles.userProfileContent}>
            <div className={styles.userProfileContentTitle}>Orders History</div>

            <ul className={styles.userProfileContentOrders}>
                {orderData.data.map(order => {
                    return (
                        <li key={order.id}>
                            <ul className={styles.ordersItem}>
                                <li>
                                    <span style={{fontWeight: "700"}}>Id: </span>
                                    {order.id}
                                </li>
                                <li>
                                    <span style={{fontWeight: "700"}}>Status: </span>
                                    {order.status}
                                </li>
                                <li>
                                    <span style={{fontWeight: "700"}}>Date: </span>
                                    {order.dateOfCreation}
                                </li>
                                <li>
                                    <span style={{fontWeight: "700"}}>Sum: </span>
                                    {order.sum} $
                                </li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default OrdersHistory;