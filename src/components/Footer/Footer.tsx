import React from 'react';
import {BsFacebook, BsInstagram, BsTwitter, BsTelegram} from "react-icons/bs"
import {Button, Input} from "../common";
import LOGO from "../../images/icon/logo_b.svg"
import {Link} from "react-router-dom";
import {useGetCategoriesQuery} from "../../store/category/categoryAPI";
import styles from './Footer.module.css';


const Footer: React.FC = () => {
   const {data: categoryData} = useGetCategoriesQuery(null);

    return (
        <footer className={styles.footer}>
            <div className={styles.footerLogo}>
                <Link to={"/"}><img src={LOGO} alt={'logo'}/></Link>
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.footerBlock}>
                    <h3>Shop</h3>
                    <ul>
                        <li><Link to={"collections/all"}>Highlights</Link></li>
                        {categoryData?.data?.slice(0, 3).map(category => {
                            return <li key={category.id}>
                                <Link to={`collections/category/${category.name}`}>
                                    {category.name} Books
                                </Link>
                            </li>
                        })}
                        <li><Link to={"collections"}>Rare Books</Link></li>
                    </ul>
                </div>
                <div className={styles.footerBlock}>
                    <h3>Other links</h3>
                    <ul>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div className={styles.footerBlock}>
                    <h3>Help and Contact</h3>
                    <ul>
                        <li><a href="#">Delivery</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <form className={styles.signInForm}>
                        <Input type="text" placeholder={"enter your email address"}/>
                        <Button>sign in</Button>
                    </form>
                    <ul className={styles.socialMedia}>
                        <li><a className={styles.socialMediaLink} href="https://www.facebook.com/"><BsFacebook/></a></li>
                        <li><a className={styles.socialMediaLink} href="https://www.instagram.com/"><BsInstagram/></a></li>
                        <li><a className={styles.socialMediaLink} href=""><BsTwitter/></a></li>
                        <li><a className={styles.socialMediaLink} href=""><BsTelegram/></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;