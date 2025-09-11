// Main.jsx
import { useContext } from "react"; // (already added earlier)
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext"; // (already added earlier)
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  const { currentTempUnit = "F" } = useContext(CurrentTemperatureUnitContext);

  // ADDED: minimal helper (°F thresholds)
  const getWeatherType = (tempF) =>
    tempF <= 59 ? "cold" : tempF <= 74 ? "warm" : "hot";

  // ADDED: derive current bucket from the parsed API data (uses °F as source of truth)
  const weatherType = getWeatherType(weatherData?.temp?.F ?? 0);

  // ADDED: filter items to only those matching current weather
  const filteredClothingItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {weatherData?.temp?.[currentTempUnit] ?? "--"}&deg;{" "}
        {currentTempUnit} / You may want to wear:
      </p>
      <ul className="main__card-list">
        {filteredClothingItems.map((item) => (
          <li key={item._id} className="main__card-item">
            <ItemCard data={item} onCardClick={handleOpenItemModal} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
