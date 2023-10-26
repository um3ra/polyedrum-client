import React, {useEffect} from 'react';
import {EditList, Input} from "../../common";
import {useForm} from "react-hook-form";
import {
    useDeleteGenreFromCategoryMutation,
    useGetCategoryByNameQuery,
    useAddGenreToCategoryMutation,
    useUpdateCategoryByNameMutation,
} from "../../../store/category/categoryAPI";
import {useNavigate, useParams} from "react-router-dom";
import AdminForm from "../AdminForm";
import styles from "../AdminPage.module.css";

const EditCategoryPage = () => {

    const {register, getValues, handleSubmit} = useForm();
    const {categoryName} = useParams();
    const {data: categoryData} = useGetCategoryByNameQuery(categoryName);
    const [deleteGenre] = useDeleteGenreFromCategoryMutation();
    const [addGenre, {data: addGenreData, error: addGenreError}] = useAddGenreToCategoryMutation();
    const [updateCategory, {error: updateGenreError, isSuccess}] = useUpdateCategoryByNameMutation();
    const navigate = useNavigate();

    const addNewGenre = () => {
        console.log(getValues("genre"))
        const newGenre = getValues("genre");
        addGenre({category: categoryData.data.name, genre: newGenre})
    }

    const deleteGenreCallback = (genre) => {
        deleteGenre({category: categoryData.data.name, genre})
    }

    const onSubmit = (data) => {
        updateCategory({
            name: categoryData.data.name,
            categoryData: data,
        })
    }

    useEffect(() => {
        if (isSuccess){
            navigate("/admin-panel/categories")
        }
    }, [isSuccess])

    if (!categoryData) {
        return <div>Loading...</div>
    }

    return (
        <AdminForm
            title={'Edit Category'}
            btnTitle={'Update'}
            error={updateGenreError?.message}
            submit={handleSubmit(onSubmit)}
        >
            <div className={styles.adminContentFormBlock}>
                <p>
                    Name
                </p>
                <Input register={{...register("name", {
                        required: true
                    })}} defaultValue={categoryData.data.name}/>
            </div>
            <div className={styles.adminContentFormBlock}>
                <EditList
                    title={'Genres'}
                    list={categoryData?.data?.genres}
                    deleteCallback={deleteGenreCallback}
                    addCallback={addNewGenre}
                    registerBtn={{...register("genre")}}
                    messages={{
                        success: addGenreData?.message,
                        error: addGenreError?.data?.message
                    }}
                >
                </EditList>
            </div>
        </AdminForm>
    );
};

export default EditCategoryPage;