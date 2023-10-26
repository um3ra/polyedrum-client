import React from 'react';
import styles from './CheckBox.module.css';

const CheckBox = ({title, checked}) => (
    <div className={styles.checkbox}>
        <div className={`${styles.checkboxItem} ${checked&&styles.checked}`}/>
        <a className={`${styles.title} ${checked&&styles.checkedTitle}`}>
            {title}
        </a>
    </div>
)

export default CheckBox;