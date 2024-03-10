import { Route, Routes } from "react-router-dom";
import AdminCategoriesPage from "../Admin/AdminCategories/AdminCategoriesPage";
import CreateCategory from "../Admin/AdminCategories/CreateCategory";
import EditCategoryPage from "../Admin/AdminCategories/EditCategoryPage";
import AdminGenrePage from "../Admin/AdminGenres/AdminGenrePage";
import EditGenrePage from "../Admin/AdminGenres/EditGenrePage";
import AdminPage from "../Admin/AdminPage";
import AdminPageProducts from "../Admin/AdminProducts/AdminPageProducts";
import CreateProduct from "../Admin/AdminProducts/CreateProduct";
import UpdateProductPage from "../Admin/AdminProducts/UpdateProductPage";
import AdminUsersPage from "../Admin/AdminUsers/AdminUsersPage";
import { NotFound } from "../NotFound/NotFound";
import LoginForm from "../pages/Auth/LoginForm/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm/RegisterForm";
import BooksPage from "../pages/BooksPage/BooksPage";
import Checkout from "../pages/Checkout/Checkout";
import Home from "../pages/Home/Home";
import MyAccount from "../pages/Profile/MyAccount";
import OrdersHistory from "../pages/Profile/OrdersHistory";
import PersonalDetails from "../pages/Profile/PersonalDetails";
import { Profile } from "../pages/Profile/Profile.1";
import SingleBookPage from "../pages/SingleBookPage/SingleBookPage";

const AppRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path={"/collections/*"} element={<BooksPage />} />
			<Route path={"/login"} element={<LoginForm />} />
			<Route path={"/register"} element={<RegisterForm />} />
			<Route
				path={"/products/:productName"}
				element={<SingleBookPage />}
			/>
			<Route path={"/profile"} element={<Profile />}>
				<Route index element={<MyAccount />} />
				<Route
					path={"personal-details"}
					element={<PersonalDetails />}
				/>
				<Route path={"orders-history"} element={<OrdersHistory />} />
			</Route>
			<Route path={"admin-panel"} element={<AdminPage />}>
				<Route index element={<AdminUsersPage />} />
				<Route path={"products"} element={<AdminPageProducts />} />
				<Route
					path={"products/create-product"}
					element={<CreateProduct />}
				/>
				<Route
					path={"products/update-product/:productName"}
					element={<UpdateProductPage />}
				/>
				<Route path={"categories"} element={<AdminCategoriesPage />} />
				<Route
					path={"categories/create-category"}
					element={<CreateCategory />}
				/>
				<Route
					path={"categories/update-category/:categoryName"}
					element={<EditCategoryPage />}
				/>
				<Route path={"genres"} element={<AdminGenrePage />} />
				<Route
					path={"genres/create-genre"}
					element={<EditGenrePage />}
				/>
				<Route
					path={"genres/update-genre/:genreName"}
					element={<EditGenrePage />}
				/>
			</Route>
			<Route path={"checkout"} element={<Checkout />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRouter;
