import React, {useEffect} from 'react';
import {EditList, Input} from "../../common";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    useDeleteGenreFromCategoryMutation,
    useGetCategoryByNameQuery,
    useAddGenreToCategoryMutation,
    useUpdateCategoryByNameMutation,
} from "../../../store/category/categoryAPI";
import {useNavigate, useParams} from "react-router-dom";
import AdminForm from "../AdminForm";
import styles from "../AdminPage.module.css";
import {ICategory} from "../../../@types/categoryType";

const EditCategoryPage: React.FC = () => {

    const {register, getValues, handleSubmit} = useForm<ICategory & {genre: string}>();
    const {categoryName} = useParams();
    const {data: categoryData} = useGetCategoryByNameQuery(categoryName ?? '');
    const [deleteGenre] = useDeleteGenreFromCategoryMutation();
    const [addGenre, {data: addGenreData, error: addGenreError}] = useAddGenreToCategoryMutation();
    const [updateCategory, {error: updateGenreError, isSuccess}] = useUpdateCategoryByNameMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess){
            navigate("/admin-panel/categories")
        }
    }, [isSuccess])

    if (!categoryData) {
        return <div>Loading...</div>
    }

    const addNewGenre = () => {
        const newGenre = getValues("genre");
        addGenre({category: categoryData.data.name, genre: newGenre})
    }

    const deleteGenreCallback = (genre: string) => {
        deleteGenre({category: categoryData.data.name, genre})
    }

    const onSubmit: SubmitHandler<ICategory> = (data) => {
        updateCategory({
            name: categoryData.data.name,
            categoryData: data,
        })
    }

    return (
        <AdminForm
            title={'Edit Category'}
            btnTitle={'Update'}
            error={
                updateGenreError && 'data' in updateGenreError ?
                    updateGenreError.data.message : ''
            }
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
                        error: addGenreError&& 'data' in addGenreError ? addGenreError.data.message : ''
                    }}
                />
            </div>
        </AdminForm>
    );
};

export default EditCategoryPage;