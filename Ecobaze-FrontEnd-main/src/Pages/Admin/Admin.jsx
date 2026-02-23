import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  BsSpeedometer2, 
  BsGrid, 
  BsBasket, 
  BsStar, 
  BsChevronRight,
  BsBoxArrowLeft,
  BsList,
  BsXLg
} from "react-icons/bs";

const NavLinks = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: <BsSpeedometer2 />,
  },
  {
    label: "Categories",
    path: "category",
    icon: <BsGrid />,
  },
  {
    label: "Products",
    path: "product",
    icon: <BsBasket />,
  },
  {
    label: "Reviews",
    path: "review",
    icon: <BsStar />,
  },
];

const Admin = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    setActivePath(currentPath);
  }, [location]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-Poppins relative">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-[110] lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-72 bg-white border-r border-gray-100 flex flex-col h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-8 flex items-center justify-between">
            <h2 className="text-2xl font-black text-green-600 tracking-tight leading-tight">
              ECOBAZAR <span className="text-gray-400 text-xs font-bold block uppercase mt-1">Admin Panel</span>
            </h2>
            <button 
              className="lg:hidden p-2 text-gray-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <BsXLg />
            </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {NavLinks.map((item) => {
            const isActive = activePath === item.path;
            return (
              <Link
                to={item.path}
                key={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between p-4 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-green-50 text-green-600 font-bold shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center gap-4">
                    <span className={`text-xl ${isActive ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                        {item.icon}
                    </span>
                    <span>{item.label}</span>
                </div>
                {isActive && <BsChevronRight className="text-sm" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-50">
            <Link to="/" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all font-medium p-3">
                <BsBoxArrowLeft className="text-xl" />
                <span>Exit to Shop</span>
            </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <header className="bg-white border-b border-gray-100 p-4 lg:p-6 flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => setIsSidebarOpen(true)}
              >
                <BsList className="text-xl" />
              </button>
              <p className="text-xs lg:text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">{activePath}</p>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block font-Poppins">
                    <p className="text-sm font-bold text-gray-800">Admin User</p>
                    <p className="text-xs text-green-600 font-medium">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center font-bold text-green-700">A</div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
