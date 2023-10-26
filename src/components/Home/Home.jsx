import React, {useEffect} from 'react';
import Banner from '../Banner/Banner';
import ProductsCarousel from "../ProductCarousel/ProductsCarousel";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../store/products/productsSlice";
import {Loader} from "../common";


const Home = () => {
    const {productList} = useSelector(state => state.products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts(''))
    }, [dispatch])

    if(!productList){
        return <Loader/>
    }
    return (
        <div>
            <Banner/>
            <ProductsCarousel list={productList} title={"Bestsellers"}/>
            <ProductsCarousel list={productList} title={"Top Fiction Books"}/>
            <ProductsCarousel list={productList} title={"Top Non-Fiction Books"}/>
        </div>
    );
};

export default Home;