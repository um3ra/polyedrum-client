import React from "react";
import styles from "./AdminPage.module.css";
import { Button } from "../ui";

interface AdminFormProps {
    title?: string;
    children?: React.ReactNode;
    btnTitle?: string;
    error?: string;
    submit: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({
    title,
    children,
    btnTitle,
    error,
    submit
}) => (
    <div className={`${styles.adminContent} ${styles.adminContentForm}`}>
        <form onSubmit={submit}>
            <h2>{title}</h2>
            {children}
            <div>
                {error && <span className={"errorMessage"}>{error}</span>}
            </div>
            <div className={styles.adminContentFormButton}>
                <Button>{btnTitle}</Button>
            </div>
        </form>
    </div>
);

export default AdminForm;
