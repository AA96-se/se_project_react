import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const name = currentUser?.name ?? "";
  const avatarSrc = currentUser?.avatar ?? "";
  const hasAvatar = Boolean(currentUser?.avatar);
  const initial = (name?.[0] ?? "").toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <p className="sidebar__username">{name}</p>

        {hasAvatar ? (
          <img
            src={avatarSrc}
            alt={`${name}'s avatar`}
            className="sidebar__avatar"
          />
        ) : (
          <div
            className="sidebar__avatar sidebar__avatar_placeholder"
            aria-label={name || "User"}
            title={name || "User"}
          >
            {initial}
          </div>
        )}
      </div>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={onEditProfile}
        >
          Change profile data
        </button>

        <button
          type="button"
          className="sidebar__logout-btn"
          onClick={onSignOut}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
