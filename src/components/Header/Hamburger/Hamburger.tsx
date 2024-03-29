import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useGetCategoriesQuery } from "../../../store/category/categoryAPI";
import HamburgerSubMenu from "./HamburgerSubMenu";
import { Button, Modal } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Hamburger.module.css";
import CartContent from "../../Cart/CartContent/CartContent";

interface HamburgerProps {
    token: string | null;
    email?: string;
    logout: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ token, email, logout }) => {
    const [showMenu, setShowMenu] = useState(false);
    const { data: categoryData } = useGetCategoriesQuery(null);
    const [showCartContent, setShowCartContent] = useState(false);
    const navigate = useNavigate();

    const handleCartClick = () => {
        if (token) {
            setShowCartContent(!showCartContent);
        } else {
            navigate("login");
        }
    };
    return (
        <div className={styles.hamburger}>
            <div
                onClick={() => setShowMenu(!showMenu)}
                className={styles.hamburgerIcon}
            >
                <AiOutlineMenu size={"3em"} color={"#fff"} />
            </div>
            <CSSTransition
                in={showMenu}
                timeout={700}
                classNames={{
                    enterActive: styles.hamburgerMenuEnterActive,
                    enterDone: styles.hamburgerMenuEnterDone,
                    exitActive: styles.hamburgerMenuExitActive,
                    exitDone: styles.hamburgerMenuExit
                }}
                unmountOnExit
            >
                <>
                    <nav className={styles.hamburgerMenu}>
                        <div>
                            {email ? (
                                <h3>
                                    <Link to={"profile"}>Your profile</Link>
                                </h3>
                            ) : (
                                <h3>You are not logged in</h3>
                            )}
                            <div className={styles.hamburgerMenuBtn}>
                                {!token ? (
                                    <Link to={"/login"}>
                                        <Button>Login</Button>
                                    </Link>
                                ) : (
                                    <Button onClick={logout}>Logout</Button>
                                )}
                                <Button onClick={handleCartClick}>Cart</Button>
                            </div>
                            {token && (
                                <Modal
                                    callback={() => setShowCartContent(false)}
                                    active={showCartContent}
                                >
                                    <CartContent />
                                </Modal>
                            )}
                            <h2>
                                <Link to={"collections/all"}>Books</Link>
                            </h2>
                            <div className={styles.booksBlock}>
                                {categoryData?.data?.map((category) => {
                                    return (
                                        <HamburgerSubMenu
                                            key={category.id}
                                            title={category.name}
                                            genresList={category.genres}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </nav>
                    <div
                        onClick={() => setShowMenu(false)}
                        className={styles.hamburgerMenuOverlay}
                    />
                </>
            </CSSTransition>
        </div>
    );
};

export default Hamburger;
