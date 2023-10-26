import React, {useState} from 'react';
import styles from "./Hamburger.module.css";
import {useNavigate} from "react-router-dom";

const HamburgerSubMenu = ({genresList, title}) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    return (
        <ul>
            <h4 onClick={() => setShowMenu(!showMenu)} className={styles.hamburgerMenuListTitle}>{title}</h4>
            {showMenu &&
                genresList.slice(0, 5).map(genre => {
                    return (
                        <li onClick={() => navigate(`collections/genre/${genre.name}`)}
                            className={styles.hamburgerMenuListItem} key={genre.id}>
                            <span>{genre.name}</span>
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default HamburgerSubMenu;