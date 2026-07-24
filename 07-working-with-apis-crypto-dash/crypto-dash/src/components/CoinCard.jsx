import { Link } from "react-router";

const CoinCard = ({ coin }) => {
  return (
    <Link to={`/coin-details/${coin.id}`}>
      <div className="coin-card">
        <div className="flex items-center gap-5">
          <img
            src={coin.image}
            alt={`${coin.name} Image`}
            className="coin-image"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{coin.name}</h2>
            <p className="symbol uppercase">{coin.symbol}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {coin.current_price && (
            <p>Price: ${coin.current_price.toLocaleString()}</p>
          )}
          {coin.price_change_percentage_24h && (
            <p
              className={
                coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
              }
            >
              24h Change: {coin.price_change_percentage_24h}%
            </p>
          )}
          {coin.market_cap_change_24h && (
            <p>Market Cap: ${coin.market_cap_change_24h.toLocaleString()}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
