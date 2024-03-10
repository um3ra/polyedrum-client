import React from "react";
import styles from "./GlobalLoader.module.css";

export const Loader: React.FC = () => (
    <div className={styles.loaderContainer}>
        <div className={styles.loader} />
    </div>
);
