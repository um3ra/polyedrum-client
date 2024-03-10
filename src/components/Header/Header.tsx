import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import SEARCH from "../../images/icon/search.svg";
import Cart from "../Cart/Cart";
import LOGO from "../../images/icon/logo_b.svg";
import { Button } from "../ui";
import { useLazyGetUserProfileQuery } from "../../store/user/userAPI";
import { resetAuthData } from "../../store/auth/authSlice";
import Nav from "../Nav/Nav";
import { rootAPI } from "../../store/api/rootAPI";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import Hamburger from "./Hamburger/Hamburger";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setSearch } from "../../store/products/productsSlice";
import { useAppDispatch } from "../../store/store";

const Header = () => {
    const dispatch = useAppDispatch();
    const token = useTypedSelector((state) => state.auth.token);
    const destination = useTypedSelector(
        (state) => state.products.filter.destination
    );
    const isLoading = useTypedSelector((state) => state.products.loading);
    const [getProfile, { data: profileData }] = useLazyGetUserProfileQuery();
    const [searchInputValue, setSearchInputValue] = useState(destination);
    const { isMobile } = useMatchMedia();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (token) {
            getProfile(null);
        }
    }, [token]);

    useEffect(() => {
        if (!pathname.startsWith("/collections/all")) {
            setSearchInputValue("");
            dispatch(setSearch({ destination: "" }));
        }
    }, [pathname]);

    const logoutUser = () => {
        dispatch(resetAuthData());
        dispatch(rootAPI.util.resetApiState());
        navigate("/");
    };

    const handleSearchClick = () => {
        navigate("/collections/all");
        dispatch(setSearch({ destination: searchInputValue }));
    };

    const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    };

    return (
        <header>
            <div className={styles.mainHeader}>
                <div className={`${styles.headerBlock} fix-wrapper`}>
                    <div className={styles.headerBlockLogo}>
                        <Link to={"/"}>
                            <img src={LOGO} alt="book-logo" />
                        </Link>
                    </div>

                    {isMobile ? (
                        <Hamburger
                            logout={logoutUser}
                            token={token}
                            email={profileData?.data?.email}
                        />
                    ) : (
                        <>
                            <div className={styles.headerBlockSearch}>
                                <label>
                                    <input
                                        onChange={(e) => changeSearchValue(e)}
                                        value={searchInputValue}
                                        placeholder="search"
                                        name="keyword"
                                    />
                                    <button
                                        disabled={isLoading}
                                        onClick={(_) => handleSearchClick()}
                                        className={`${styles.headerBlockSearch} ${styles.searchButton}`}
                                    >
                                        <img src={SEARCH} alt="search" />
                                    </button>
                                </label>
                            </div>
                            <div className={styles.headerInnerBlock}>
                                {token && (
                                    <Link to={"/profile"}>
                                        <span className={styles.userName}>
                                            Account
                                        </span>
                                    </Link>
                                )}
                                <div className={styles.headerBlockCart}>
                                    <Cart />
                                </div>
                                <div className={styles.headerBlockLogin}>
                                    {!token ? (
                                        <Link to={"/login"}>
                                            <Button>Login</Button>
                                        </Link>
                                    ) : (
                                        <Button onClick={logoutUser}>
                                            Logout
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Nav />
        </header>
    );
};

export default Header;
