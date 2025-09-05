const coordinates = { lat: "25.675899", lon: "-80.320398" };
const apiKey = "0a62207de71ee4625784a85d6cd01371";

export const weatherConditionImages = {
  day: {
    clear: {
      name: "clear",
      image: new URL("../assets/day/clearDay.svg", import.meta.url).href,
    },
    cloudy: {
      name: "cloudy",
      image: new URL("../assets/night/cloudyDay.svg", import.meta.url).href,
    },
    fog: {
      name: "fog",
      image: new URL("../assets/day/fogDay.svg", import.meta.url).href,
    },
    rain: {
      name: "rain",
      image: new URL("../assets/day/rainDay.svg", import.meta.url).href,
    },
    snow: {
      name: "snow",
      image: new URL("../assets/day/snowDay.svg", import.meta.url).href,
    },
    storm: {
      name: "storm",
      image: new URL("../assets/day/stormDay.svg", import.meta.url).href,
    },
  },
  night: {
    clear: {
      name: "clear",
      image: new URL("../assets/night/clearNight.svg", import.meta.url).href,
    },
    cloudy: {
      name: "cloudy",
      image: new URL("../assets/night/cloudyDay.svg", import.meta.url).href,
    },
    fog: {
      name: "fog",
      image: new URL("../assets/night/fogNight.svg", import.meta.url).href,
    },
    rain: {
      name: "rain",
      image: new URL("../assets/night/rainNight.svg", import.meta.url).href,
    },
    snow: {
      name: "snow",
      image: new URL("../assets/night/snowNight.svg", import.meta.url).href,
    },
    storm: {
      name: "storm",
      image: new URL("../assets/night/stormNight.svg", import.meta.url).href,
    },
  },
};

export { coordinates, apiKey };
