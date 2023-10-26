import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useGetGenreByNameQuery, useUpdateGenreMutation} from "../../../store/genre/genreAPI";
import {Input} from "../../common";
import AdminForm from "../AdminForm";
import styles from '../AdminPage.module.css';

const EditGenrePage = () => {
    const {register, handleSubmit} = useForm({mode: "onChange"});
    const {genreName} = useParams();
    const {data: genreData} = useGetGenreByNameQuery(genreName);
    const [updateGenre, {isSuccess , error: updateGenreError}] = useUpdateGenreMutation();
    const navigate = useNavigate();

    const onSubmit = data => {
        updateGenre({name: genreData.data.name, data})
    }
    useEffect(() => {
        if (isSuccess){
            navigate("/admin-panel/genres");
        }
    }, [isSuccess])

    if (!genreData){
        return <div>Loading</div>
    }
    return (
        <AdminForm
            title={'Edit Genre'}
            btnTitle={'Update'}
            error={updateGenreError?.data?.message}
            submit={handleSubmit(onSubmit)}
        >
            <div className={styles.adminContentFormBlock}>
                <p>
                    Name
                </p>
                <Input register={{
                    ...register("name", {
                        required: true
                    })
                }} defaultValue={genreData.data.name}/>
            </div>
        </AdminForm>
    );
};

export default EditGenrePage;