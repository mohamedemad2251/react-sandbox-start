import { FaClock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { noop, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/api/github";

const RecentSearch = ({
  recentSearchList,
  handleRecentSearchClick,
}: {
  recentSearchList: string[];
  handleRecentSearchClick: (username: string) => void;
}) => {
  // Instead of creating a new query client, we can use the one in the provider wrapped around the application (i.e. QueryClientProvider wrapped around <App/>). This is done to make sure the query client is shared and in sync, so that the API here and in <UserSearch/> check the same cache and reduce the number of API calls needed.
  // const queryClient = new QueryClient();

  const queryClient = useQueryClient();

  return (
    <div className="recent-searches">
      <h3 className="recent-header">
        <FaClock /> Recent Searches
      </h3>
      <ul>
        {recentSearchList.map((searchItem, index) => (
          <li key={`${searchItem}-${index}`}>
            <button
              onClick={() => handleRecentSearchClick(searchItem)}
              onMouseEnter={() => {
                queryClient
                  .query({
                    queryKey: ["users", searchItem],
                    queryFn: () => getUser(searchItem),
                    staleTime: 60_000, // consider it fresh for one minute
                  })
                  // noop = no operation (a function that does nothing)
                  .catch(noop);
              }}
            >
              <FaUser className="user-icon" />
              {searchItem}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearch;
