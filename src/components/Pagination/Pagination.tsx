import React from "react";
import { getAllProducts } from "../../store/products/productsSlice";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from "./Pagination.module.css";
import { IPagination } from "../../@types/productType";
import { useAppDispatch } from "../../store/store";

interface PaginationProps {
	pagination: IPagination;
}

const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
	const { pageNo, totalPages } = pagination;
	const dispatch = useAppDispatch();
	const changeCurrentPage = (pageNo: number) => {
		dispatch(getAllProducts({ pageNo }));
	};

	return (
		<div className={styles.paginationContainer}>
			<div className={styles.paginationItem}>
				{pageNo > 0 && (
					<div
						className={styles.arrowLeft}
						onClick={() => changeCurrentPage(pageNo - 1)}
					>
						<MdKeyboardArrowLeft color={"#fff"} size={30} />
					</div>
				)}
			</div>
			<div className={styles.paginationText}>
				<span>
					Page {pageNo + 1} of {totalPages}
				</span>
			</div>

			<div className={styles.paginationItem}>
				{totalPages && pageNo < totalPages - 1 && (
					<div
						className={styles.arrowRight}
						onClick={() => changeCurrentPage(pageNo + 1)}
					>
						<MdKeyboardArrowRight color={"#fff"} size={30} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Pagination;
