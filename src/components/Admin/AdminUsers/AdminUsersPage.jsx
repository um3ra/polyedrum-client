import React from 'react';
import {useGetUsersQuery} from "../../../store/user/userAPI";
import styles from "../AdminPage.module.css";

const AdminUsersPage = () => {
    const {data: userData} = useGetUsersQuery();

    if (!userData){
        return <div>Loading</div>
    }

    return (
        <div className={styles.adminContent}>
            <ul className={styles.adminContentList}>
                <li>firstname</li>
                {userData.data.map(user => {
                    return <li key={user.firstName}>
                        {user.firstName}
                    </li>
                })}
            </ul>

            <ul className={styles.adminContentList}>
                <li>lastname</li>
                {userData.data.map(user => {
                    return <li key={user.firstName}>
                        {user.lastName}
                    </li>
                })}
            </ul>

            <ul className={styles.adminContentList}>
                <li>password</li>
                {userData.data.map(user => {
                    return <li key={user.firstName}>{user.password}</li>
                })}
            </ul>
        </div>
    );
};

export default AdminUsersPage;