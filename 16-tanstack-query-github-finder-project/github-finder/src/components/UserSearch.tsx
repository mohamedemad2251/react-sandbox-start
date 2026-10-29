import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  checkFollowingUser,
  getUser,
  searchUsers,
} from "../services/api/github";
import UserCard from "./UserCard";
import RecentSearch from "./RecentSearch";
import UserSuggestions from "./UserSuggestions";

const UserSearch = () => {
  const MAX_RECENT_SEARCHES = 5;
  const DEBOUNCE_DURATION = 300;

  const [inputValue, setInputValue] = useState("");
  // NOTE: I tried using useRef to optimize but since a ref doesn't cause React to re-render, the useQuery() hook doesn't invoke a change in the queryKey and therefore, the queryFn doesn't invoke as well (tl;dr we need a state to make the API work)
  const [submittedUserName, setSubmittedUserName] = useState("");

  const [recentSearchList, setRecentSearchList] = useState<string[]>(() => {
    const localStorageRecentSearchList =
      localStorage.getItem("recent-search-list");
    return localStorageRecentSearchList
      ? JSON.parse(localStorageRecentSearchList)
      : [];
  });

  // inputValue state changes on every keystroke. We want a new debounced state that searches only after a delay from the LAST keystroke the user does. Hence, we created userNameSearch.
  const [userNameSearch, setUserNameSearch] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Debounce logic + cleanup for the username search
  useEffect(() => {
    const timerId = setTimeout(() => {
      setUserNameSearch(inputValue.trim());
    }, DEBOUNCE_DURATION);

    return () => {
      clearTimeout(timerId);
    };
    // The dependency list is inputValue because every keystroke should clear the debouncing timeout and re-sets it with the new debouncing timeout (so that the first keystroke for example doesn't race the last keystroke on timeout activation)
  }, [inputValue]);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // This is an easier way to implement the recent search. Basically, we're making the most recent spot (i.e. index = 0) occupied by the new value. First we add inputValue to the array (i.e. [inputValue.trim(),...state]) then we filtered out duplication (via .filter()) and finally we sliced and took the first 5 values only (or depending on the MAX_RECENT_SEARCHES value) via .slice()
    setRecentSearchList((state) => {
      const updatedRecentSearchList = [
        inputValue.trim(),
        ...state.filter((value) => value !== inputValue),
      ].slice(0, MAX_RECENT_SEARCHES);

      localStorage.setItem(
        "recent-search-list",
        JSON.stringify(updatedRecentSearchList),
      );
      return updatedRecentSearchList;
    });

    setInputValue("");
    setSubmittedUserName(inputValue);
  };

  const handleRecentSearchClick = (username: string) => {
    if (submittedUserName === username && inputValue === username) return;
    setInputValue(username);
    setSubmittedUserName(username);
    setShowSuggestions(false);
  };

  // useQuery() creates an observer that lets React "react"/watch the data fetched for the component to update the UI. However, queryClient.query() doesn't do that because it's not a hook. Therefore, the total observers created = 1 + 0 = 1 (UserSearch component only since it's using the hook)
  const { data, isLoading, isError, error } = useQuery({
    // queryKey invalidates and caches the fetching. Basically, if "users" OR submittedUserName's value change, invoke the queryFn again.
    queryKey: ["users", submittedUserName],
    queryFn: () => getUser(submittedUserName),
    // Since we don't have the query client configured (i.e. we have the default configuration), the stale time = 0. Stale = data is not up-to-date. Therefore, the moment we fetch data, that data is considered "stale" and any invokation to the queryFn() will result in re-fetching. HOWEVER, if we specify a stale time, we won't fetch the API again unless the stale time passes and the data (i.e. that specific data defined by the queryKey) is marked as "stale". Uncomment the next line and give it a try:
    staleTime: 50_000,
    // !! transforms the value to a boolean. That is used to make sure there IS a submitted value before the queryFn invokes (i.e. it doesn't fetch from the API unless some value exists)
    enabled: !!submittedUserName,
  });

  const { data: searchResponse } = useQuery({
    queryKey: ["search-users", userNameSearch],
    queryFn: () => searchUsers(userNameSearch),
    staleTime: 30_000,
    enabled: !!userNameSearch.trim(),
  });

  const searchResults = searchResponse?.items;

  const { data: isFollowing } = useQuery({
    queryKey: ["follow-user", submittedUserName],
    queryFn: () => checkFollowingUser(submittedUserName),
    enabled: !!submittedUserName,
  });

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="dropdown-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
          />
          {showSuggestions && searchResults && searchResults?.length > 0 && (
            <UserSuggestions
              searchResults={searchResults}
              handleSuggestionClick={(login) => {
                setInputValue(login);
                setSubmittedUserName(login);
                setShowSuggestions(false);
                setRecentSearchList((state) => {
                  const updatedRecentSearchList = [
                    inputValue.trim(),
                    ...state.filter((value) => value !== inputValue),
                  ].slice(0, MAX_RECENT_SEARCHES);

                  localStorage.setItem(
                    "recent-search-list",
                    JSON.stringify(updatedRecentSearchList),
                  );
                  return updatedRecentSearchList;
                });
              }}
            />
          )}
        </div>
        <button type="submit">Search User</button>
      </form>

      {isLoading && <p className="status">Loading...</p>}
      {/* NOTE: I noticed Tanstack retries the fetch like 5 times before showing the error */}
      {isError && <p className="status error">{error.message}</p>}
      {data && <UserCard user={data} isFollowing={isFollowing} />}
      <RecentSearch
        recentSearchList={recentSearchList}
        handleRecentSearchClick={handleRecentSearchClick}
      />
    </>
  );
};

export default UserSearch;
