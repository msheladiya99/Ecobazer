import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, resetOrder } from "../Redux/Slices/orderSlice";
import { Footer } from "../Components";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cartSlices);
  const orderState = useSelector((state) => state.orders);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  useEffect(() => {
    if (orderState.success) {
      toast.success("Order Placed Successfully");
      setTimeout(() => {
        dispatch(resetOrder());
        navigate(`/order/${orderState.order._id}`);
      }, 2000);
    }
    if (orderState.error) {
      toast.error(orderState.error);
    }
  }, [orderState.success, orderState.error, navigate, dispatch, orderState.order]);

  const subtotal = cart.cartItems?.user?.cart?.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  ) || 0;
  const shippingPrice = subtotal > 100 ? 0 : 10;
  const taxPrice = (subtotal * 0.05).toFixed(2);
  const totalPrice = (subtotal + shippingPrice + Number(taxPrice)).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
        toast.error("Please fill all shipping details");
        return;
    }

    const orderItems = cart.cartItems?.user?.cart?.map((item) => ({
      name: item.productId.name,
      qty: item.quantity,
      image: item.productId.image,
      price: item.productId.price,
      product: item.productId._id,
    }));

    dispatch(
      createOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <div className="font-Poppins bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-3 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-3 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-3 border"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-3 border"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={paymentMethod === "Cash On Delivery"}
                    onChange={() => setPaymentMethod("Cash On Delivery")}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Cash On Delivery
                  </label>
                </div>
                <div className="flex items-center opacity-50 cursor-not-allowed">
                  <input
                    type="radio"
                    disabled
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Online Payment (Coming Soon)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {cart.cartItems?.user?.cart?.map((item) => (
                    <li key={item._id} className="py-6 flex">
                      <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                        <img src={item.productId.image} alt={item.productId.name} className="w-full h-full object-center object-cover" />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.productId.name}</h3>
                            <p className="ml-4">${(item.productId.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 font-medium">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-4">
                <div className="flex items-center justify-between text-base text-gray-600">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between text-base text-gray-600">
                  <p>Shipping</p>
                  <p>{shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`}</p>
                </div>
                <div className="flex items-center justify-between text-base text-gray-600">
                  <p>Tax (5%)</p>
                  <p>${taxPrice}</p>
                </div>
                <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-100">
                  <p>Total</p>
                  <p>${totalPrice}</p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={orderState.loading || cart.cartItems?.user?.cart?.length === 0}
                  className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {orderState.loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
