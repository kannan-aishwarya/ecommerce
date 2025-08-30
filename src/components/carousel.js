import React from "react";
import Slider from "react-slick";
import image1 from "../assets/image1.png";
import "./carousel.css";

function Carousel()  {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,       
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
       };
    return(
        <div className="carousel">
            <Slider {...settings}>
                <div>
                    <img src={image1} />
                </div>
                <div>
                    <img src={image1} />
                </div>
                <div>
                    <img src={image1} />
                </div>
            </Slider>
        </div>
    );
 }

 export default Carousel;