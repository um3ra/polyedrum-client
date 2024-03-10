import { forwardRef } from "react";
import styles from "./Textarea.module.css";
import clsx from "clsx";

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	height?: number;
	error?: string;
	children?: React.ReactNode;
	label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ height, label, error, children, ...props }, ref) => (
		<div>
			(label && (<label>{label}</label>
			))
			<textarea
				ref={ref}
				{...props}
				style={{ height: `${height ? `${height}px` : "100px"}` }}
				className={clsx(styles.textarea, error && styles.error)}
			>
				{children}
			</textarea>
			{error && <div className={"errorMessage"}>{error}</div>}
		</div>
	)
);

export default Textarea;
