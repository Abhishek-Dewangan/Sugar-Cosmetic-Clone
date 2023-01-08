import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './product.module.css';

import {Pagination, Navigation} from 'swiper';
import axios from 'axios';
import {Box, Img} from '@chakra-ui/react';
import {useSelector} from 'react-redux';

export default function Products({arr, type}) {
  const {currentUser} = useSelector((state) => state.user);
  var uid = currentUser ? currentUser._id : '';
  const addToCart = async (el) => {
    if (uid) {
      axios.post(`http://localhost:8080/api/cart`, {
        userId: uid,
        productId: el._id,
        quantity: 1,
      });
      toast.success('Added to cart!');
    } else toast.error('Please signin first');
  };

  arr = arr.filter((elm) => elm.category === type);

  return (
    <Box>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={0}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={styles.ProductSwiper}
        id='productsSlider'
        breakpoints={{
          500: {
            slidesPerView: 1,
            spaceBetween: 10,
            slidesPerGroup: 1,
            centeredSlides: true,
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 2,
          },

          '@1.25': {
            slidesPerView: 3,
            spaceBetween: 40,
            slidesPerGroup: 3,
          },
          '@1.75': {
            slidesPerView: 4,
            spaceBetween: 50,
            slidesPerGroup: 4,
          },
        }}
      >
        {arr.map((elm, index) => (
          <SwiperSlide key={index}>
            <Box mb={10} className={styles.productsDiv_individual_home_first}>
              <Img src={elm.ImageUrl} />
              <p className={styles.title_products_home}>{elm.Title}</p>
              <div className={styles.currencyDiv_products_home}>
                <div>
                  {elm.strikePrice && <strike> {elm.strikePrice}</strike>}
                </div>
                <div>
                  <p>{elm.Currency}</p>
                  <p>{elm.Price}</p>
                </div>
                <div className={styles.discount}>
                  {' '}
                  {elm.discount && <p> ({elm.discount}% Off )</p>}{' '}
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart(elm);
                }}
                className={styles.addDiv_home}
              >
                ADD TO CART
              </button>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}
