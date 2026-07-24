import { useEffect, useState } from "react";

import CoinCard from "../components/CoinCard";
import FilterBar from "../components/FilterBar";
import { perPageOptions, sortByOptions } from "../consts/const";
import { getCoins } from "../api/coins";
import { GridLoader  } from "react-spinners";

const HomePage = () => {
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
      {isLoading && (
        <div className="w-full  h-[75dvh] flex justify-center items-center">
          <GridLoader color="white" />
        </div>
      )}
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
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
