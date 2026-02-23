import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../Redux/Slices/newsSlice";
import { posterimage, posterimage2, posterimage3, rightArrow } from "../assets";

const NewsSection = () => {
  const dispatch = useDispatch();

  const [allNews, setAllNews] = useState([]);

    useEffect(() => {
      dispatch(fetchNews());
    }, []);

  const { news, loading, error } = useSelector((state) => state?.newsSlice);

  useEffect(() => {
    if (news) {
      setAllNews(news);
    }
    if (error) {
      console.log(error);
    }
  });

//   console.log(allNews);

  return (
    <div className="w-full flex flex-col justify-between items-start font-Poppins">
      <h1 className="text-2xl font-semibold ">Latest News</h1>
      <div className="w-full grid grid-cols-4 place-content-center place-items-center gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2">
        {allNews.map((news, index) => {
          return (
            <div
              className="w-full flex flex-col items-start justify-between bg-gray-200 rounded-lg overflow-hidden pb-3 h-[300px]"
              key={index}
            >
              <div className="w-full flex items-center justify-center overflow-hidden h-[200px]">
                <img
                  src={news?.urlToImage}
                  alt=""
                  className="h-[200px] w-full"
                />
              </div>
              <div className="w-full flex flex-col items-start justify-between gap-2 px-4">
                <h1 className="w-full text-sm font-semibold">
                  {news?.title?.slice(0,60)}...
                </h1>
                {/* <p className="text-sm">
                {news?.description}
                </p> */}
                <a
                  href={news?.url}
                  target="_blank"
                  className=" flex items-center justify-start gap-2 text-green-600 font-semibold"
                >
                  Read More <img src={rightArrow} alt="" className="w-6 hover:ml-2 transition-all delay-75" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsSection;
