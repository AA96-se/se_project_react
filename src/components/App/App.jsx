import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import "../../vendor/fonts/fonts.css";
import "./App.css";

import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import {
  addItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
  updateUserProfile,
} from "../../utils/api";
import { signup, signin, getMe } from "../../utils/auth";

function App() {
  const navigate = useNavigate();

  // data
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 0, C: 0 },
  });

  // ui state
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [activeModal, setActiveModal] = useState(""); // "item-modal" | "add-garment-modal" | ""
  const [selectedCard, setSelectedCard] = useState({});

  // auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt") ?? "");
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  // ✅ NEW: auth error message shown in modals
  const [authError, setAuthError] = useState("");

  // temperature toggle
  function handleTempUnitChange() {
    setCurrentTempUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  // modal open/close
  function handleOpenItemModal(card) {
    setSelectedCard(card);
    setActiveModal("item-modal");
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard({});
    setRegisterOpen(false);
    setLoginOpen(false);
    setEditProfileOpen(false);
    setAuthError(""); // ✅ clear when closing anything
  }

  // items (protected)
  function handleAddItemSubmit(inputValues) {
    addItem(inputValues, token)
      .then((created) => {
        setClothingItems((prev) => [created, ...prev]);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem(item) {
    deleteItem(item._id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        handleCloseModal();
      })
      .catch(console.error);
  }

  // likes (stretch)
  function handleCardLike({ id, isLiked }) {
    const t = token || localStorage.getItem("jwt");
    if (!t) {
      setAuthError("");
      setLoginOpen(true);
      return;
    }
    const req = isLiked ? unlikeItem(id, t) : likeItem(id, t);
    req
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((c) => (c._id === id ? updatedCard : c))
        );
      })
      .catch(console.error);
  }

  // profile edit (stretch)
  function openEditProfile() {
    if (!isLoggedIn) {
      setAuthError("");
      setLoginOpen(true);
      return;
    }
    setEditProfileOpen(true);
  }

  async function handleUpdateProfile({ name, avatar }) {
    setSubmitting(true);
    try {
      const updated = await updateUserProfile({ name, avatar }, token);
      setCurrentUser((prev) => ({ ...prev, ...updated }));
      setEditProfileOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  // auth flows
  async function handleRegister({ name, avatar, email, password }) {
    setSubmitting(true);
    try {
      await signup({ name, avatar, email, password });
      const res = await signin({ email, password });
      if (res?.token) {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setRegisterOpen(false);
        setLoginOpen(false);
        setAuthError("");
      }
    } catch (e) {
      console.error(e);
      // optional: set a register error message here later if you want
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogin({ email, password }) {
    setSubmitting(true);
    try {
      const res = await signin({ email, password });
      if (res?.token) {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setLoginOpen(false);
        setAuthError("");
      }
    } catch (e) {
      console.error(e);
      // ✅ this matches your screenshot requirement
      setAuthError("Email or password incorrect");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSignOut() {
    try {
      localStorage.removeItem("jwt");
    } catch (_) {}
    setToken("");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveModal("");
    setAuthError("");
    navigate("/");
  }

  // effects: weather + items (public GET /items)
  useEffect(() => {
    getWeatherData().then(setWeatherData).catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems([...items].reverse()))
      .catch(console.error);
  }, []);

  // token bootstrap/validation
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }
    getMe(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setToken("");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, [token]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTempUnit, handleTempUnitChange }}
        >
          <Header
            weatherData={weatherData}
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onOpenLogin={() => {
              setAuthError("");
              setLoginOpen(true);
            }}
            onOpenRegister={() => {
              setAuthError("");
              setRegisterOpen(true);
            }}
          />

          <div className="app__content">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleOpenItemModal={handleOpenItemModal}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                      handleOpenItemModal={handleOpenItemModal}
                      onCardLike={handleCardLike}
                      onEditProfile={openEditProfile}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>

      <Footer />

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "item-modal"}
        onClose={handleCloseModal}
        handleDeleteItem={handleDeleteItem}
      />
      <AddItemModal
        isOpen={activeModal === "add-garment-modal"}
        onClose={handleCloseModal}
        handleAddItemSubmit={handleAddItemSubmit}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={handleCloseModal}
        onRegister={handleRegister}
        isSubmitting={isSubmitting}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleCloseModal}
        onLogin={handleLogin}
        isSubmitting={isSubmitting}
        authError={authError}
        onClearError={() => setAuthError("")}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        onSubmit={handleUpdateProfile}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default App;
