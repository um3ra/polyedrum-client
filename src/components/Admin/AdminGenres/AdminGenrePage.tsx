import React from 'react';
import styles from "../AdminPage.module.css";
import {Button} from "../../common";
import {useNavigate} from "react-router-dom";
import {useDeleteGenreByNameMutation, useGetGenresQuery} from "../../../store/genre/genreAPI";
import button from "../../common/Button/Button";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";

const AdminGenrePage: React.FC = () => {
    const navigate = useNavigate();
    const {data: genreData} = useGetGenresQuery(null);
    const [deleteGenre] = useDeleteGenreByNameMutation();

    return (
        <div className={styles.adminContent}>
            <div onClick={() => navigate('create-genre')}>
                <Button>
                    Create new
                </Button>
            </div>

            <div className={styles.adminInnerContent}>
                <ul className={styles.adminContentList}>
                    <li>
                        id
                    </li>
                    {genreData?.data?.map(category => {
                        return <li key={category.id}>
                            {category.id}
                        </li>
                    })}
                </ul>

                <ul className={styles.adminContentList}>
                    <li>
                        name
                    </li>
                    {genreData?.data?.map(category => {
                        return <li key={category.name}>
                            {category.name}
                        </li>
                    })}
                </ul>
            </div>

            <div className={`${styles.adminContentList} ${styles.adminContentBtns}`}>
                <div>Options</div>
                {genreData?.data?.map(genre => {
                    return <div key={genre.id}>
                        <button className={styles.adminContentBtnsEdit}
                                onClick={() => navigate(`update-genre/${genre.name}`)}><AiOutlineEdit/></button>
                        <button className={styles.adminContentBtnsDelete} onClick={() => deleteGenre(genre.name)}>
                            <AiOutlineDelete/></button>
                    </div>
                })}
            </div>
        </div>
    );
};

export default AdminGenrePage;