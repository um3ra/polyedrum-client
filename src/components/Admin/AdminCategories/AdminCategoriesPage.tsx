import {
	useDeleteCategoryMutation,
	useGetCategoriesQuery
} from "../../../store/category/categoryAPI";
import { useNavigate } from "react-router-dom";
import { Button, SecondLoader } from "../../ui";
import styles from "../AdminPage.module.css";
import { AdminContent } from "../AdminContent/AdminContent";
import { AdminHeading } from "../AdminHeading/AdminHeading";

const AdminCategoriesPage = () => {
	const { data: categoryData } = useGetCategoriesQuery(null);
	const [deleteCategory] = useDeleteCategoryMutation();
	const navigate = useNavigate();
	if (!categoryData) {
		return <SecondLoader />;
	}
	const adminContentData = categoryData.data.map((el) => ({
		id: el.id,
		name: el.name
	}));

	return (
		<div className={styles.adminContentWrapper}>
			<AdminHeading
				btnRender={() => (
					<Button onClick={() => navigate("create-category")}>
						Create new
					</Button>
				)}
				title="Categories"
				count={categoryData?.data.length}
			/>

			<AdminContent
				data={adminContentData}
				onDelete={deleteCategory}
				goEditPage={(name) => navigate(`update-category/${name}`)}
			/>
		</div>
	);
};

export default AdminCategoriesPage;
