import React from "react";
import BANNER1 from "../../images/banner--ai4.jpg";
import BANNER2 from "../../images/banner--ai1.png";
import BANNER3 from "../../images/banner--ai3.png";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import styles from "./Banner.module.css";

const Banner: React.FC = () => {
    return (
        <div>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                speed={1000}
                modules={[Pagination, Autoplay]}
                loop={true}
            >
                <SwiperSlide>
                    <div className={styles.bannerContainer}>
                        <Link to={"collections/all"}>
                            <img src={BANNER1} alt="banner" />
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.bannerContainer}>
                        <Link to={"collections/all"}>
                            <img src={BANNER2} alt="banner" />
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.bannerContainer}>
                        <Link to={"collections/all"}>
                            <img src={BANNER3} alt="banner" />
                        </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
