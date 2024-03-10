import { InputHTMLAttributes, forwardRef, useId } from "react";
import styles from "./TransparentCheckbox.module.css";

interface TransparentCheckboxProps
	extends InputHTMLAttributes<HTMLInputElement> {
	title: string;
}

export const TransparentCheckbox = forwardRef<
	HTMLInputElement,
	TransparentCheckboxProps
>(({ title, ...props }, ref) => {
	const id = useId();

	return (
		<div className={styles.wrapper}>
			<input ref={ref} {...props} type="checkbox" id={id} />
			<label htmlFor={id}></label>
			<span>{title}</span>
		</div>
	);
});
