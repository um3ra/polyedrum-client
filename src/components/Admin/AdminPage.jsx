import React from 'react';
import AdminNav from "./AdminNav/AdminNav";
import {Outlet} from "react-router-dom";
import styles from './AdminPage.module.css';

const AdminPage = () => (
    <div className={`fix-wrapper ${styles.adminBlock}`}>
        <AdminNav/>
        <Outlet/>
    </div>
);

export default AdminPage;