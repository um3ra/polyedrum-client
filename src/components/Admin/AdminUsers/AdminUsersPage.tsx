import { useGetUsersQuery } from "../../../store/user/userAPI";
import { SecondLoader } from "../../ui";
import { AdminContent } from "../AdminContent/AdminContent";
import { AdminHeading } from "../AdminHeading/AdminHeading";
import styles from "../AdminPage.module.css";

const AdminUsersPage = () => {
	const { data: userData } = useGetUsersQuery(null);

	if (!userData) {
		return <SecondLoader />;
	}

	return (
		<div className={styles.adminContentWrapper}>
			<AdminHeading title="Users" count={userData?.data.length} />
			<AdminContent data={userData.data} />
		</div>
	);
};

export default AdminUsersPage;
