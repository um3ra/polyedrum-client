import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    addClass?: string;
}

const Button: React.FC<ButtonProps> = ({ children, addClass, ...props }) => (
    <button className={`${styles.button} ${addClass}`} {...props}>
        {children}
    </button>
);

export default Button;
