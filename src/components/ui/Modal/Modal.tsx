import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
	active: boolean;
	children?: React.ReactNode;
	callback?: () => void;
}

const Modal: React.FC<ModalProps> = ({ active, children, callback }) => (
	<div
		onClick={callback}
		className={`${styles.modal} ${active && styles.active}`}
	>
		<div
			className={`${styles.modalContent} ${active && styles.active}`}
			onClick={(e) => e.stopPropagation()}
		>
			{children}
		</div>
	</div>
);

export default Modal;
