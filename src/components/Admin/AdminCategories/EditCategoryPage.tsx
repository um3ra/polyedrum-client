import { useEffect } from "react";
import { Input, SecondLoader, TransparentCheckbox } from "../../ui";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    useGetCategoryByNameQuery,
    useUpdateCategoryByNameMutation,
    useUpdateCategoryGenresMutation
} from "../../../store/category/categoryAPI";
import { useNavigate, useParams } from "react-router-dom";
import AdminForm from "../AdminForm";
import styles from "../AdminPage.module.css";
import { ICategory } from "../../../@types/categoryType";
import { useGetGenresQuery } from "../../../store/genre/genreAPI";

const EditCategoryPage = () => {
    const { register, handleSubmit } = useForm<
        ICategory & { genre: string } & { genreNames: string[] }
    >();
    const { categoryName } = useParams();
    const { data: categoryData } = useGetCategoryByNameQuery(
        categoryName ?? ""
    );
    const { data: genreData } = useGetGenresQuery(null);
    const [updateCategory, { error: updateGenreError, isSuccess }] =
        useUpdateCategoryByNameMutation();

    const navigate = useNavigate();
    const [updateGenres] = useUpdateCategoryGenresMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/admin-panel/categories");
        }
    }, [isSuccess]);

    if (!genreData || !categoryData) return <SecondLoader />;

    const onSubmit: SubmitHandler<ICategory & { genreNames: string[] }> = (
        data
    ) => {
        updateCategory({
            id: categoryData.data.id,
            categoryData: data
        });

        updateGenres({
            id: categoryData.data.id,
            genres: data.genreNames
        });
    };

    return (
        <AdminForm
            title={"Edit Category"}
            btnTitle={"Update"}
            error={
                updateGenreError && "data" in updateGenreError
                    ? updateGenreError.data.message
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
                    defaultValue={categoryData.data.name}
                />
            </div>

            <div>
                <h2>Genres</h2>
                <div className={styles.genresList}>
                    {genreData.data.map((el) => (
                        <TransparentCheckbox
                            {...register("genreNames")}
                            defaultChecked={categoryData.data.genres?.some(
                                (genre) => genre.id === el.id
                            )}
                            value={el.name}
                            key={el.id}
                            title={el.name}
                        />
                    ))}
                </div>
            </div>
        </AdminForm>
    );
};

export default EditCategoryPage;
