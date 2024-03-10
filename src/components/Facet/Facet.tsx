import React, { useState } from "react";
import styles from "./Facet.module.css";
import qs from "query-string";
import { useDispatch } from "react-redux";
import FacetItem from "./FacetItem";
import { setSortData } from "../../store/products/productsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { ICategory } from "../../@types/categoryType";
import { EnumOrder, EnumSort, IAuthor } from "../../@types/productType";

interface FacetProps {
	authorData: IAuthor[];
	categoryData: ICategory[];
}

const Facet: React.FC<FacetProps> = ({ authorData, categoryData }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const changeQueryParams = (param: string) => {
		const [sort, order] = param.split(",") as [EnumSort, EnumOrder];

		const queryParam = qs.parse(location.search);
		const newQueryParam = {
			...queryParam,
			sort,
			order
		};
		navigate({ search: qs.stringify(newQueryParam) });
		dispatch(setSortData({ sort, order }));
	};
	return (
		<div>
			<div className={styles.facetContainer}>
				<div className={styles.facet}>
					<div className={styles.facetTitle}>Sort By</div>
					<div className={styles.select}>
						<select
							onChange={(e) => changeQueryParams(e.target.value)}
							name="sort_by"
							id="sort_by"
						>
							<option
								value={`${EnumSort.TITLE},${EnumOrder.ASC}`}
							>
								Title, A-Z
							</option>
							<option
								value={`${EnumSort.TITLE},${EnumOrder.DESC}`}
							>
								Title, Z-A
							</option>
							<option
								value={`${EnumSort.AUTHOR},${EnumOrder.ASC}`}
							>
								Author, A-Z
							</option>
							<option
								value={`${EnumSort.AUTHOR},${EnumOrder.DESC}`}
							>
								Author, Z-A
							</option>
							<option
								value={`${EnumSort.PRICE},${EnumOrder.ASC}`}
							>
								Price, low to high
							</option>
							<option
								value={`${EnumSort.PRICE},${EnumOrder.DESC}`}
							>
								Price, high to low
							</option>
						</select>
					</div>
				</div>
				{categoryData.map((category) => (
					<FacetItem
						sortType={"genre"}
						key={category.id}
						title={category.name}
						list={category.genres}
					/>
				))}
				<FacetItem
					sortType={"author"}
					title={"Authors"}
					list={authorData}
				/>
			</div>
		</div>
	);
};

export default Facet;
