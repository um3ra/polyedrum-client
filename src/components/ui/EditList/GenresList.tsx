import { IGenre } from "../../../@types/genreType";
import { useGetGenresQuery } from "../../../store/genre/genreAPI";

interface GenresListProps {
	list: IGenre[];
}

export const GenresList = ({ list }: GenresListProps) => {
	const { data } = useGetGenresQuery(null);
	return data?.data.map((el) => {});
};
