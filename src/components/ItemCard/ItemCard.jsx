import "./ItemCard.css";

function ItemCard({ data, onCardClick }) {
  function handleOpenCard() {
    onCardClick(data);
  }

  return (
    <div className="card">
      <h2 className="card__title">{data.name}</h2>
      <img
        src={data.link}
        alt={data.name}
        className="card__image"
        onClick={handleOpenCard}
      />
    </div>
  );
}

export default ItemCard;
