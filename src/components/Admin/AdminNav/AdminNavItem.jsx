import React from 'react';
import {Link} from "react-router-dom";
import styles from "../AdminPage.module.css";

const AdminNavItem = ({name, path, setPath}) => (
    <li onClick={() => setPath(name)}>
        <Link className={path === name ? styles.adminNavItemActive : ''} to={name}>
            {name}
        </Link>
    </li>
);

export default AdminNavItem;