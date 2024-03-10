import AdminNav from "./AdminNav/AdminNav";
import { Outlet } from "react-router-dom";
import { WrapperWithNav } from "../ui";
import styles from "./AdminPage.module.css";

const AdminPage = () => (
	<WrapperWithNav
		mainClassName={styles.wrapper}
		navRender={() => <AdminNav />}
		mainRender={() => <Outlet />}
		title="Admin panel"
	/>
);

export default AdminPage;
