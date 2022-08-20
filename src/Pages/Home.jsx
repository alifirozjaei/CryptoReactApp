import millify from "millify";
import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery({ count: 10, offset: 0 });

  const stats = data?.data?.stats;

  return (
    <div className="h-auto w-full grow space-y-10">
      <div>
        <h3 className="text-xl mb-6">Global Crypto Stats</h3>

        {data && (
          <div className="grid grid-cols-2 md:grid-cols-3  my-6 gap-4  items-center justify-center">
            <div className="border bg-blue-300 rounded-lg p-5">
              <h4 className="text-slate-600">Totlal Cryptocurrencies</h4>
              <span className="text-lg font-bold">
                {stats.total.toLocaleString()}
              </span>
            </div>
            <div className="border bg-blue-300 rounded-lg p-5">
              <h4 className="text-slate-600">Totlal Exchanges</h4>
              <span className="text-lg font-bold">
                {stats.totalExchanges.toLocaleString()}
              </span>
            </div>
            <div className="border bg-blue-300 rounded-lg p-5">
              <h4 className="text-slate-600">Totlal Market Cap</h4>
              <span className="text-lg font-bold">
                {millify(stats.totalMarketCap)}
              </span>
            </div>
            <div className="border bg-blue-300 rounded-lg p-5">
              <h4 className="text-slate-600">Totlal 24h Volume</h4>
              <span className="text-lg font-bold">
                {millify(stats.total24hVolume)}
              </span>
            </div>
            <div className="border bg-blue-300 rounded-lg p-5">
              <h4 className="text-slate-600">Totlal Markets</h4>
              <span className="text-lg font-bold">
                {millify(stats.totalMarkets)}
              </span>
            </div>
          </div>
        )}

        {!isFetching && !data && (
          <p className="text-cernter text-slate-600">Content Dosn't Exist!</p>
        )}

        <div className="flex items-center justify-center">
          {isFetching && <Spinner className="w-12 h-12 border-b-blue-500" />}
        </div>
      </div>
      {/* stats */}

      <div>
        <div className="flex flex-wrap items-center mb-6">
          <h3 className="text-xl ">Top 10 Cryptocurrencies</h3>
          <Link
            to="cryptocurrencies"
            className="text-blue-500 font-bold ml-auto border-b-2 border-b-indigo-400 hover:text-blue-700"
          >
            Show More
          </Link>
        </div>
        <Cryptocurrencies simplify />
      </div>
      {/* top cryptoes */}

      <div>
        <div className="flex flex-wrap items-center mb-6">
          <h3 className="text-xl ">Latest Crypto News</h3>
          <Link
            to="news"
            className="text-blue-500 font-bold ml-auto border-b-2 border-b-indigo-400 hover:text-blue-700"
          >
            Show More
          </Link>
        </div>
        <News simplify />
      </div>
      {/* lates news */}
    </div>
  );
};

export default Home;
