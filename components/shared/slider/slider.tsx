'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { SliderNavigationButtons } from './slider-navigation-buttons';
import { SliderDefaultIcon } from './slider-default-icon';
import type { SwiperProps } from '@/types/swiper'

import 'swiper/css';
import 'swiper/css/navigation';

export const Slider: React.FC<SwiperProps> = ({
  slidesPerView = 'auto',
  spaceBetween = 20,
  speed = 300,
  loop = true,
  autoplayEnabled = true,
  delay = 5000,
  reverseDirection = false,
  breakpoints,
  children,
  navButtonStyle = {},
  leftButtonStyle = {},
  rightButtonStyle = {},
  leftButtonIcon,
  rightButtonIcon,
  style = {}
}) => {

  const defaultBreakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10 },
    768: { slidesPerView: 2, spaceBetween: 15 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
    1440: { slidesPerView: 4, spaceBetween: 25 },
    1920: { slidesPerView: 5, spaceBetween: 30 },
    2560: { slidesPerView: 6, spaceBetween: 40 }, 
  }

  return (
    <div style={{ ...style, margin: '0 auto'}}>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        speed={speed}
        loop={loop}
        autoplay={autoplayEnabled ? { delay, reverseDirection } : false}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        modules={[Autoplay, Navigation]}
        breakpoints={breakpoints || defaultBreakpoints}
        slidesPerGroup={1}
      >
        {React.Children.map(children, (child) => (
          <SwiperSlide style={{ width: 'auto' }}>  {/*Иначе слайды бы выходили за рамки контейнера и появлялся горизонт скролл*/}
            {child}
          </SwiperSlide>
        ))}
        
        <SliderNavigationButtons 
          leftIcon={leftButtonIcon || <SliderDefaultIcon />}
          rightIcon={rightButtonIcon || <SliderDefaultIcon />}
          navButtonStyle={navButtonStyle}
          leftButtonStyle={leftButtonStyle}
          rightButtonStyle={rightButtonStyle}
        />
      </Swiper>
    </div>
  )
}