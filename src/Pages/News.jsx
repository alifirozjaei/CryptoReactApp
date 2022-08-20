import moment from "moment";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetNewsQuery } from "../services/cryptoNewsApi";

const News = (props) => {
  const count = props.simplify ? 6 : 15;
  const [category, setCategory] = useState("Cryptocurrency");
  const { data, isFetching } = useGetNewsQuery({
    newsCategory: category,
    count,
  });
  const { data: cryptoes } = useGetCryptosQuery({ count: 10, offset: 0 });

  const [news, setNews] = useState(data?.value);

  useEffect(() => {
    setNews(data?.value);
  }, [data, setNews]);

  return (
    <div className="h-auto w-full grow ">
      {!props.simplify && (
        <div className="flex justify-center my-2 mb-6">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 w-full md:w-1/2 focus:outline-blue-500 border "
          >
            <option value="cryptocurrency">All Crypto</option>
            {cryptoes?.data?.coins.map((item) => (
              <option key={item.symbol} value={item.symbol}>{item.name}</option>
            ))}
          </select>
        </div>
      )}
      {/* select news category  */}

      {!isFetching && news && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 md:gap-3">
          {news.map((item, index) => (
            <div
              key={index}
              className="p-3 rounded border bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <div className="flex items-center space-x-2 border-b-2 pb-2 ">
                <img
                  src={item?.image?.thumbnail?.contentUrl}
                  className="object-contain"
                  alt=""
                />
                <a
                  href={item.url}
                  className="text-blue-500 hover:text-blue-700 font-bold"
                >
                  {item.name}
                </a>
              </div>
              <p className="p-2 text-justify text-sm text-slate-800">
                {item?.description.length > 100
                  ? item?.description.substring(0, 100) + " ..."
                  : item?.description}
              </p>
              <div className="flex mt-6  items-center justify-between text-sm">
                <img
                  className="w-8 h-8  object-contain"
                  src={item?.provider[0]?.image?.thumbnail?.contentUrl}
                  alt="News"
                />
                <span className="text-sm ">
                  {moment(item?.datePublished).startOf("ss").fromNow()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* news list */}

      {!isFetching && news && news.length === 0 && (
        <p className="text-xl text-center my-8"> News Not Founded!</p>
      )}

      <div className="flex items-center justify-center">
        {isFetching && <Spinner className="w-12 h-12 border-b-blue-500" />}
      </div>
      {/* show loading spinner when fetching data */}
    </div>
  );
};

export default News;
