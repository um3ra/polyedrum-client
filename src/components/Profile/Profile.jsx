import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import styles from './Profile.module.css';
import {useGetUserProfileQuery} from "../../store/user/userApi";
import Loader from "../common/Loader/Loader";
import {useGetUserOrdersQuery} from "../../store/order/orderAPI";


const Profile = () => {

    const {data: profileData} = useGetUserProfileQuery();
    const {data: ordersData} = useGetUserOrdersQuery();

    if (!profileData){
        return <Loader/>
    }
    return (
        <div className={'fix-wrapper'}>
            <div className={styles.userProfileBlock}>
                <ul className={styles.userProfileNavBar}>
                    <li><Link to={""}>My Account</Link></li>
                    <li><Link to={"personal-details"}>Personal Details</Link></li>
                    <li><Link to={"orders-history"}>Orders History</Link></li>
                    {profileData.data.role === 'ADMIN' &&
                        <li><Link to={"/admin-panel"}>Admin panel</Link></li>
                    }
                </ul>
                <Outlet context={profileData?.data}/>
                <div>
                    <div>current orders</div>
                    <ul>
                        {ordersData?.data.map((order, index) => {
                            if (index < 5) {
                                return (
                                    <li key={order.id}>
                                        <ul className={styles.currentOrdersItem}>
                                            <li><span>id: </span>{order.id}</li>
                                            <li><span>sum: </span>{order.sum} $</li>
                                        </ul>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;