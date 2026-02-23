import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../Redux/Slices/orderSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) return <div className="p-8">Loading your orders...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 font-Poppins">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
            <Link to="/shop" className="text-green-600 font-bold hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-4 px-2 font-bold text-gray-700">Order ID</th>
                <th className="py-4 px-2 font-bold text-gray-700">Date</th>
                <th className="py-4 px-2 font-bold text-gray-700">Total</th>
                <th className="py-4 px-2 font-bold text-gray-700">Status</th>
                <th className="py-4 px-2 font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
                  <td className="py-4 px-2 text-sm">#{order?._id?.slice(-8).toUpperCase()}</td>
                  <td className="py-4 px-2 text-sm">{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="py-4 px-2 font-bold">${order?.totalPrice?.toFixed(2) || '0.00'}</td>
                  <td className="py-4 px-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <Link to={`/order/${order._id}`} className="text-green-600 font-bold hover:underline text-sm">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
