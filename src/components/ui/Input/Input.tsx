import { forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    className?: string;
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ error, label, className, ...inputProps }, ref) => (
        <div>
            {label && <label className={styles.label}>{label}</label>}
            <input
                ref={ref}
                {...inputProps}
                className={`${className} ${styles.input} ${error && styles.error}`}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
);
