import styles from "../AdminPage.module.css";
import { Button, SecondLoader } from "../../ui";
import { useNavigate } from "react-router-dom";
import {
	useDeleteGenreMutation,
	useGetGenresQuery
} from "../../../store/genre/genreAPI";
import { AdminContent } from "../AdminContent/AdminContent";
import { AdminHeading } from "../AdminHeading/AdminHeading";

const AdminGenrePage = () => {
	const navigate = useNavigate();
	const { data: genreData } = useGetGenresQuery(null);
	const [deleteGenre] = useDeleteGenreMutation();

	if (!genreData) return <SecondLoader />;

	return (
		<div className={styles.adminContentWrapper}>
			<AdminHeading
				btnRender={() => (
					<Button onClick={() => navigate("create-genre")}>
						Create new
					</Button>
				)}
				title="Genres"
				count={genreData?.data.length}
			/>

			<AdminContent
				data={genreData.data}
				onDelete={deleteGenre}
				goEditPage={(name) => navigate(`update-genre/${name}`)}
			/>
		</div>
	);
};

export default AdminGenrePage;
