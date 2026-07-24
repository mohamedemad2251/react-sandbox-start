import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCoin, getCoinPriceChart } from "../api/coins";
import { Link } from "react-router";
import { GridLoader } from "react-spinners";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const CoinDetailsPage = () => {
  const params = useParams();
  const id = params.id;
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Chart States
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [coinChartTimestamps, setCoinChartTimestamps] = useState([]);
  const [coinChartPrices, setCoinChartPrices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCoin = async () => {
      try {
        const data = await getCoin(id);
        setCoin(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCoin();
  }, [id]);

  useEffect(() => {
    if (isLoading) return;

    const loadCoinChart = async () => {
      try {
        const coinChart = await getCoinPriceChart(id, 7);
        setCoinChartTimestamps(coinChart.prices.map((price) => price[0]));
        setCoinChartPrices(coinChart.prices.map((price) => price[1]));
      } catch (error) {
        console.log(error);
      } finally {
        setIsChartLoading(false);
      }
    };
    loadCoinChart();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="w-full  h-[75dvh] flex justify-center items-center">
        <GridLoader color="white" />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <p className="text-red-500 text-2xl text-center">{error.message}</p>;
  }
  return (
    <div className="coin-details-container">
      <Link to="/">⬅️ Go Back To Home</Link>
      <div className="coin-details-title">
        <h1 className="font-bold">
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <img
          src={coin.image.large}
          alt={coin.name}
          className="coin-details-image"
        />
      </div>
      <p>{coin.description.en.split(". ")[0] + "."}</p>

      <h4 className="font-bold">
        Price: ${coin.market_data.current_price.usd.toLocaleString()}
      </h4>

      {coin.links.homepage[0] && (
        <Link target="_blank" to={coin.links.homepage[0]}>
          🌐 Go To Homepage
        </Link>
      )}
      <div className="flex flex-col gap-4 mt-5">
        <h2 className="font-bold text-xl">Price last 7 days</h2>
        {!isChartLoading && (
          <Line
            data={{
              labels: coinChartTimestamps,
              datasets: [
                {
                  label: `${coin.name}'s Price Over 7 days`,
                  data: coinChartPrices,
                  borderColor: "rgba(0, 123, 255, 0.5)",
                  backgroundColor: "rgba(0, 123, 255, 0.5)",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { mode: "index", intersect: false },
              },
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                  },
                },
                y: {
                  ticks: {
                    callback: (value) => `$${value.toLocaleString()}`,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CoinDetailsPage;
