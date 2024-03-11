import { useEffect } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getAllProducts } from "../../../store/products/productsSlice";
import { useAppDispatch } from "../../../store/store";
import Banner from "../../Banner/Banner";
import ProductsCarousel from "../../ProductCarousel/ProductsCarousel";
import { SecondLoader } from "../../ui";

const Home = () => {
    const productList = useTypedSelector((state) => state.products.productList);
    const isLoading = useTypedSelector((state) => state.products.loading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllProducts({}));
    }, [dispatch]);

    if (!productList || isLoading) {
        return <SecondLoader />;
    }

    return (
        <div>
            <Banner />
            <ProductsCarousel list={productList} title={"Bestsellers"} />
            <ProductsCarousel list={productList} title={"Top Fiction Books"} />
            <ProductsCarousel
                list={productList}
                title={"Top Non-Fiction Books"}
            />
        </div>
    );
};

export default Home;
