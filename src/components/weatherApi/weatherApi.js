// import { apiKey, coordinates } from "../constants/constants";

export function getWeatherData() {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}"
  ).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error from weather API: ${res.status}`);
  });
}
