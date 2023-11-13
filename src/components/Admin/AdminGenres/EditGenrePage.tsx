import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useGetGenreByNameQuery, useUpdateGenreMutation} from "../../../store/genre/genreAPI";
import {Input} from "../../common";
import AdminForm from "../AdminForm";
import styles from '../AdminPage.module.css';
import {IGenre} from "../../../@types/genreType";

const EditGenrePage: React.FC = () => {
    const {register, handleSubmit} = useForm<IGenre>({mode: "onChange"});
    const {genreName} = useParams();
    const {data: genreData} = useGetGenreByNameQuery(genreName ?? '');
    const [updateGenre, {isSuccess , error: updateGenreError}] = useUpdateGenreMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess){
            navigate("/admin-panel/genres");
        }
    }, [isSuccess])

    if (!genreData){
        return <div>Loading</div>
    }

    const onSubmit: SubmitHandler<IGenre> = data => {
        updateGenre({name: genreData.data.name, data})
    }

    return (
        <AdminForm
            title={'Edit Genre'}
            btnTitle={'Update'}
            error={
                updateGenreError&& 'data' in updateGenreError ?
                    updateGenreError.data.message : ''
            }
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