import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from "../Home/Home";
import BooksPage from "../BooksPage/BooksPage";
import LoginForm from "../Auth/LoginForm/LoginForm";
import SingleBookPage from "../SingleBookPage/SingleBookPage";
import RegisterForm from "../Auth/RegisterForm/RegisterForm";
import Profile from "../Profile/Profile";
import PersonalDetails from "../Profile/PersonalDetails";
import MyAccount from "../Profile/MyAccount";
import OrdersHistory from "../Profile/OrdersHistory";
import AdminPage from "../Admin/AdminPage";
import AdminUsersPage from "../Admin/AdminUsers/AdminUsersPage";
import AdminPageProducts from "../Admin/AdminProducts/AdminPageProducts";
import CreateProduct from "../Admin/AdminProducts/CreateProduct";
import EditProductPage from "../Admin/AdminProducts/EditProductPage";
import AdminCategoriesPage from "../Admin/AdminCategories/AdminCategoriesPage";
import EditCategoryPage from "../Admin/AdminCategories/EditCategoryPage";
import CreateCategory from "../Admin/AdminCategories/CreateCategory";
import AdminGenrePage from "../Admin/AdminGenres/AdminGenrePage";
import CreateGenre from "../Admin/AdminGenres/CreateGenre";
import EditGenrePage from "../Admin/AdminGenres/EditGenrePage";
import Checkout from "../Checkout/Checkout";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route path={"/collections/*"} element={<BooksPage/>}/>
            <Route path={"/login"} element={<LoginForm/>}/>
            <Route path={"/register"} element={<RegisterForm/>}/>
            <Route path={'/products/:productName'} element={<SingleBookPage/>}/>
            <Route path={"/profile"} element={<Profile/>}>
                <Route index element={<MyAccount/>}/>
                <Route path={'personal-details'} element={<PersonalDetails/>}/>
                <Route path={'orders-history'} element={<OrdersHistory/>}/>
            </Route>
            <Route path={"admin-panel"} element={<AdminPage/>}>
                <Route path={"users"} element={<AdminUsersPage/>}/>
                <Route path={"products"} element={<AdminPageProducts/>}/>
                <Route path={'products/create-product'} element={<CreateProduct/>}/>
                <Route path={'products/update-product/:productName'} element={<EditProductPage/>}/>
                <Route path={'categories'} element={<AdminCategoriesPage/>}/>
                <Route path={'categories/create-category'} element={<CreateCategory/>}/>
                <Route path={'categories/update-category/:categoryName'} element={<EditCategoryPage/>}/>
                <Route path={'genres'} element={<AdminGenrePage/>}/>
                <Route path={'genres/create-genre'} element={<CreateGenre/>}/>
                <Route path={'genres/update-genre/:genreName'} element={<EditGenrePage/>}/>
            </Route>
            <Route path={"checkout"} element={<Checkout/>}/>
        </Routes>
    );
};

export default AppRouter;