import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import AdminNavItem from './AdminNavItem';
import styles from '../AdminPage.module.css';

const AdminNav: React.FC = () => {
    const location = useLocation();
    const currentLocation = location.pathname.split("/")[2];
    const [currentNavSelection, setCurrentNavSelection] = useState(currentLocation);
    return (
        <ul className={styles.adminNav}>
            <AdminNavItem path={currentNavSelection}
                          name={'users'}
                          setPath={setCurrentNavSelection}/>

            <AdminNavItem path={currentNavSelection}
                          name={'products'}
                          setPath={setCurrentNavSelection}/>

            <AdminNavItem path={currentNavSelection}
                          name={'categories'}
                          setPath={setCurrentNavSelection}/>

            <AdminNavItem path={currentNavSelection}
                          name={'genres'}
                          setPath={setCurrentNavSelection}/>
        </ul>
    );
};

export default AdminNav;