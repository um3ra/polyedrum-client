import { Link, useLocation } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import styles from "../Profile.module.css";
import { PROFILE_NAV } from "./profile-nav.data";
import clsx from "clsx";

export const ProfileNav = ({ isAdmin }: { isAdmin: boolean }) => {
	const { pathname } = useLocation();
	const path = pathname.split("/")[2] || "";

	return (
		<ul className={styles.userProfileNavBar}>
			{PROFILE_NAV.map((el) => (
				<li key={el.name}>
					<Link
						className={clsx(
							styles.navItem,
							path === el.link && styles.active
						)}
						to={el.link}
					>
						<el.icon size={20} /> {el.name}
					</Link>
				</li>
			))}
			{isAdmin && (
				<li>
					<Link className={styles.navItem} to={"/admin-panel"}>
						<RiAdminFill size={20} />
						Admin panel
					</Link>
				</li>
			)}
		</ul>
	);
};
