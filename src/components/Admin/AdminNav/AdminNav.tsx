import { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavItem from "./AdminNavItem";
import styles from "./AdminNav.module.css";

const AdminNav = () => {
    const location = useLocation();
    const currentLocation = location.pathname.split("/")[2];
    const [currentNavSelection, setCurrentNavSelection] =
        useState(currentLocation);
    const names = ["users", "products", "categories", "genres"];

    return (
        <ul className={styles.adminNav}>
            {names.map((el) => (
                <AdminNavItem
                    key={el}
                    path={currentNavSelection}
                    name={el}
                    setPath={setCurrentNavSelection}
                />
            ))}
        </ul>
    );
};

export default AdminNav;
