import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ data, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser?._id);

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
      <div className="card__header">
        <h2 className="card__title">{data.name}</h2>

        <button
          type="button"
          className={likeBtnClass}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Unlike item" : "Like item"}
          onClick={handleLike}
        />
      </div>

      <img
        src={data.imageUrl}
        alt={data.name}
        className="card__image"
        onClick={handleOpenCard}
      />
    </div>
  );
}

export default ItemCard;
