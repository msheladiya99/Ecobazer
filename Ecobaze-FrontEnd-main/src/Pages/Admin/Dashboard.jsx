import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../Redux/Slices/productSlices";
import { fetchAllCategory } from "../../Redux/Slices/categorySlices";
import { getMyOrders } from "../../Redux/Slices/orderSlice";
import { 
  BsBasket, 
  BsGrid, 
  BsBagCheck, 
  BsArrowUpRight, 
  BsPeople 
} from "react-icons/bs";

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllProduct());
    dispatch(fetchAllCategory());
    dispatch(getMyOrders()); // Note: Admin should ideally fetch ALL orders, but we'll use this for now
  }, [dispatch]);

  const stats = [
    {
      title: "Total products",
      value: products.length,
      icon: <BsBasket />,
      color: "bg-blue-500",
      trend: "+12% this month"
    },
    {
      title: "Categories",
      value: categories.length,
      icon: <BsGrid />,
      color: "bg-green-500",
      trend: "Synced"
    },
    {
      title: "Total Orders",
      value: orders?.length || 0,
      icon: <BsBagCheck />,
      color: "bg-orange-500",
      trend: "+5% today"
    },
    {
      title: "Registered Users",
      value: "156", // Mock value for now
      icon: <BsPeople />,
      color: "bg-purple-500",
      trend: "+18% growth"
    }
  ];

  return (
    <div className="p-8 font-Poppins">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`${item.color} text-white p-3 rounded-xl text-2xl shadow-lg`}>
                {item.icon}
              </div>
              <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                {item.trend} <BsArrowUpRight />
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{item.title}</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recently Added Products</h3>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all">
                <div className="flex items-center gap-4">
                  <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.category}</p>
                  </div>
                </div>
                <p className="font-bold text-green-600">${product.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center">
            <div className="bg-green-50 p-6 rounded-full mb-4">
                <BsBasket className="text-4xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Grow your business</h3>
            <p className="text-gray-500 mb-6 max-w-xs">Everything you need to manage your products and orders is right here.</p>
            <div className="flex gap-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-all">Export Report</button>
                <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-all">View Settings</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
