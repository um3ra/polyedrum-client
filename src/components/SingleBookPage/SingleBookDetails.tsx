import React from 'react';
import {IProduct} from "../../@types/productType";

interface SingleBookDetailsProps {
    productData: IProduct
}

const SingleBookDetails: React.FC<SingleBookDetailsProps> = ({productData}) => {
    return (
        <div>
            <div><i>Title:</i> <span>{productData.title}</span></div>
            <div><i>Author:</i> <span>{productData.author}</span></div>
            <div><i>Publisher:</i> <span>{productData.additional.publisher}</span></div>
            <div><i>Weight:</i> <span>{productData.additional.weight}</span></div>
            <div><i>Number of Pages:</i> <span>{productData.additional.numberOfPages}</span></div>
        </div>
    );
};

export default SingleBookDetails;