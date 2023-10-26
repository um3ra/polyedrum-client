import React from 'react';
import styles from './Input.module.css'

const Input = ({register, name, error, ...props}) => (
    <>
        <input {...register} {...props} className={`${styles.input} ${error&&styles.error}`} />
        {error&&<div className={styles.errorMessage}>{error}</div>}
    </>
)

export default Input;