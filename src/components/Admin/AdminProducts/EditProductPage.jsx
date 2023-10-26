import React, {useEffect} from 'react';
import {
    useAddProductToGenreMutation,
    useDeleteGenreFromProductMutation,
    useGetProductByNameQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation
} from "../../../store/products/productsAPI";
import {Input, Textarea, EditList} from "../../common";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import styles from "../AdminPage.module.css";
import AdminForm from "../AdminForm";

const EditProductPage = () => {

    const {productName} = useParams();
    const {data: productData} = useGetProductByNameQuery(productName);
    const [updateProduct, {error: updateProductError, isSuccess}] = useUpdateProductMutation();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [addProductToGenre, {data: productGenreData, error}] = useAddProductToGenreMutation();
    const [deleteGenre] = useDeleteGenreFromProductMutation();
    const {register, handleSubmit, getValues, formState: {errors}} = useForm({mode: "onChange"});
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess){
            navigate("/admin-panel/products")
        }
    }, [isSuccess])

    const deleteGenreCallback = (genre) => {
        deleteGenre({product: productData.data.title, genre});
    }


    const onSubmit = async (data) => {
        const additionalProductData = {
            description: data.description,
            numberOfPages: data.numberOfPages,
            weight: data.weight,
            publisher: data.publisher,
        }
        const product = {
            title: data.title,
            price: data.price,
            author: data.author,
            additional: additionalProductData,
        }
        await updateProduct({id: productData.data.id, productData: product})
        if (data.productImage.length){
            uploadProductImage({img: data.productImage[0], product: data.title});
        }
    }
    if (!productData){
        return <div>Loading</div>
    }
    const addNewGenre = () => {
        const newGenre = getValues("genre");
        addProductToGenre({name: productData.data.title, genre: newGenre})
    }
    return (
        <AdminForm
            title={'Edit Product'}
            btnTitle={'Update'}
            error={updateProductError?.data?.message}
            submit={handleSubmit(onSubmit)}
        >
            <div className={styles.adminContentFormBlock}>
                <p>
                    Title
                </p>
                <Input register={{...register("title", {
                        required: true
                    })}} defaultValue={productData.data.title}/>
            </div>
            <div className={styles.adminContentFormBlock}>
                <p>
                    Author
                </p>
                <Input register={{...register("author", {
                        required: true
                    })}} defaultValue={productData.data.author}/>
            </div>
            <div className={styles.adminContentFormBlock}>
                <EditList
                    messages={{
                        error: error?.data?.message,
                        success: productGenreData?.message
                    }}
                    list={productData?.data?.genres}
                    deleteCallback={deleteGenreCallback}
                    addCallback={addNewGenre}
                    title={"Genres"}
                    registerBtn={{
                        ...register("genre")
                    }}/>
            </div>
            <div className={styles.adminContentFormBlock}>
                <p>
                    Price
                </p>
                <Input step=".01" type={"number"} register={{...register("price", {
                        valueAsNumber: true
                    })}} defaultValue={productData.data.price}/>
            </div>

            <div>
                <h3>Additional</h3>
                <div className={styles.adminContentFormBlock}>
                    <p className={styles.adminContentFormBlockTitle}>
                        Number of pages:
                    </p>

                    <Input type={"number"} register={{
                        ...register("numberOfPages", {
                            valueAsNumber: true
                        })
                    }} defaultValue={productData.data.additional.numberOfPages}/>
                </div>

                <div className={styles.adminContentFormBlock}>
                    <p>
                        Publisher:
                    </p>

                    <Input register={{
                        ...register("publisher", {})
                    }} defaultValue={productData.data.additional.publisher}/>
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
                    }} defaultValue={productData.data.additional.weight}/>
                </div>

                <div className={styles.adminContentFormBlock}>
                    <p>
                        Description:
                    </p>

                    <Textarea height={250} register={{...register("description", {
                            maxLength: {
                                value: 500,
                                message: "max length 400 symbols"
                            },
                        })}} error={errors?.description?.message} defaultValue={productData.data.additional.description}/>
                </div>
            </div>
        </AdminForm>
    );
};

export default EditProductPage;