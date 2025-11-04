import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  onCardLike, // NEW passthrough
}) {
  return (
    <section className="clothes">
      <div className="clothes__header">
        <h2 className="clothes__title">Your items</h2>
        <button
          className="clothes__add-btn"
          onClick={handleOpenAddGarmentModal}
        >
          + Add clothes
        </button>
      </div>

      <ul className="clothes__list">
        {clothingItems.map((item) => (
          <li key={item._id} className="clothes__list-item">
            <ItemCard
              data={item}
              onCardClick={handleOpenItemModal}
              onCardLike={onCardLike} // NEW
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
