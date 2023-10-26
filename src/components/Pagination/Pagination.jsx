import React from 'react';
import {useDispatch} from "react-redux";
import {getAllProducts} from "../../store/products/productsSlice";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import styles from './Pagination.module.css';

const Pagination = ({pagination}) => {
    const {pageNo, totalPages, pageSize, totalCount} = pagination;
    const dispatch = useDispatch();
    const changeCurrentPage = (pageNo) => {
        dispatch(getAllProducts({pageNo}));
    }

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.paginationItem}>
                {pageNo > 0 &&
                    <div className={styles.arrowLeft}
                         onClick={() => changeCurrentPage(pageNo - 1)}>
                        <MdKeyboardArrowLeft color={'#fff'} size={30}/>
                    </div>
                }
            </div>
            <div className={styles.paginationText}>
                <span>Page {pageNo + 1} of {totalPages}</span>
            </div>

            <div className={styles.paginationItem}>
                {pageNo<totalPages - 1&&
                    <div className={styles.arrowRight} onClick={() => changeCurrentPage(pageNo + 1)}>
                        <MdKeyboardArrowRight color={'#fff'} size={30}/>
                    </div>}
            </div>

        </div>
    );
};

export default Pagination;