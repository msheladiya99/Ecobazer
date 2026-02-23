import React, { useEffect } from "react";
import { GoArrowRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../Redux/Slices/categorySlices";
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories,isAdded,isUpdated,isDeleted } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [isAdded,isDeleted,isUpdated]);


  const handleviewcategory = () =>{
      navigate("/shop")
  }

  return (
    <div className="flex flex-col items-start justify-between mt-6 w-full mb-8">
      <div className="flex flex-row items-center justify-between w-full ">
        <h1 className="font-bold font-Poppins text-2xl sm:text-lg">
          Popular Categories
        </h1>
        {/* <a
          href="#"
          className="text-green-700 py-2 px-3 flex items-center gap-2 rounded hover:bg-green-600 hover:text-white sm:text-sm md:text-base"
        >
          View All <GoArrowRight />
        </a> */}
      </div>
      <div className="w-full grid grid-cols-6 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {categories.map((item) => {
          return (
            <div
              className="border flex flex-col justify-center items-center py-3 px-1 gap-3 cursor-pointer hover:shadow-lg hover:shadow-green-300 hover:border-green-600 hover:rounded-lg"
              key={item._id}
              onClick={handleviewcategory}
            >
              <img src={item.image} />
              <h1 className="text-sm text-center"> {item.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
