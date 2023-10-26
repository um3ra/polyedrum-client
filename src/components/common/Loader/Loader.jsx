import React from 'react';
import styles from "./Loader.module.css";

const Loader = () => (
    <div className={styles.loaderContainer}>
        <div className={styles.loader}/>
    </div>
);

export default Loader;