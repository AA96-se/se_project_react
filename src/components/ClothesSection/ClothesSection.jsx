import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleOpenItemModal }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text"> Your items </p>
        <button className="clothes-section__btn">+ Add new</button>
      </div>
      <ul className="clothes-section__card-list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            data={item}
            onCardClick={handleOpenItemModal}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
