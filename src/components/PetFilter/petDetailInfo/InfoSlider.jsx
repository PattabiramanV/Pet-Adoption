import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './InfoSlider.css';
export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (

    <>
      <Slider {...settings}>
        <div className="slider-info">
          <img src="/src/assets/Bulldog.jpg" alt="" />
        </div>
        <div className="slider-info">
          <img src="/src/assets/Bulldog.jpg" alt="" />
        </div>
        <div className="slider-info">
          <img src="/src/assets/Bulldog.jpg" alt="" />
            </div>
        <div>
          <img src="/src/assets/Bulldog.jpg" alt="" />
               </div>
        <div className="slider-info">
          <img src="/src/assets/Bulldog.jpg" alt="" />
          </div>
        <div className="slider-info">
          <img src="/src/assets/Bulldog.jpg" alt="" />
           </div>
      </Slider>
    </>



  );
}