import React from 'react';
import styles from './Button.module.css'

const Button = ({children, addClass, ...props}) => (
    <button className={`${styles.button} ${addClass}`} {...props}>
        {children}
    </button>
)

export default Button;