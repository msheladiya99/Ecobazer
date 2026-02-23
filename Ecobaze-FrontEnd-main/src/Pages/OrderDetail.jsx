import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../Redux/Slices/orderSlice";
import { Footer } from "../Components";
import { BsCheckCircleFill, BsClockHistory, BsTruck } from "react-icons/bs";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-Poppins">Loading Order Details...</div>;
  if (error) return <div className="h-screen flex items-center justify-center font-Poppins text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <div className="font-Poppins bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 px-8 py-10 text-white text-center">
            <BsCheckCircleFill className="text-6xl mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="mt-2 text-green-50/80">Thank you for your purchase. Your order #{order._id.slice(-8).toUpperCase()} is being processed.</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-b border-gray-100 pb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Details</h3>
                <div className="text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-900">{order.user.firstName} {order.user.lastName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Status</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <BsClockHistory className="text-orange-500 text-xl" />
                        <span className="text-sm font-medium">Status: <span className="text-orange-600">{order.isDelivered ? "Delivered" : "Processing"}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                        <BsTruck className="text-blue-500 text-xl" />
                        <span className="text-sm font-medium">Delivery: <span className="text-blue-600">3-5 Business Days</span></span>
                    </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-6">Items Ordered</h3>
            <div className="space-y-6">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border" />
                  <div className="ml-4 flex-1">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.qty} × ${item.price}</p>
                  </div>
                  <p className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 space-y-3 max-w-xs ml-auto">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="text-green-600">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop" className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all text-center">Continue Shopping</Link>
                <Link to="/api/v1/user/orders" className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-all text-center">View My Orders</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;
