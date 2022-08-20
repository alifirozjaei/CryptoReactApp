import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = coinHistory?.data?.history
    ? coinHistory.data.history.map((item) => item.price)
    : [];

  const coinTimestap = coinHistory?.data?.history
    ? coinHistory.data.history.map((item) => {
        return new Date(item.timestamp * 1000).toLocaleDateString();
      })
    : [];

  const data = {
    labels: coinTimestap,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#black",
        borderColor: "#444",
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <p className="text-xl">
          Change:{" "}
          {coinHistory?.data?.change > 0 ? (
            <span className="text-green-500">{coinHistory?.data?.change}%</span>
          ) : (
            <span className="text-rose-500">{coinHistory?.data?.change} %</span>
          )}
        </p>
        <p className="text-xl">
          Current {coinName} Price: ${" "}
          <span className="text-blue-600">{currentPrice}</span>
        </p>
      </div>
      <div className="w-full lg:w-3/4 mx-auto">
        <Line data={data} />
      </div>
    </div>
  );
};

export default LineChart;
