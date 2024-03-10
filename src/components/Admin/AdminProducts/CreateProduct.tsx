import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { Loader } from "../../ui";
import {
    useCreateProductMutation,
    useUploadProductImageMutation
} from "../../../store/products/productsAPI";
import { useNavigate } from "react-router-dom";
import { IProductFormFields } from "../../../@types/productType";
import { EditProductForm } from "./EditProductForm";

const CreateProduct = () => {
    const [createProduct, { error, isSuccess, isLoading }] =
        useCreateProductMutation();
    const [uploadImage] = useUploadProductImageMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<
        IProductFormFields & { genreNames: string[] }
    > = async (data) => {
        const additionalProductData = {
            description: data.description,
            numberOfPages: data.numberOfPages,
            weight: data.weight,
            publisher: data.publisher
        };
        const productData = {
            title: data.title,
            price: data.price,
            author: data.author,
            additional: additionalProductData
        };

        await createProduct(productData);

        if (data.productImage.length) {
            uploadImage({ img: data.productImage[0], product: data.title });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/admin-panel/products");
        }
    }, [isSuccess]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <EditProductForm
            title="Create product"
            errorMessage={error}
            onSubmit={onSubmit}
        />
    );
};

export default CreateProduct;
