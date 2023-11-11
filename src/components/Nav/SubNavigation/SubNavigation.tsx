import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import styles from "./SubNavigation.module.css";
import {IGenre} from "../../../@types/genreType";

interface SubNavigationProps {
    genres: IGenre[]
    title: string
}

const SubNavigation: React.FC<SubNavigationProps> = ({genres, title}) => {
    const [showNav, setShowNav] = useState(false);
    const [isExit, setIsExit] = useState(true);

    const subNavEnter = () => {
        if (isExit){
            setShowNav(true);
            setIsExit(false);
        }
    }
    return (
        <div className={styles.primaryNavigationItem}
             onMouseLeave={() => setShowNav(false)}
             onMouseEnter={subNavEnter}>
            <Link onMouseEnter={e => e.stopPropagation()} to={`collections/category/${title}`}>
                {title}
            </Link>

            <CSSTransition
                in={showNav}
                classNames={{
                    enterActive: styles.subNavigationEnterActive,
                    enterDone: styles.subNavigationEnterDone,
                    exitActive: styles.subNavigationExitActive,
                    exitDone: styles.subNavigationExitDone
                }}
                timeout={{
                    exit: 300,
                }}
                onExited={() => {
                    setIsExit(true)
                }}
                unmountOnExit
            >
                <div className={`${styles.subNavigation} fix-wrapper`}>
                    <div className={styles.subNavigationContainer}>
                        <div className={styles.subNavigationTitle}>
                            <span>
                                Top {title} Books
                            </span>
                        </div>
                        <ul className={`${styles.subNavigationList} menu-list`}>
                            {genres.slice(0, 5).map(genre => {
                                return (
                                    <li key={genre.id}>
                                        <Link to={`collections/genre/${genre.name}`}>
                                            {genre.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className={styles.subNavigationContainer}>
                        <div className={styles.subNavigationTitle}>
                            <span>
                                Special Features
                            </span>
                        </div>
                        <ul className={`${styles.subNavigationList} menu-list`}>
                            <li>
                                <Link to={"collections/genre?under=5"}>
                                    {title} books under $4.99
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.subNavigationContainer}>
                        <div className={styles.subNavigationTitle}>
                            <span>
                                Bestsellers
                            </span>
                        </div>
                        <ul className={`${styles.subNavigationList} menu-list`}>
                            {genres.slice(0, 5).map(genre => {
                                return(
                                    <li key={genre.id}>
                                        <Link to={`collections/genre/${genre.name}`}>
                                            {genre.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default SubNavigation;