import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    useCreateGenreMutation,
    useGetGenreByNameQuery,
    useUpdateGenreMutation
} from "../../../store/genre/genreAPI";
import { Input, SecondLoader } from "../../ui";
import AdminForm from "../AdminForm";
import styles from "../AdminPage.module.css";
import { IGenre } from "../../../@types/genreType";
import { extractError } from "../../../store/api";

const EditGenrePage = () => {
    const { register, handleSubmit } = useForm<IGenre>({ mode: "onChange" });
    const { pathname } = useLocation();
    const { genreName } = useParams();
    const { data: genreData } = useGetGenreByNameQuery(genreName ?? "");
    const [updateGenre, { isSuccess: updateSuccess, error: updateGenreError }] =
        useUpdateGenreMutation();
    const [createGenre, { error: createGenreError, isSuccess: createSuccess }] =
        useCreateGenreMutation();
    const navigate = useNavigate();
    const isUpdate = pathname.includes("update-genre");

    useEffect(() => {
        if (updateSuccess || createSuccess) {
            navigate("/admin-panel/genres");
        }
    }, [updateSuccess, createSuccess]);

    if (isUpdate && !genreData) {
        return <SecondLoader />;
    }

    const onSubmit: SubmitHandler<IGenre> = (data) => {
        if (isUpdate && genreData) {
            updateGenre({ name: genreData.data.name, data });
        } else {
            createGenre(data);
        }
    };

    return (
        <AdminForm
            title={isUpdate ? "Edit Genre" : "Create Genre"}
            btnTitle={"Save"}
            error={
                updateGenreError
                    ? extractError(updateGenreError)
                    : createGenreError && extractError(createGenreError)
            }
            submit={handleSubmit(onSubmit)}
        >
            <div className={styles.adminContentFormBlock}>
                <Input
                    label="Name"
                    {...register("name", {
                        required: true
                    })}
                    defaultValue={
                        isUpdate && genreData ? genreData.data.name : ""
                    }
                />
            </div>
        </AdminForm>
    );
};

export default EditGenrePage;
