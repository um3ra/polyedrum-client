import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct, IProductFormFields } from "../../../@types/productType";
import { Input, TransparentCheckbox, Textarea } from "../../ui";
import AdminForm from "../AdminForm";
import styles from "../AdminPage.module.css";
import { IGenre } from "../../../@types/genreType";

interface EditProductFormProps {
    onSubmit: SubmitHandler<IProductFormFields & { genreNames: string[] }>;
    errorMessage: any;
    data?: IProduct;
    genreData?: IGenre[];
    title: string;
}

export const EditProductForm = ({
    onSubmit,
    errorMessage,
    data,
    genreData,
    title
}: EditProductFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<
        { genre: string } & { genreNames: string[] } & IProductFormFields
    >({ mode: "onChange" });

    return (
        <AdminForm
            title={title}
            btnTitle={"Save"}
            error={
                errorMessage && "data" in errorMessage
                    ? errorMessage.data.message
                    : ""
            }
            submit={handleSubmit(onSubmit)}
        >
            <div>
                <div>
                    <div className={styles.adminContentFormBlock}>
                        <Input
                            label="Title"
                            {...register("title", {
                                required: true
                            })}
                            defaultValue={data && data.title}
                        />

                        <Input
                            label="Price"
                            step=".01"
                            type={"number"}
                            {...register("price", {
                                valueAsNumber: true
                            })}
                            defaultValue={data && data.price}
                        />
                    </div>
                </div>

                {genreData && (
                    <div>
                        <h2>Genres</h2>
                        <div className={styles.genresList}>
                            {genreData.map((el) => (
                                <TransparentCheckbox
                                    {...register("genreNames")}
                                    defaultChecked={
                                        data &&
                                        data.genres?.some(
                                            (genre) => genre.id === el.id
                                        )
                                    }
                                    value={el.name}
                                    key={el.id}
                                    title={el.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <div className={styles.adminContentFormBlock}>
                        <Input
                            label="Number of pages:"
                            type={"number"}
                            {...register("numberOfPages", {
                                valueAsNumber: true
                            })}
                            defaultValue={data && data.additional.numberOfPages}
                        />

                        <Input
                            label="Publisher:"
                            {...register("publisher")}
                            defaultValue={data && data.additional.publisher}
                        />
                    </div>

                    <div className={styles.adminContentFormBlock}>
                        <Input
                            label="Image:"
                            {...register("productImage")}
                            type={"file"}
                        />
                    </div>

                    <div className={styles.adminContentFormBlock}>
                        <Input
                            label="Weight:"
                            step=".01"
                            {...register("weight", {
                                valueAsNumber: true
                            })}
                            defaultValue={data && data.additional.weight}
                        />
                        <Input
                            label="Author"
                            {...register("author", {
                                required: true
                            })}
                            defaultValue={data && data.author}
                        />
                    </div>

                    <div className={styles.adminContentFormBlock}>
                        <Textarea
                            label="Description:"
                            height={250}
                            {...register("description", {
                                maxLength: {
                                    value: 500,
                                    message: "max length 500 symbols"
                                }
                            })}
                            error={errors?.description?.message}
                            defaultValue={data && data.additional.description}
                        />
                    </div>
                </div>
            </div>
        </AdminForm>
    );
};
