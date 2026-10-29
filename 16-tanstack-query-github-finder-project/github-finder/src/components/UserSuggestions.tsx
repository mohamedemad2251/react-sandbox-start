import type { SearchResultUser } from "../types/user";

type UserSuggestionsProps = {
  searchResults: SearchResultUser[];
  handleSuggestionClick: (login: string) => void;
};

const UserSuggestions = ({ searchResults, handleSuggestionClick }: UserSuggestionsProps) => {
  return (
    <div className="suggestions">
      <ul>
        {searchResults.map((searchResult) => (
          <li
            key={searchResult.id}
            onClick={()=>handleSuggestionClick(searchResult.login)}
          >
            <img
              src={searchResult.avatar_url}
              alt={searchResult.login}
              className="avatar-xs"
            />
            {searchResult.login}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSuggestions;
