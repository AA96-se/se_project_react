import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import avatarFallback from "../../assets/avatar.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleOpenAddGarmentModal,
  weatherData,
  isLoggedIn = false,
  currentUser = null,
  onOpenLogin,
  onOpenRegister,
  // onSignOut removed from props
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const name = currentUser?.name ?? "Terence Tegegne";
  const avatarSrc = currentUser?.avatar ?? avatarFallback;
  const hasAvatar = Boolean(currentUser?.avatar);
  const initial = (currentUser?.name?.[0] ?? "T").toUpperCase();

  return (
    <header className="header">
      <div className="header__side">
        <Link className="header__link" to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
          <p className="header__place">
            <time className="header__datetime" dateTime={now}>
              {dateStr}
            </time>
            , {weatherData.city}
          </p>
        </Link>
      </div>

      <div className="header__side">
        <ToggleSwitch />

        {/* SHOW ONLY WHEN LOGGED IN */}
        {isLoggedIn && (
          <button
            onClick={handleOpenAddGarmentModal}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}

        {!isLoggedIn ? (
          <div className="header__auth">
            {/* Order: Sign Up first, then Log in */}
            <button
              className="header__btn header__btn_type_register"
              onClick={onOpenRegister}
            >
              Sign Up
            </button>
            <button
              className="header__btn header__btn_type_login"
              onClick={onOpenLogin}
            >
              Log in
            </button>
          </div>
        ) : (
          <Link className="header__link header__user" to="/profile">
            <p className="header__username">{name}</p>
            {hasAvatar ? (
              <img
                src={avatarSrc}
                alt="user avatar"
                className="header__avatar"
              />
            ) : (
              <div
                className="header__avatar header__avatar_placeholder"
                aria-label={name}
              >
                {initial}
              </div>
            )}
          </Link>
        )}

        {/* Sign-out button removed from header */}
      </div>
    </header>
  );
}

export default Header;
