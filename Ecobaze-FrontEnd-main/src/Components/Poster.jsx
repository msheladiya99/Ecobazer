import { GoArrowRight } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { posterimage, posterimage2, posterimage3 } from "../assets/index";
import {Link} from "react-router-dom"

const Poster = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 5,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    fade: true,
    cssEase: "linear",
    accessibility: true,
  };
  return (
    <div className="w-full bg-gray-100 rounded-3xl mt-8 font-Poppins overflow-hidden">
      <Slider {...settings} className="w-full h-full">
        {/* Slide 1 */}
        <div className="w-full relative min-h-[400px] flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-10">
            <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left gap-4 relative z-20 w-full lg:w-1/2">
              <p className="text-xs lg:text-sm font-bold text-green-600 tracking-widest uppercase">
                WELCOME TO ECOBAZAR
              </p>
              <h1 className="text-3xl lg:text-6xl font-black text-gray-900 leading-tight">
                Fresh & Healthy <br className="hidden lg:block" /> Organic Food
              </h1>
              <Link to="/shop" className="group flex items-center gap-3 justify-center text-white border-2 border-green-600 bg-green-600 rounded-full py-4 px-10 hover:bg-white hover:text-green-600 transition-all font-bold shadow-lg shadow-green-600/20">
                Shop now <GoArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10">
              <img src={posterimage} alt="" className="w-[300px] lg:w-[450px] object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="w-full relative min-h-[400px] flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-10">
            <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left gap-4 relative z-20 w-full lg:w-1/2">
              <p className="text-xs lg:text-sm font-bold text-green-600 tracking-widest uppercase">
                SEASONAL OFFERS
              </p>
              <h1 className="text-3xl lg:text-6xl font-black text-gray-900 leading-tight">
                Quality Groceries <br className="hidden lg:block" /> Every Day
              </h1>
              <Link to="/shop" className="group flex items-center gap-3 justify-center text-white border-2 border-green-600 bg-green-600 rounded-full py-4 px-10 hover:bg-white hover:text-green-600 transition-all font-bold shadow-lg shadow-green-600/20">
                Explore <GoArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10">
              <img src={posterimage2} alt="" className="w-[280px] lg:w-[400px] object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="w-full relative min-h-[400px] flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-10">
            <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left gap-4 relative z-20 w-full lg:w-1/2">
              <p className="text-xs lg:text-sm font-bold text-green-600 tracking-widest uppercase">
                FAST DELIVERY
              </p>
              <h1 className="text-3xl lg:text-6xl font-black text-gray-900 leading-tight">
                Direct From <br className="hidden lg:block" /> Local Farmers
              </h1>
              <Link to="/shop" className="group flex items-center gap-3 justify-center text-white border-2 border-green-600 bg-green-600 rounded-full py-4 px-10 hover:bg-white hover:text-green-600 transition-all font-bold shadow-lg shadow-green-600/20">
                Order Now <GoArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10">
              <img src={posterimage3} alt="" className="w-[300px] lg:w-[450px] object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Poster;
