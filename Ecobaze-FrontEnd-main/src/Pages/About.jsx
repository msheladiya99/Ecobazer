// About Page content
import { Footer } from "../Components";

import {
  aboutPhoto1,
  aboutPhoto2,
  aboutPhoto3,
  leaf,
  headCall,
  packageicon,
  shoppingbag,
  stars,
  truck,
} from "../assets/AboutAssets";

const About = () => {
  return (
    <div className="w-full flex flex-col items-start justify-between gap-6">
      <div className="w-full flex flex-col justify-between items-start gap-10 px-6 lg:px-20 mt-3 font-Poppins overflow-hidden">
        {/* Componenet 1 */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="w-full lg:w-1/2">
            <img src={aboutPhoto1} alt="" className="w-full object-cover rounded-2xl" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              100% Trusted <br className="hidden md:block" /> Organic Food Store
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              praesentium voluptas ratione deleniti architecto nemo at atque!
              Similique, aperiam quam, eligendi optio vero iste aliquam dolorum
              natus amet voluptatibus facere magni laudantium. Magni quibusdam,
              incidunt possimus expedita vitae fugit id!
            </p>
          </div>
        </div>

        {/* Componenet 2 */}
        <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-10 bg-gray-50 rounded-3xl p-6 lg:p-12">
          <div className="w-full lg:w-1/2 flex flex-col justify-between items-start gap-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Quality Healthy <br className="hidden md:block" /> Organic Solutions
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              praesentium voluptas ratione deleniti architecto nemo at atque!
              Similique, aperiam quam.
            </p>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { img: leaf, title: "100% Organic food", desc: "100% healthy & Fresh food." },
                { img: headCall, title: "Great Support 24/7", desc: "Instant access to Contact" },
                { img: stars, title: "Customer Feedback", desc: "Our happy customer" },
                { img: shoppingbag, title: "100% Secure Payment", desc: "We ensure your money is safe" },
                { img: truck, title: "Free Shipping", desc: "Free shipping with discount." },
                { img: packageicon, title: "100% Organic food", desc: "100% healthy & Fresh food." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-green-100 p-3 rounded-full group-hover:bg-green-600 transition-all duration-300">
                    <img src={item.img} alt="" className="w-full group-hover:brightness-0 group-hover:invert" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-green-600">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img src={aboutPhoto2} alt="" className="w-full object-cover rounded-2xl" />
          </div>
        </div>

        {/* Componenet 3 */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              We Delivered, You <br className="hidden md:block" /> Enjoy Your Order.
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              praesentium voluptas ratione deleniti architecto nemo at atque!
              Similique, aperiam quam, eligendi optio vero iste aliquam dolorum
              natus amet voluptatibus facere magni laudantium. Magni quibusdam,
              incidunt possimus expedita vitae fugit id!
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <img src={aboutPhoto3} alt="" className="w-full object-cover rounded-2xl" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
