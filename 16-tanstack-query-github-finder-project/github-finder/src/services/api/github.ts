import type { SearchResponse } from "../../types/response";
import type { User } from "../../types/user";
export const getUser = async (username: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${username}`);

  if (!res.ok) throw new Error("Failed to fetch user");

  const data: User = await res.json();

  return data;
};

export const searchUsers = async (searchQuery: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/search/users?q=${searchQuery}`,
  );

  if (!res.ok) throw new Error("Failed to fetch user");

  const data: SearchResponse = await res.json();

  return data;
};

export const checkFollowingUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/user/following/${username}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_AUTH_TOKEN}`,
      },
    },
  );
  const FOLLOWED = 204;
  const NOT_FOLLOWED = 404;

  switch (res.status) {
    case FOLLOWED:
      return true;
    case NOT_FOLLOWED:
      return false;
    default:
      throw new Error("Cannot check if user is followed or not");
  }
};

export const followUser = async (username: string) => {
  const FOLLOWED = 204;
  const NOT_FOLLOWED = 304;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/user/following/${username}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_AUTH_TOKEN}`,
      },
      method: "PUT",
    },
  );

  switch (res.status) {
    case FOLLOWED:
      return true;
    case NOT_FOLLOWED:
      return false;
    default:
      throw new Error(`Unable to follow user: ${username}`);
  }
};

// TODO (I probably won't do): Add the unfollow user API (same API but with DELETE instead of PUT)
