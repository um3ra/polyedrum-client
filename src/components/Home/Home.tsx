import { useEffect } from "react";
import Banner from "../Banner/Banner";
import ProductsCarousel from "../ProductCarousel/ProductsCarousel";
import { getAllProducts } from "../../store/products/productsSlice";
import { Loader } from "../ui";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../store/store";

const Home = () => {
	const productList = useTypedSelector((state) => state.products.productList);
	const isLoading = useTypedSelector((state) => state.products.loading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllProducts({}));
	}, [dispatch]);

	if (!productList || isLoading) {
		return <Loader />;
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
