import React, { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BannerProduct() {
    const [photoData, setPhotoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/categories');
                const filteredCategories = response.data.categories.filter((photo) => photo.bannerPhoto !== null);
                setPhotoData(filteredCategories); 
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);

    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', 1 - progress);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    return (
        <div className='w-full h-[20rem] flex items-center relative rounded-2xl'>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ type: 'progressbar' }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="swiper1"
            >
                {
                    photoData.map((photo, index) => (
                        <SwiperSlide key={index} className='swiper-slide1 rounded-2xl'>
                            <Link to={`/product-category?category=${photo._id}`} className='flex w-full h-full z-10 rounded-2xl'>
                                <img src={photo.bannerPhoto} alt={photo.name} className="  w-full h-full lg:object-fill object-cover rounded-2xl" />
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </div>
    );
}

export default BannerProduct;
