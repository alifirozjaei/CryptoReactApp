import millify from "millify";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import {
  AiOutlineDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineMoneyCollect,
  AiOutlineFund,
  AiOutlineCheck,
  AiOutlineStop,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import HTMLReactParser from "html-react-parser";
import LineChart from "../components/LineChart";
const CryptoDetail = () => {
  const param = useParams();
  // const [timeperiod, setTimeperiod] = useState("");

  const [period, setPeriod] = useState('24h');

  const { data, isFetching } = useGetCryptoDetailsQuery(param.coinId);
  const { data: coinHistory  } = useGetCryptoHistoryQuery({
    id: param.coinId,
    timeperiod: period,
  });

  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <AiOutlineDollarCircle />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <AiOutlineNumber /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails && millify(cryptoDetails["24hVolume"])}`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <AiOutlineCheck />
      ) : (
        <AiOutlineStop />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];

  return (
    <div className="h-auto w-full grow ">
      {cryptoDetails && (
        <div>
          <div className="my-4">
            <h3 className="text-center text-3xl text-blue-500">
              {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
            </h3>
            <p className="text-slate-600 text-center">
              {cryptoDetails.name} live price in US Dollar (USD). View value
              statistics, market cap and supply.
            </p>
          </div>

          <div className="flex justify-center">
            <select
              placeholder="Select Timeperiod"
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full md:w-60 mt-6 p-2 border bg-gray-50 font-bold"
            >
              {time.map((date) => (
                <option value={date} key={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          {/* select time periode */}

          { coinHistory &&  <div>
            <LineChart
              coinHistory={coinHistory}
              currentPrice={millify(cryptoDetails.price)}
              coinName={cryptoDetails.name}
            />
          </div>}
          {/* line chart */}

          <h4 className="text-xl mt-6 text-center">
            {cryptoDetails.name} Value Statistics
          </h4>
          <p className=" text-center text-slate-600">
            An overview showing the statistics of {cryptoDetails.name}, such as
            the base and quote currency, the rank, and trading volume.
          </p>

          <div className="flex flex-col divide-y md:w-1/2 mx-auto  mt-10">
            {stats.map(({ icon, title, value }) => (
              <div key={title} className="flex items-center p-2">
                <div className="text-3xl">{icon}</div>
                <div>{title}</div>
                <div className="ml-auto font-bold">{value}</div>
              </div>
            ))}
          </div>
          {/* show statistics */}

          <h4 className="text-xl mt-6 text-center">Other Stats Info</h4>
          <p className=" text-center text-slate-600">
            An overview showing the statistics of {cryptoDetails.name}, such as
            the base and quote currency, the rank, and trading volume.
          </p>
          <div className="flex flex-col divide-y md:w-1/2 mx-auto  mt-10">
            {genericStats.map(({ icon, title, value }) => (
              <div key={title} className="flex items-center p-2">
                <div className="text-3xl">{icon}</div>
                <div>{title}</div>
                <div className="ml-auto font-bold">{value}</div>
              </div>
            ))}
          </div>
          {/* show other statistic */}

          <div className="my-6 text-justify space-y-2">
            <h2 className="text-3xl text-blue-500">
              What is {cryptoDetails.name}?
            </h2>
            <div className="custom-details space-y-2">
              {HTMLReactParser(cryptoDetails.description)}
            </div>
          </div>
          {/* More Details */}

          <h3 className="text-2xl mt-4 mb-2">{cryptoDetails.name} Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {cryptoDetails.links?.map((link) => (
              <div
                className="flex justify-between items-center p-2 border bg-gray-100 hover:bg-gray-200 transition-all"
                key={link.name}
              >
                <p className="font-bold">{link.type}</p>
                <a
                  href={link.url}
                  className="text-blue-500 hover:text-blue-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>
          {/* links */}
        </div>
      )}
      {/* show coin details */}

      <div className="flex items-center justify-center">
        {isFetching && <Spinner className="w-12 h-12 border-b-blue-500" />}
      </div>
      {/* show loading spinner when fetching data */}
    </div>
  );
};

export default CryptoDetail;
