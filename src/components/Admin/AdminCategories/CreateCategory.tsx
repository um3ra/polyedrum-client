import { useEffect } from "react";
import { Input } from "../../ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateCategoryMutation } from "../../../store/category/categoryAPI";
import { useNavigate } from "react-router-dom";
import styles from "../AdminPage.module.css";
import AdminForm from "../AdminForm";
import { ICategory } from "../../../@types/categoryType";

const CreateCategory = () => {
    const { register, handleSubmit } = useForm<ICategory>();
    const navigate = useNavigate();
    const [createCategory, { error: categoryError, isSuccess }] =
        useCreateCategoryMutation();

    useEffect(() => {
        if (isSuccess) navigate("/admin-panel/categories");
    }, [isSuccess]);

    const onSubmit: SubmitHandler<ICategory> = (data) => {
        createCategory(data);
    };

    return (
        <AdminForm
            title={"Create Category"}
            btnTitle={"Create"}
            error={
                categoryError && "data" in categoryError
                    ? categoryError.data.message
                    : ""
            }
            submit={handleSubmit(onSubmit)}
        >
            <div className={styles.adminContentFormBlock}>
                <Input
                    label="Name"
                    {...register("name", {
                        required: true
                    })}
                    placeholder={"name"}
                />
            </div>
        </AdminForm>
    );
};

export default CreateCategory;
