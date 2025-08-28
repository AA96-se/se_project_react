import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  return (
    <div className="app">
      <Header />
      <Main clothingItems={clothingItems} />
      <Footer />
    </div>
  );
}

export default App;
