import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import { IoWarningOutline } from "react-icons/io5";

export const NotFound = () => {
	return (
		<section>
			<div className={styles.wrapper}>
				<IoWarningOutline size={70} color="red" />
				<h1>
					<span>404</span> - Page not found
				</h1>
				<Link to="/">Go home page</Link>
			</div>
		</section>
	);
};
