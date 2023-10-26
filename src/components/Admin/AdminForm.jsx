import React from 'react';
import styles from './AdminPage.module.css';
import {Button} from "../common";

const AdminForm = ({title, children, btnTitle, error, submit}) => (
    <div className={`${styles.adminContent} ${styles.adminContentForm}`}>
        <form onSubmit={submit}>
            <h1>
                {title}
            </h1>
            {children}
            <div>
                {
                    error &&
                    <span className={"errorMessage"}>{error}</span>
                }
            </div>
            <div className={styles.adminContentFormButton}>
                <Button>{btnTitle}</Button>
            </div>
        </form>
    </div>
);

export default AdminForm;