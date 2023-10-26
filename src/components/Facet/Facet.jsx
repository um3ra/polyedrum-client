import React from 'react';
import styles from './Facet.module.css';
import qs from 'query-string';
import {useDispatch} from "react-redux";
import FacetItem from "../Facet/FacetItem";
import {setSortData} from "../../store/products/productsSlice";
import {useLocation, useNavigate} from "react-router-dom";



const Facet = ({currentSelection, authorData, categoryData}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const changeQueryParams = (param) => {
        const sort = param.split(",")[0];
        const order = param.split(",")[1];

        const queryParam = qs.parse(location.search);
        const newQueryParam = {
            ...queryParam,
            sort,
            order,
        }
        navigate({search: qs.stringify(newQueryParam)});
        dispatch(setSortData({sort, order}));
    }
    return (
        <div>
            <div className={styles.facetContainer}>
                <div className={styles.facet}>
                    <div className={styles.facetTitle}>Sort By</div>
                    <div className={styles.select}>
                        <select onChange={(e) => changeQueryParams(e.target.value)} name="sort_by" id="sort_by">
                            <option value="title,asc">Title, A-Z</option>
                            <option value="title,desc">Title, Z-A</option>
                            <option value="author,asc">Author, A-Z</option>
                            <option value="author,desc">Author, Z-A</option>
                            <option value="price,asc">Price, low to high</option>
                            <option value="price,desc">Price, high to low</option>
                        </select>
                    </div>
                </div>
                {categoryData.data.map( category => (
                    <FacetItem currentSelection={currentSelection}
                               sortType={"genre"}
                               key={category.id}
                               title={category.name}
                               list={category.genres}/>
                ))}
                <FacetItem currentSelection={currentSelection} sortType={"author"} title={"Authors"} list={authorData.data}/>
            </div>
        </div>
    );
};

export default Facet;