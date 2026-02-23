import React, { useEffect, useState } from "react";
import { fetchAllCategory } from "../Redux/Slices/categorySlices";
import { fetchAllProduct } from "../Redux/Slices/productSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { Down, Up } from "../assets";
import { Footer } from "../Components";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get search term from URL
  const queryParams = new URLSearchParams(location.search);
  const searchName = queryParams.get("name") || "";

  const { categories } = useSelector((state) => state.categories);
  const { products, isLoading } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(8);

  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showDownCategory, setShowDownCategory] = useState(false);
  const [showDownPrice, setShowDownPrice] = useState(false);

  const DownArrowCategory = () => {
    setShowCategory(!showCategory);
    setShowDownCategory(!showDownCategory);
  };
  const DownArrowPrice = () => {
    setShowPrice(!showPrice);
    setShowDownPrice(!showDownPrice);
  };

  const priceOptions = [
    { amount: "0-20" },
    { amount: "21-30" },
    { amount: "30-120" },
    { amount: "2500-5000" },
    { amount: "5000 above" },
  ];

  const sortOptions = [
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
    { label: "Newest", value: "-createdAt" },
    { label: "Oldest", value: "createdAt" },
  ];

  const [selectedPriceRange, setSelectedpriceRange] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Changed to single category for backend simplicity

  const handlePriceChange = (e) => {
    setSelectedpriceRange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(prev => prev === val ? "" : val);
  };

  const resetFilters = () => {
    setSelectedpriceRange("");
    setSelectedSortOption("");
    setSelectedCategory("");
    navigate("/shop");
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      name: searchName,
      category: selectedCategory,
      sort: selectedSortOption,
    };
    dispatch(fetchAllProduct(params));
  }, [dispatch, searchName, selectedCategory, selectedSortOption]);

  // Client-side price filter for now (since backend price filter isn't implemented yet)
  const filteredProducts = products?.filter((product) => {
    if (!selectedPriceRange) return true;
    if (selectedPriceRange === "5000 above") return product.price >= 5000;
    const [min, max] = selectedPriceRange.split("-").map(Number);
    return product.price >= min && product.price <= max;
  });

  const totalPages = Math.ceil((filteredProducts?.length || 0) / perPageLimit);
  const startIndex = (currentPage - 1) * perPageLimit;
  const paginatedProducts = filteredProducts?.slice(startIndex, startIndex + perPageLimit);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="w-full flex items-start justify-between gap-4 px-20 mt-7 font-Poppins sm:px-10">
        {/* Side Select Bar */}
        <div className="w-1/5 flex flex-col items-start justify-between gap-2 border rounded-lg py-1 px-3 sm:hidden md:hidden">
          <div className="flex flex-col items-start justify-between gap-2 ">
            <h1 className="text-xl font-semibold">All Categories</h1>
            <div className="flex flex-col justify-around items-start gap-1">
              {categories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-1">
                    <input
                      type="checkbox"
                      name="Category"
                      value={category.name}
                      onChange={handleCategoryChange}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={category.name}
                      className="cursor-pointer text-base uppercase">
                      {category.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-2 ">
            <h1 className="text-xl font-semibold">Price</h1>
            <div className="flex flex-col justify-around items-start gap-1">
              {priceOptions.map((amount) => {
                return (
                  <div
                    key={amount.amount}
                    className="flex items-center justify-center gap-1">
                    <input
                      type="radio"
                      name="Price"
                      value={amount.amount}
                      onChange={handlePriceChange}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={amount.amount}
                      className="cursor-pointer text-base uppercase">
                      {amount.amount}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Category , Price and Shorting For Small Size Component */}
        <div className="w-4/5 flex flex-col items-start justify-between gap-2 sm:w-full md:w-full">
          <div className="w-full flex items-center justify-between  border-2 py-1 rounded-lg px-2 sm:h-[30px] md:h-[40px]">
            {/* Reset Button */}
            <button
              className="bg-green-600 px-3 py-1 rounded-lg sm:hidden md:hidden"
              onClick={resetFilters}>
              Reset Filters
            </button>

            {/* Small Size Category DropDown */}
            <div className="w-[90px] md:w-[120px] flex flex-col items-center justify-between gap-2 sm:block md:block lg:hidden h-full z-30  ">
              <div className=" w-full flex items-center justify-between text-sm  gap-2  ">
                <h1 className="text-xs md:text-sm">Categories</h1>
                <img
                  src={Down}
                  alt=""
                  onClick={DownArrowCategory}
                  className={`${
                    showDownCategory ? "hidden" : "block"
                  } w-3 cursor-pointer`}
                />
                <img
                  src={Up}
                  alt=""
                  onClick={DownArrowCategory}
                  className={`${
                    showDownCategory ? "block" : "hidden"
                  } w-3 cursor-pointer`}
                />
              </div>
              <div
                className={`${
                  showCategory ? "block" : "hidden"
                } w-[120px] md:w-[160px] md:mt-4 flex flex-col justify-around items-start gap-2 mt-3 py-2 rounded-lg -ml-2 px-2 bg-green-200 `}>
                {categories.map((category, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-1 ">
                      <input
                        type="checkbox"
                        checked={
                          selectedCategory.includes(category.name)
                            ? false
                            : true
                        }
                        name="Category"
                        value={category.name}
                        onChange={handleCategoryChange}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor={category.name}
                        className="cursor-pointer text-[10px] md:text-sm uppercase">
                        {category.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Small Size Price DroapDown */}
            <div className="w-[60px] md:w-[100px] h-full  flex flex-col items-center justify-between gap-2 sm:block lg:hidden z-30 ">
              <div className=" w-full flex items-center justify-between text-sm  gap-2 ">
                <h1 className="text-xs md:text-sm">Price</h1>
                <img
                  src={Down}
                  alt=""
                  onClick={DownArrowPrice}
                  className={`${
                    showDownPrice ? "hidden" : "block"
                  } w-3 cursor-pointer`}
                />
                <img
                  src={Up}
                  alt=""
                  onClick={DownArrowPrice}
                  className={`${
                    showDownPrice ? "block" : "hidden"
                  } w-3 cursor-pointer`}
                />
              </div>
              <div
                className={`${
                  showPrice ? "block" : "hidden"
                } w-[100px] md:w-[130px] flex flex-col justify-around items-start gap-2 md:mt-2  mt-3 py-2 rounded-lg px-3 -ml-2 z-20 bg-green-200`}>
                {priceOptions.map((amount) => {
                  return (
                    <div
                      key={amount.amount}
                      className="flex items-center justify-center gap-1">
                      <input
                        type="radio"
                        name="Price"
                        value={amount.amount}
                        onChange={handlePriceChange}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor={amount.amount}
                        className="cursor-pointer text-[10px] md:text-sm uppercase">
                        {amount.amount}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Shorting  */}
            <div className="sm:h-full sm:w-[90px] md:h-full sm:flex sm:items-end lg:justify-end rounded-lg ">
              <select
                name="sort"
                onChange={handleSortChange}
                className="font-[Poppins] text-sm sm:text-xs border outline-none p-1 -mt-6 rounded-lg cursor-pointer w-full sm:h-full md:h-full  sm:p-0 sm:border-none md:border-none">
                <option>Sort</option>
                {sortOptions?.map((option, index) => {
                  return (
                    <option value={option.label} key={index}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Show All Product */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#EDF2EE] p-4 lg:p-6 rounded-3xl">
            {paginatedProducts?.map((item) => {
              return (
                <div
                  // onClick={() => navigate(`/showproductdetail/${item._id}`)}
                  key={item._id}
                  className="w-full h-[300px] sm:h-[200px]">
                  <ProductCard
                    key={item._id}
                    src={item.image}
                    Price={item.price}
                    Product={item.name}
                    productId={item._id}
                  />
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="join w-full flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`join-item btn border-none rounded-l-md ${
                currentPage === 1 && "bg-gray"
              }`}
              disabled={currentPage === 1}>
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`join-item btn border-none w-10 h-10 font-[Poppins] rounded-lg font-semibold flex items-center justify-center ${
                    currentPage === pageNum &&
                    "bg-green-600 text-white hover:bg-green-800 hover:text-white"
                  }`}>
                  {pageNum}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`join-item btn border-none rounded-r-md ${
                currentPage === totalPages && "bg-gray"
              }`}
              disabled={currentPage === totalPages}>
              »
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
