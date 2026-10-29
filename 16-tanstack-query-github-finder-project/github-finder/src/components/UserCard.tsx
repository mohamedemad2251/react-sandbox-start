import { useMutation } from "@tanstack/react-query";
import type { User } from "../types/user";
import { FaGithub, FaSpinner, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { followUser } from "../services/api/github";

const UserCard = ({
  user,
  isFollowing,
}: {
  user: User;
  isFollowing: boolean | undefined;
}) => {
  const mutation = useMutation({
    // I don't trust this key.
    // mutationKey: ["follow-user", user.login],
    mutationFn: () => followUser(user.login),
  });

  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={user.name || user.login}
        className="avatar"
      />
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>
      <div className="user-card-buttons">
        {/* TODO: Add "Unfollow" functionality (it doesn't work currently) */}
        <button
          onClick={() => (!isFollowing ? mutation.mutate() : "")}
          className={`follow-btn ${isFollowing ? "following" : ""}`}
        >
          {mutation.isPending ? (
            <FaSpinner />
          ) : isFollowing ? (
            <>
              <FaUserMinus /> Unfollow
            </>
          ) : (
            <>
              <FaUserPlus /> Follow
            </>
          )}
        </button>
        <a href={user.html_url} target="_blank" className="profile-btn">
          <FaGithub />
          Visit Github Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
