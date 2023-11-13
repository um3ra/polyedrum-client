import React, {useEffect} from 'react';
import styles from "../AdminPage.module.css";
import {SubmitHandler, useForm} from "react-hook-form";
import {Input, Loader} from "../../common";
import {useCreateGenreMutation} from "../../../store/genre/genreAPI";
import {useNavigate} from "react-router-dom";
import AdminForm from "../AdminForm";
import {IGenre} from "../../../@types/genreType";

const CreateGenre: React.FC = () => {
    const {register, handleSubmit} = useForm<IGenre>({mode: "onChange"});
    const [createGenre, {error: genreError, isSuccess, isLoading}] = useCreateGenreMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess)
            navigate("/admin-panel/genres");
    }, [isSuccess])

    const onSubmit: SubmitHandler<IGenre> = (data) => {
        createGenre(data);
    }

    if (isLoading){
        return <div className={`${styles.adminContent} ${styles.adminContentForm}`}>
            <Loader/>
        </div>
    }

    return (
        <AdminForm
            title={'Create Genre'}
            btnTitle={'Create'}
            error={
                genreError && 'data' in genreError ?
                    genreError.data.message : ''
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
                }} placeholder={"name"}
                />
            </div>
        </AdminForm>
    );
};

export default CreateGenre;