import { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";

import "../../vendor/fonts/fonts.css";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleTempUnitChange() {
    if (currentTempUnit == "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  // universal close handler
  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard({});
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, handleTempUnitChange }}
      >
        <Header
          weatherData={weatherData}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={<Profile clothingItems={clothingItems} />}
          ></Route>
        </Routes>
        {/* PASS the opener down so ItemCard can use it */}
      </CurrentTemperatureUnitContext.Provider>

      <Footer />

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "item-modal"}
        onClose={handleCloseModal}
      />

      <ModalWithForm
        isOpen={activeModal === "add-garment-modal"}
        title="New garment"
        buttonText="Add garment"
        name="add-garment-form"
        onClose={handleCloseModal}
        handleSubmit={(e) => {
          e.preventDefault();
          handleCloseModal();
        }}
      >
        <fieldset className="modal__fieldset">
          <label htmlFor="add-garment-name-input" className="modal__label">
            Name
            <input
              id="add-garment-name-input"
              type="text"
              className="modal__input"
              placeholder="Name"
            />
          </label>
          {/* ADD: Image URL input */}
          <label htmlFor="add-garment-image-input" className="modal__label">
            Image
            <input
              id="add-garment-image-input"
              type="url"
              name="link"
              className="modal__input"
              required
              placeholder="Image URL"
              inputMode="url"
            />
          </label>
        </fieldset>

        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select weather type:</legend>

          <div>
            <input
              className="modal__radio-btn"
              type="radio"
              id="hot"
              name="weather"
              value="hot"
            />
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="hot"
            >
              Hot
            </label>
          </div>

          <div>
            <input
              className="modal__radio-btn"
              type="radio"
              id="warm"
              name="weather"
              value="warm"
            />
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="warm"
            >
              Warm
            </label>
          </div>

          <div>
            <input
              className="modal__radio-btn"
              type="radio"
              id="cold"
              name="weather"
              value="cold"
            />
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="cold"
            >
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
