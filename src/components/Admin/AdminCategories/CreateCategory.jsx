import React, {useEffect} from 'react';
import {Input} from "../../common";
import {useForm} from "react-hook-form";
import {useCreateCategoryMutation} from "../../../store/category/categoryAPI";
import {useNavigate} from "react-router-dom";
import styles from "../AdminPage.module.css";
import AdminForm from "../AdminForm";

const CreateCategory = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [createCategory, {error: categoryError, isSuccess}] = useCreateCategoryMutation();

    const onSubmit = async (data) => {
        await createCategory(data);
    }
    useEffect(() => {
        if (isSuccess)
            navigate("/admin-panel/categories");
    }, [isSuccess])

    return (

        <AdminForm
            title={'Create Category'}
            btnTitle={'Create'}
            error={categoryError?.data?.message}
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
                }} placeholder={"name"}/>
            </div>
        </AdminForm>
    );
};

export default CreateCategory;