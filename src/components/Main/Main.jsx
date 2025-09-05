import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {weatherData.temp.F}&deg; F / You may want to wear:
      </p>
      <ul className="main__card-list">
        {clothingItems.map((item) => {
          return (
            <li key={item._id} className="main__card-item">
              <ItemCard data={item} onCardClick={handleOpenItemModal} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
