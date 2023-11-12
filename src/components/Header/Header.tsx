import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './Header.module.css';
import SEARCH from '../../images/icon/search.svg'
import Cart from "../Cart/Cart";
import LOGO from "../../images/icon/logo_b.svg"
import {Button} from "../common";
import {useDispatch} from "react-redux";
import {useLazyGetUserProfileQuery} from "../../store/user/userAPI";
import {resetAuthData} from "../../store/auth/authSlice";
import Nav from "../Nav/Nav";
import {rootAPI} from "../../store/api/rootAPI";
import {useMatchMedia} from "../../hooks/useMatchMedia";
import Hamburger from "./Hamburger/Hamburger";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const token = useTypedSelector(state => state.auth.token);
    const [getProfile, {data: profileData}] = useLazyGetUserProfileQuery();
    const { isMobile } = useMatchMedia();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(resetAuthData());
        dispatch(rootAPI.util.resetApiState());
        navigate('/');
    }

    useEffect(() => {
        if (token){
            getProfile(null);
        }
    }, [token])

    return (
        <header>
            <div className={styles.mainHeader}>
                <div className={`${styles.headerBlock} fix-wrapper`}>
                    <div className={styles.headerBlockLogo}>
                        <Link to={"/"}>
                            <img src={LOGO} alt="book-logo"/>
                        </Link>
                    </div>

                    {isMobile ?
                        <Hamburger logout={logoutUser} token={token} email={profileData?.data?.email}/>
                        :
                        <>
                            <div className={styles.headerBlockSearch}>
                                <label>
                                    <input placeholder="search" name="keyword"/>
                                    <button className={`${styles.headerBlockSearch} ${styles.searchButton}`}>
                                        <img src={SEARCH} alt="search"/>
                                    </button>
                                </label>
                            </div>
                            <div className={styles.headerInnerBlock}>
                                {token && <Link to={"/profile"}>
                                    <span className={styles.userName}>Account</span>
                                </Link>}
                                <div className={styles.headerBlockCart}>
                                    <Cart/>
                                </div>
                                <div className={styles.headerBlockLogin}>
                                    {!token ?
                                        <Link to={"/login"}>
                                            <Button>Login</Button>
                                        </Link>
                                        :
                                        <Button onClick={logoutUser}>Logout</Button>
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <Nav/>
        </header>
    );
}

export default Header;