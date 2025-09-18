'use client'

import { useSwiper } from "swiper/react";

export const SliderNavigationButtons = ({
  leftIcon,
  rightIcon,
  navButtonStyle,
  leftButtonStyle,
  rightButtonStyle
}: {
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  navButtonStyle: React.CSSProperties;
  leftButtonStyle: React.CSSProperties;
  rightButtonStyle: React.CSSProperties;
}) => {
  const swiper = useSwiper();
  
  const mergedLeftStyle = {
    ...navButtonStyle,
    ...leftButtonStyle,
  }

  const mergedRightStyle = {
    ...navButtonStyle,
    ...rightButtonStyle,
  }

  return (
    <div className="swiper-buttons">
      <button 
        className='swiper-button-prev [&::after]:hidden rotate-180 hidden md:block 2k:!w-10 4k:!w-14 8k:!w-28 2k:!h-10 4k:!h-14 8k:!h-28'
        style={mergedLeftStyle}
        onClick={() => swiper.slidePrev()}
      >
        {leftIcon}
      </button>
      <button 
        className='swiper-button-next [&::after]:hidden hidden md:block 2k:!w-10 4k:!w-14 8k:!w-28 2k:!h-10 4k:!h-14 8k:!h-28'
        style={mergedRightStyle}
        onClick={() => swiper.slideNext()}
      >
        {rightIcon}
      </button>
    </div>
  )
}