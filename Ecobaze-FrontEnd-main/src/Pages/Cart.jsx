import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Footer } from "../Components";
import { Cross, EmptyCart } from "../assets";
import {
  deleteCartItem,
  fetchCartItems,
  updateCart,
} from "../Redux/Slices/cartSlices";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const { cartItems, isDeleted, isUpdated, isLoading, message } = useSelector(
    (state) => state.cartSlices
  );

  useEffect(() => {
    if (isDeleted) {
      dispatch(fetchCartItems());
      if (message?.message) toast.success(message.message);
    }
    if (isUpdated) {
      dispatch(fetchCartItems());
      if (message?.message) toast.success(message.message);
    }
  }, [isDeleted, isUpdated, dispatch, message]);

  const [quantity, setQuantity] = useState({});
  const [totalCartPrice, setTotalCartPrice] = useState(
    cartItems?.user?.cart?.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0) || 0
  );

  const handleRemoveItem = (id) => {
    if (window.confirm("Are You Sure To Delete Item From Cart?")) {
      dispatch(deleteCartItem(id));
    }
    return;
  };

  const handleincressQuantity = (product) => {
    const currentQuantity = quantity[product?._id] || product?.quantity;
    const updatedQuantity = Math.min(currentQuantity + 1, 10);
    setQuantities(product?._id, updatedQuantity);
    dispatch(
      updateCart({
        id: product._id,
        quantity: updatedQuantity,
      })
    );
  };
  const handledecressQuantity = (product) => {
    const currentQuantity = quantity[product?._id] || product?.quantity;
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      setQuantities(product?._id, updatedQuantity);
      dispatch(
        updateCart({
          id: product._id,
          quantity: updatedQuantity,
        })
      );
    }
  };

  const setQuantities = (id, quantities) => {
    setQuantity({
      ...quantity,
      [id]: quantities,
    });
  };

  const data = cartItems?.user?.cart;

  useEffect(() => {
    if (data) {
      const total = data.reduce((acc, product) => {
        const quantities = quantity[product._id] || product.quantity;
        return acc + product.price * quantities;
      }, 0);
      setTotalCartPrice(total);
    }
  }, [data, quantity]);
  // console.log(cartItems?.user?.cart);
  return (
    <>
      <div className="flex flex-col justify-center items-start mt-3 font-Poppins ">
        <div className="w-full px-20 mb-4 sm:px-8">
          <h1 className="text-center text-4xl w-full  sm:text-xl">
            My Shopping Cart
          </h1>
          {cartItems?.user?.cart?.length > 0 ? (
            <div className="w-full grid grid-cols-cart sm:grid-cols-1 md:grid-cols-1 gap-3 mt-5">
              {isLoading ? (
                <>
                  <h1>Loding...</h1>
                </>
              ) : (
                <div className="w-full bg-gray-200 rounded-lg">
                  <CartItemCard
                    cartItems={data}
                    handleRemoveItem={handleRemoveItem}
                    handleincressQuantity={handleincressQuantity}
                    quantity={quantity}
                    handledecressQuantity={handledecressQuantity}
                  />
                </div>
              )}

              <div className="flex h-[220px] flex-col items-start justify-between gap-3 bg-gray-300 rounded-lg px-3 py-2">
                <h1>Cart Total</h1>
                <div className="w-full flex items-center justify-between">
                  <p>Total:</p>
                  <p>${totalCartPrice}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p>Shipping:</p>
                  <p>Free</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p>Final Total:</p>
                  <p>${totalCartPrice}</p>
                </div>

                <button 
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-green-600 px-4 py-2 text-sm rounded-full text-white font-medium md:mt-2 sm:mt-2 hover:bg-green-700 transition-all border-none cursor-pointer"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <img src={EmptyCart} alt="Empty Cart" />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Cart;

export const CartItemCard = ({
  cartItems,
  handleRemoveItem,
  handleincressQuantity,
  quantity,
  handledecressQuantity,
}) => {
  return (
    <div className="w-full">
      {/* Large Size */}
      <>
        <table className="w-full px-6 py-4 flex flex-col font-Poppins sm:hidden lg:block md:hidden">
          <thead>
            <tr className="grid grid-cols-table place-content-start font-semibold px-5 text-lg">
              <td>PRODUCT</td>
              <td>PRICE</td>
              <td>QUANTITY</td>
              <td>SUBTOTAL</td>
            </tr>
          </thead>
          <tbody className="w-full flex flex-col items-center justify-center gap-3">
            {cartItems.map((item, index) => {
              return (
                <tr
                  className="w-full grid grid-cols-table place-content-start mt-5 border-b-2 py-3 px-5 border-black"
                  key={index}
                >
                  <td className="  flex items-center justify-start gap-2 overflow-hidden">
                    <img
                      src={item?.productId?.image}
                      alt="Product Image"
                      className="w-2/12 rounded-lg"
                    />
                    <p>{item?.productId?.name}</p>
                  </td>
                  <td className=" flex items-center justify-center">
                    <div className="w-full h-full  flex  justify-start items-center">
                      <h1 className="text-center text-lg">
                        {item?.productId?.price}
                      </h1>
                    </div>
                  </td>
                  <td className=" flex items-center justify-start">
                    <div className=" flex w-[90px] h-[30px] items-center justify-between  rounded-full border-green-400 border-2">
                      <button
                        className="bg-white h-full flex-1 flex justify-center items-center rounded-full"
                        onClick={() => handledecressQuantity(item)}
                      >
                        -
                      </button>
                      <p className="flex-1 h-full flex justify-center items-center text-sm font-semibold">
                        {quantity[item?._id] || item?.quantity}
                      </p>
                      <button
                        className="bg-white h-full flex-1 flex justify-center items-center rounded-full"
                        onClick={() => handleincressQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className=" flex items-center justify-center">
                    <div className=" w-full flex h-full flex-row justify-start items-center">
                      <h1 className="text-center text-lg">
                        {item?.productId?.price *
                          (quantity[item?._id] || item?.quantity)}
                      </h1>
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-center ml-6">
                    <div className="w-full">
                      <button
                        className=" w-full text-center"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <img src={Cross} alt="" className="w-full" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>

      {/* Small and Mid Size */}
      <>
        <div className="flex flex-col  gap-3 sm:block lg:hidden md:block">
          {cartItems?.map((item, index) => {
            return (
              <div
                className="flex h-[170px] md:h-[200px] items-center justify-between w-full px-3 py-4 font-Poppins border-b-2 rounded-lg bg-gray-200 border-black"
                key={index}
              >
                <div className="w-4/5 h-full flex flex-col items-start justify-center gap-3">
                  <div className="flex w-full items-start justify-start gap-5 overflow-hidden ">
                    <img
                      src={item?.productId?.image}
                      alt=""
                      className="w-[30%] rounded-lg"
                    />
                    <div className="flex w-full flex-col items-start justify-between">
                      <h1 className="text-sm md:text-lg font-semibold">
                        {item?.productId?.name}
                      </h1>
                      <h1>${item?.productId?.price}</h1>
                    </div>
                  </div>
                  <div className="md:w-1/3  gap-2 flex justify-between items-center border-green-700 border-2 px-1 py-1 rounded-full">
                    <button
                      className="text-sm md:text-xl bg-gray-300 px-3 rounded-full py-1"
                      onClick={() => handledecressQuantity(item)}
                    >
                      -
                    </button>
                    <p className="text-sm md:text-xl">
                      {quantity[item?._id] || item?.quantity}
                    </p>
                    <button
                      className="text-sm md:text-xl bg-gray-300 px-3 rounded-full py-1"
                      onClick={() => handleincressQuantity(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-1/5 h-full flex flex-col items-start justify-between">
                  <p className="text-sm font-semibold mt-2 md:text-xl">
                    SubTotal $
                    {item?.productId?.price *
                      (quantity[item?._id] || item?.quantity)}
                  </p>
                  <button
                    className="w-full   flex items-center justify-center rounded-full"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <img src={Cross} alt="" className="w-2/3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
};

CartItemCard.propTypes = {
  cartItems: PropTypes.array,
  handleRemoveItem: PropTypes.func,
  handleincressQuantity: PropTypes.func,
  quantity: PropTypes.object,
  handledecressQuantity: PropTypes.func,
};
