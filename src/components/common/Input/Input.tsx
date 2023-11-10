import React from 'react';
import styles from './Input.module.css'


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    register?: any
    error?: string
}

const Input: React.FC<InputProps> = ({register, error, ...props}) => (
    <>
        <input {...register} {...props} className={`${styles.input} ${error&&styles.error}`} />
        {error&&<div className={styles.errorMessage}>{error}</div>}
    </>
)

export default Input;