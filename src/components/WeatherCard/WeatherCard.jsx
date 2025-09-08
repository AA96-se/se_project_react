import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { weatherConditionImages } from "../../utils/constants.js";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  // const contextValue = useContext(CurrentTemperatureUnitContext);
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  // TODO - set up the alt text
  //TODO - vary image based on day/night

  return (
    <section className="weather-card">
      <img
        src={
          weatherConditionImages["day"][weatherData.weatherCondition]?.image ||
          weatherConditionImages["day"]["default"].image
        }
        alt="Cloudy weather"
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]}&deg;
        {currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
