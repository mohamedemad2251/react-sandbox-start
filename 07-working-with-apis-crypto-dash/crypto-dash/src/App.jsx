import { useEffect, useState } from "react";
import getCoins from "./api/coins";
import CoinCard from "./components/CoinCard";
import FilterBar from "./components/FilterBar";
import { perPageOptions, sortByOptions } from "./consts/const";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [perPage, setPerPage] = useState(perPageOptions[0].value);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [isSearching, setIsSearching] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This duplicated the fetch (since perPage changes on mount). This is redundant, use the latter useEffect() instead.
  // useEffect(() => {
  //   const loadCoins = async () => {
  //     const data = await getCoins();
  //     setCoins(data);
  //     setIsLoading(false);
  //   };
  //   loadCoins();
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    const loadCoins = async () => {
      const data = await getCoins(perPage, page, sortBy);
      setCoins(data);
      setIsLoading(false);
    };
    loadCoins();
  }, [perPage, sortBy]);

  const search = (item) => {
    setSearchItems(
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(item.toLowerCase()),
      ),
    );
    if (item !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <main>
      <h1>🚀 Crypto Dash</h1>
      {isLoading && <p>Loading...</p>}
      {isLoading === false && (
        <div>
          <FilterBar
            search={search}
            perPage={perPage}
            setPerPage={setPerPage}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <div className="grid">
            {isSearching === true
              ? searchItems.map((searchItem) => (
                  <CoinCard key={searchItem.id} coin={searchItem} />
                ))
              : coins.map((coin) => <CoinCard key={coin.id} coin={coin} />)}
            {/* {coins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))} */}
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
