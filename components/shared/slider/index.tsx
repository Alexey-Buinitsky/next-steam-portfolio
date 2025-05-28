import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { NavigationButtons } from './navigation-buttons';
import { DefaultIcon } from './default-icon';
import type { SwiperProps } from '@/types/swiper'

import 'swiper/css';
import 'swiper/css/navigation';

const Slider: React.FC<SwiperProps> = ({
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
  };

  return (
    <div style={{
        margin: '0 auto',
        ...style
      }}>
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
          <SwiperSlide style={{ width: 'auto' }}>
            {child}
          </SwiperSlide>
        ))}
        
        <NavigationButtons 
          leftIcon={leftButtonIcon || <DefaultIcon />}
          rightIcon={rightButtonIcon || <DefaultIcon />}
          navButtonStyle={navButtonStyle}
          leftButtonStyle={leftButtonStyle}
          rightButtonStyle={rightButtonStyle}
        />
      </Swiper>
    </div>
  );
};

export default Slider;