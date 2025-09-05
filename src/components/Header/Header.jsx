import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import "./header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleOpenAddGarmentModal, weatherData }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__side">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <p className="header__place">
          <time className="header__datetime" dateTime={now}>
            {dateStr}
          </time>
          , {weatherData.city}
        </p>
      </div>
      <div className="header__side">
        <ToggleSwitch />
        <button
          onClick={handleOpenAddGarmentModal}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <p className="header__username">Terence Tegegne</p>
        <img src={avatar} alt="user avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
