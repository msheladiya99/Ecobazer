import React, { useEffect } from "react";
import { GoArrowRight } from "react-icons/go";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../Redux/Slices/productSlices";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isAdded, isDeleted, isUpdated } = useSelector(
    (state) => state.products
  );

  // console.log(products);

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [isAdded, isDeleted, isUpdated]);
  // const data = [
  //   {
  //     src: ProductImage1,
  //     Price: "$11.99",
  //     Product: "Green Apple",
  //   },
  //   {
  //     src: ProductImage2,
  //     Price: "$14.29",
  //     Product: "Fresh Indian Malta",
  //   },
  //   {
  //     src: ProductImage3,
  //     Price: "$10.69",
  //     Product: "Chinese cabbage",
  //   },
  //   {
  //     src: ProductImage4,
  //     Price: "$14.99",
  //     Product: "Green Lettuce",
  //   },
  //   {
  //     src: ProductImage5,
  //     Price: "$16.09",
  //     Product: "Eggplant",
  //   },
  //   {
  //     src: ProductImage6,
  //     Price: "$12.89",
  //     Product: "Big Potatoes",
  //   },
  //   {
  //     src: ProductImage7,
  //     Price: "$13.69",
  //     Product: "Corn",
  //   },
  //   {
  //     src: ProductImage8,
  //     Price: "$10.99",
  //     Product: "Fresh Cauliflower",
  //   },
  //   {
  //     src: ProductImage9,
  //     Price: "$11.99",
  //     Product: "Green Capsicum",
  //   },
  //   {
  //     src: ProductImage10,
  //     Price: "$13.59",
  //     Product: "Green Chili",
  //   },
  // ];

  return (
    <div className="flex flex-col items-start justify-between mt-3 w-full mb-8">
      <div className="flex flex-row items-center justify-between w-full ">
        <h1 className="font-bold font-Poppins text-2xl sm:text-lg">
          Popular Products
        </h1>
        <Link
          to="/shop"
          className="text-green-700 py-2 px-3 flex items-center gap-4 rounded hover:bg-green-600 hover:text-white sm:text-sm md:text-base"
        >
          View All <GoArrowRight />
        </Link>
      </div>

      <div className="w-full grid grid-cols-5 gap-3 sm:grid-cols-2 md:grid-cols-3 bg-[#EDF2EE] p-2 mt-4">
        {products?.slice(0,10).map((item) => {
          return (
            <div className="w-full h-[260px] sm:h-[200px]" key={item._id}>
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
    </div>
  );
};

export default Products;
