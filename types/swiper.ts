export interface SwiperProps {
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  speed?: number;
  loop?: boolean;
  autoplayEnabled?: boolean;
  delay?: number;
  reverseDirection?: boolean;
  breakpoints?: {
    [width: number]: {
      slidesPerView?: number | 'auto';
      spaceBetween?: number;
    };
    [ratio: string]: {
      slidesPerView?: number | 'auto';
      spaceBetween?: number;
    };
  };
  children?: React.ReactNode;
  navButtonStyle?: React.CSSProperties;
  leftButtonStyle?: React.CSSProperties;
  rightButtonStyle?: React.CSSProperties;
  leftButtonIcon?: React.ReactNode;
  rightButtonIcon?: React.ReactNode;
  maxSlideWidth?: number;
  style?: React.CSSProperties;
}
