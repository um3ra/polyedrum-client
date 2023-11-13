import React, {useState} from 'react';
import styles from "./Facet.module.css";
import CheckBox from "../common/CheckBox/CheckBox";
import {MdKeyboardArrowDown} from "react-icons/md"
import {useNavigate} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IGenre} from "../../@types/genreType";
import {IAuthor} from "../../@types/productType";

interface FacetItemProps {
    title: string
    sortType: string
    list: IGenre[] | IAuthor[]
}

const FacetItem: React.FC<FacetItemProps> = ({title, list, sortType}) => {
    const currentSelection = useTypedSelector(state => state.products.filter.currentSelection);
    const [visibleList, setVisibleList] = useState(false);
    const navigate = useNavigate();

    return (
        <div onDoubleClick={() => navigate(`category/${title}`)} onClick={() => setVisibleList(!visibleList)}
             className={styles.facet}>
            <div>
                <div className={styles.facetTitle}>
                    {title}
                </div>
                <CSSTransition
                    in={visibleList}
                    unmountOnExit
                    timeout={500}
                    classNames={{
                        enterActive: styles.facetListEnterActive,
                        enterDone: styles.facetListEnterDone,
                        exitActive: styles.facetListExitActive,
                        exitDone: styles.facetListExitDone
                    }}>
                    <div onClick={e => e.stopPropagation()} className={styles.facetList}>
                        <ul>
                            {list.map((list) => {
                                return (
                                    <li onClick={() => navigate(`${sortType}/${list.name}`)} key={list.id}>
                                        <CheckBox checked={currentSelection.selectionName === list.name}
                                                  title={list.name}/>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </CSSTransition>
            </div>
            <div className={styles.facetCollapse}>
                <div className={`${styles.facetCollapseButton} ${visibleList && styles.active}`}>
                    <MdKeyboardArrowDown/>
                </div>
            </div>
        </div>
    );
};

export default FacetItem;