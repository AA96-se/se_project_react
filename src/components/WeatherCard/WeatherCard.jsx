import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import cloudy from "../../assets/cloudy.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  // TODO - destructure the currentTempUnit
  const contextValue = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <img src={cloudy} alt="Cloudy weather" className="weather-card__image" />
      <p className="weather-card__temp">
        {weatherData.temp[contextValue.currentTempUnit]}&deg;
        {contextValue.currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
