import { Link } from "react-router-dom";
import styles from "../AdminPage.module.css";
import clsx from "clsx";

interface AdminNavItemProps {
	name: string;
	path: string;
	setPath: (name: string) => void;
}

const AdminNavItem = ({ name, path, setPath }: AdminNavItemProps) => (
	<li>
		<Link
			onClick={() => setPath(name)}
			className={clsx(
				(path === name || (!path && name === "users")) &&
					styles.adminNavItemActive
			)}
			to={name === "users" ? "" : name}
		>
			{name}
		</Link>
	</li>
);

export default AdminNavItem;
