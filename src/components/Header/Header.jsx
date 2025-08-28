import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import "./header.css";

function Header() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR logo" className="header__logo" />
      <p className="header__place">
        <time className="header__datetime" dateTime={now}>
          {dateStr}
        </time>
        , New York
      </p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <p className="header__username">Terence Tegegne</p>
      <img src={avatar} alt="user avatar" className="header__avatar" />
    </header>
  );
}

export default Header;
