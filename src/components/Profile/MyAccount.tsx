import React from 'react';
import styles from "./Profile.module.css";
import { useOutletContext } from "react-router-dom";
import {useGetUserOrdersQuery} from "../../store/order/orderAPI";
import {IProfile} from "../../@types/userType";

const MyAccount: React.FC = () => {
    const profileData = useOutletContext<IProfile>();
    const {data: ordersData} = useGetUserOrdersQuery(null)

    return (
        <div className={styles.userProfileContent}>
            <div className={styles.userProfileContentTitle}>
                Welcome back, <span>{profileData?.firstName}</span>
            </div>
            <div className={styles.userProfileContentRole}>
                {profileData?.role}
            </div>
            <div>
                total orders count: <span>{ordersData?.data.length}</span>
            </div>
        </div>
    );
};

export default MyAccount;