import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ data, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser?._id);

  // likes should be array of user id strings
  const isLiked = useMemo(() => {
    if (!isLoggedIn) return false;
    return (
      Array.isArray(data.likes) &&
      data.likes.some((id) => id === currentUser._id)
    );
  }, [data.likes, currentUser?._id, isLoggedIn]);

  function handleOpenCard() {
    onCardClick?.(data);
  }

  function handleLike() {
    if (!isLoggedIn) return;
    onCardLike?.({ id: data._id, isLiked });
  }

  const likeBtnClass = [
    "card__like",
    !isLoggedIn ? "card__like_hidden" : "",
    isLiked ? "card__like_active" : "",
  ]
    .join(" ")
    .trim();

  return (
    <div className="card">
      <h2 className="card__title">{data.name}</h2>
      <img
        src={data.imageUrl}
        alt={data.name}
        className="card__image"
        onClick={handleOpenCard}
      />

      {/* Like toggle (hidden for guests) */}
      <button
        type="button"
        className={likeBtnClass}
        aria-pressed={isLiked}
        onClick={handleLike}
      >
        ♥
      </button>
    </div>
  );
}

export default ItemCard;
