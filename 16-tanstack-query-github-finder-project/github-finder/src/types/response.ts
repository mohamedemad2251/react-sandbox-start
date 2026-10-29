import type { SearchResultUser } from "./user";

/** GitHub user-search response. */
export type SearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: SearchResultUser[];
};
