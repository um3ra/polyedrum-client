import { useEffect } from "react";
import {
    useGetProductByNameQuery,
    useUpdateProductGenresMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation
} from "../../../store/products/productsAPI";
import { SecondLoader } from "../../ui";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { IProductFormFields } from "../../../@types/productType";
import { useGetGenresQuery } from "../../../store/genre/genreAPI";
import { EditProductForm } from "./EditProductForm";

const UpdateProductPage = () => {
    const { productName } = useParams();
    const { data: productData } = useGetProductByNameQuery(productName ?? "");
    const [updateProduct, { error: updateProductError, isSuccess }] =
        useUpdateProductMutation();
    const [uploadProductImage] = useUploadProductImageMutation();
    const { data: genreData } = useGetGenresQuery(null);
    const [updateGenres] = useUpdateProductGenresMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/admin-panel/products");
        }
    }, [isSuccess]);

    if (!productData || !genreData) {
        return <SecondLoader />;
    }

    const onSubmit: SubmitHandler<
        IProductFormFields & { genreNames: string[] }
    > = async (data) => {
        if (data)
            updateGenres({
                id: productData.data.id,
                genres: data.genreNames
            });
        const additionalProductData = {
            description: data.description,
            numberOfPages: data.numberOfPages,
            weight: data.weight,
            publisher: data.publisher
        };
        const product = {
            title: data.title,
            price: data.price,
            author: data.author,
            genres: data.genres,
            additional: additionalProductData
        };
        await updateProduct({
            id: productData.data.id,
            productData: product
        });
        if (data.productImage.length) {
            uploadProductImage({
                img: data.productImage[0],
                product: data.title
            });
        }
    };

    return (
        <EditProductForm
            title="Update product"
            genreData={genreData.data}
            data={productData.data}
            onSubmit={onSubmit}
            errorMessage={updateProductError}
        />
    );
};

export default UpdateProductPage;
