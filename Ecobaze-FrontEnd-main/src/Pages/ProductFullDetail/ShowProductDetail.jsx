import { useEffect, useState } from "react";
import { GoStar } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../Redux/Slices/productSlices";
import { Footer } from "../../Components";
import { addToCart } from "../../Redux/Slices/cartSlices";
import { toast } from "react-toastify";

const buttons = [
  {
    label: "Description",
  },
  {
    label: "Additional Information",
  },
  {
    label: "Customer Feedback",
  },
];

const ShowProductDetail = () => {
  const [isActive, setIsActive] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  const { product } = useSelector((state) => state?.products);

  const handleaddproduct = (productId, price) => {
    dispatch(addToCart({ productId, price, quantity }));
  };

  const { isAdded, isError, message } = useSelector(
    (state) => state?.cartSlices
  );

  useEffect(() => {
    if (isAdded && message?.message) {
      toast.success(message.message);
    }
    if (isError) {
      toast.error(isError?.response?.statusText || "Error processing cart");
    }
  }, [isAdded, isError, message]);

  if (!product) return null;

  return (
    <>
      <div className="w-full h-full flex flex-col items-start justify-between mt-7 font-Poppins">
        <div className="w-full h-full flex flex-col items-start justify-between px-6 lg:px-20">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 bg-white items-start">
            <div className="bg-gray-50 flex items-center justify-center rounded-3xl overflow-hidden p-10 lg:p-20 border border-gray-100 shadow-inner">
              <img
                src={product.image}
                alt="Product"
                className="w-full max-w-[350px] object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="py-2 flex flex-col items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="flex items-center justify-start text-3xl font-bold gap-4">
                  {product.name}
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {product.stock ? "In Stock" : "Out Of Stock"}
                  </span>
                </h1>
                <div className="flex justify-start items-center gap-1 text-orange-400">
                  <GoStar />
                  <GoStar />
                  <GoStar />
                  <GoStar />
                  <GoStar />
                  <p className="ml-3 text-gray-500 text-sm italic font-medium">4 Reviews</p>
                </div>
              </div>

              <h2 className="text-4xl font-black text-green-600">
                ${product?.price}
              </h2>

              <div className="w-full border-t border-b border-gray-100 py-6 my-2">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product?.description}
                </p>
              </div>

              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div className="w-full sm:w-auto flex items-center justify-between bg-gray-50 rounded-full border border-gray-200 p-2 gap-6 min-w-[140px]">
                  <button
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all font-bold disabled:opacity-50"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity < 2}
                  >
                    -
                  </button>
                  <p className="font-bold text-lg">{quantity}</p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all font-bold disabled:opacity-50"
                    disabled={quantity > 10}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleaddproduct(product?._id, product?.price, quantity)}
                  className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full py-4 px-8 font-bold transition-all shadow-lg shadow-green-600/20"
                >
                  Add to cart
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-gray-500 font-medium">Category:</span>
                <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-bold text-gray-700 uppercase tracking-tighter">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mt-20 sm:hidden">
            <div className="w-full flex items-center justify-center gap-10 border-b border-gray-100">
              {buttons.map((link, index) => {
                return (
                  <button
                    className={`${
                      isActive === index 
                        ? "border-green-600 text-green-600 font-bold" 
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    } border-b-4 pb-4 transition-all text-xl px-2`}
                    key={index}
                    onClick={() => setIsActive(index)}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-start justify-center w-full py-12">
              <div className="max-w-3xl text-gray-600 text-lg leading-relaxed">
                <div className={`${isActive === 0 ? "block" : "hidden"} `}>
                  {product?.description}
                </div>
                <div className={`${isActive === 1 ? "block" : "hidden"}`}>
                  <p>Additional technical details and product parameters can be found here.</p>
                </div>
                <div className={`${isActive === 2 ? "block" : "hidden"}`}>
                  <p>Read what our customers are saying about this product.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden w-full flex flex-col gap-6 mt-12 bg-gray-50 p-6 rounded-3xl">
            {buttons.map((btn, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-xl text-gray-900 mb-3">{btn.label}</h3>
                <p className="text-gray-600">
                  {idx === 0 ? product.description : "Information for this section is coming soon."}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ShowProductDetail;
