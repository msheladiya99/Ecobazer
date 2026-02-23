import { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { GoStar } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slices/cartSlices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from 'prop-types';

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleaddproduct = (productId, price) => {
    dispatch(addToCart({ productId, price }));
  };

  const { isAdded, isError, message } = useSelector(
    (state) => state.cartSlices
  );
  useEffect(() => {
    if (isAdded && message?.message) {
      toast.success(message.message);
    }
    if (isError) {
      const errorMessage = isError.message || isError?.response?.statusText || "Something went wrong adding to cart";
      toast.error(errorMessage);
    }
  }, [isAdded, isError, message]);

  return (
    <>
      <div className="flex flex-col justify-between h-full items-start gap-2 border border-white py-2 px-4 bg-white  hover:border-green-400 hover:shadow-lg cursor-pointer">
        <div
          className="flex justify-center items-center w-full overflow-hidden object-fill"
          onClick={() => navigate(`/showproductdetail/${props.productId}`)}
        >
          <img
            src={props.src}
            alt="Product_Logo"
            className="w-full transition duration-300 hover:scale-110  "
          />
        </div>
        <div className="w-full flex flex-col items-start justify-around gap-[2px] ">
          <div className="flex flex-col">
            <p className="text-green-700 font-Poppins sm:text-xs">
              {props.Product}
            </p>
          </div>
          <div className="w-full flex items-center justify-between rounded-ful z-50">
            <div>
              <p className="font-bold gap-1 sm:text-sm">${props.Price}</p>
              <div className="flex justify-start items-center">
                <GoStar className="sm:text-xs" />
                <GoStar className="sm:text-xs" />
                <GoStar className="sm:text-xs" />
                <GoStar className="sm:text-xs" />
                <GoStar className="sm:text-xs" />
              </div>
            </div>
            <button
              onClick={() => handleaddproduct(props.productId, props.Price)}
              className="bg-[#00B207] p-3 rounded-full  text-white text-2xl border border-white hover:bg-white hover:text-green-500 hover:border-green-700 sm:p-2 sm:text-lg"
            >
              <BsBagCheckFill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
  src: PropTypes.string,
  Product: PropTypes.string,
  Price: PropTypes.number,
};
