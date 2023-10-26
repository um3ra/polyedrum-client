import React from 'react';
import Product from "../Product/Product";
import {SwiperSlide, Swiper} from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './ProductsCarousel.module.css';

const ProductsCarousel = ({list, title}) => {
    return (
        <div className={"fix-wrapper"}>
            <div className={styles.collectionBlockTitle}>
                {title}
            </div>
            <Swiper spaceBetween={30}
                    slidesPerView={4}
                    pagination={{
                        type: 'progressbar',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    breakpoints={{
                        992: {
                            slidesPerView: 4
                        },

                        768: {
                            slidesPerView: 3
                        },

                        442: {
                            slidesPerView: 2
                        },

                        0: {
                            slidesPerView: 1
                        },
                    }}
            >
                {
                    list.map((product) => {
                        return <SwiperSlide key={product.id}>
                            <div className={styles.productsContainer}>
                                <Product id={product.id}
                                         author={product.author}
                                         title={product.title}
                                         price={product.price}
                                         img={product.img}/>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>

        </div>
    );
};

export default ProductsCarousel;