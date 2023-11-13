import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Input, Loader, Textarea} from "../../common";
import styles from "../AdminPage.module.css"
import {useCreateProductMutation, useUploadProductImageMutation} from "../../../store/products/productsAPI";
import {useNavigate} from "react-router-dom";
import AdminForm from "../AdminForm";
import {IProductFormFields} from "../../../@types/productType";

const CreateProduct: React.FC = () => {
    const {register, formState: {errors}, handleSubmit} = useForm<IProductFormFields>({mode: "onChange"});
    const [createProduct, {error, isSuccess, isLoading}] = useCreateProductMutation();
    const [uploadImage] = useUploadProductImageMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IProductFormFields> = async (data) => {
        const additionalProductData = {
            description: data.description,
            numberOfPages: data.numberOfPages,
            weight: data.weight,
            publisher: data.publisher,
        }
        const productData = {
            title: data.title,
            price: data.price,
            author: data.author,
            additional: additionalProductData,
        }

        await createProduct(productData);
        if (data.productImage.length){
            uploadImage({img: data.productImage[0], product: data.title})
        }
    }

    useEffect(() => {
        if (isSuccess){
            navigate("/admin-panel/products");
        }
    }, [isSuccess])

    if (isLoading){
        return <div className={`${styles.adminContent} ${styles.adminContentForm}`}>
            <Loader/>
        </div>
    }

    return (
        <>
            <AdminForm
                title={'Create Book'}
                btnTitle={'Create'}
                error={
                    error&&'data' in error?error.data.message : ''
                }
                submit={handleSubmit(onSubmit)}
            >
                <div className={styles.adminContentFormBlock}>
                    <p>
                        Title
                    </p>
                    <Input error={errors?.title?.message} register={{...register("title", {
                            required: true
                        })}} placeholder={"title"}/>
                </div>

                <div className={styles.adminContentFormBlock}>

                    <p>
                        Author
                    </p>
                    <Input error={errors?.author?.message} register={{...register("author", {
                            required: true
                        })}} placeholder={"author"}/>
                </div>

                <div className={styles.adminContentFormBlock}>
                    <p>
                        Price
                    </p>
                    <Input step=".01" type={"number"} register={{...register("price", {
                            valueAsNumber: true
                        })}} placeholder={"price"}/>
                </div>

                <div>
                    <h3>Additional Info</h3>
                    <div className={styles.adminContentFormBlock}>

                        <p>
                            Number of pages:
                        </p>

                        <Input type={"number"} register={{
                            ...register("numberOfPages", {
                                valueAsNumber: true
                            })
                        }} placeholder={"Number of pages"}/>
                    </div>
                    <div className={styles.adminContentFormBlock}>
                        <p>
                            Publisher:
                        </p>
                        <Input register={{
                            ...register("publisher", {})
                        }} placeholder={"Publisher"}/>
                    </div>
                    <div className={styles.adminContentFormBlock}>
                        <p>
                            Image:
                        </p>
                        <Input register={{...register("productImage")}} type={"file"}/>
                    </div>

                    <div className={styles.adminContentFormBlock}>
                        <p>
                            Weight:
                        </p>
                        <Input step=".01" register={{
                            ...register("weight", {
                                valueAsNumber: true,
                            })
                        }} placeholder={"Weight"}/>
                    </div>
                    <div className={styles.adminContentFormBlock}>
                        <p>
                            Description:
                        </p>
                        <Textarea error={errors?.description?.message} height={250} register={{
                            ...register("description", {
                                maxLength: {
                                    value: 400,
                                    message: 'max length 400 symbols',
                                }
                            })
                        }} placeholder={"Description"}/>
                    </div>
                </div>
            </AdminForm>
        </>
    );
};

export default CreateProduct;