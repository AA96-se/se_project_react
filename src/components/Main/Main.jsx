import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData, onCardLike }) {
  const { currentTempUnit = "F" } = useContext(CurrentTemperatureUnitContext);

  const getWeatherType = (tempF) =>
    tempF <= 59 ? "cold" : tempF <= 74 ? "warm" : "hot";
  const weatherType = getWeatherType(
    weatherData?.temp?.[currentTempUnit] === undefined
      ? weatherData?.temp?.F ?? 0
      : weatherData?.temp?.F ?? 0
  );

  const filteredClothingItems = clothingItems.filter(
    (item) => item.weather === getWeatherType(weatherData?.temp?.F ?? 0)
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
            <ItemCard
              data={item}
              onCardClick={handleOpenItemModal}
              onCardLike={onCardLike}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
