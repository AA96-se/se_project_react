import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  // handle both possible shapes: owner string OR owner object
  const ownerId =
    typeof card?.owner === "string" ? card.owner : card?.owner?._id;
  const isOwn = Boolean(currentUser?._id && ownerId === currentUser._id);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleDeleteClick() {
    handleDeleteItem?.(card);
  }

  const weatherLabel = card?.weather ?? ""; // "hot" | "warm" | "cold" (or whatever your API sends)

  return (
    <div className="modal modal_is-opened" onClick={handleOverlayClick}>
      <div
        className="modal__container modal__container_type_preview"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close-btn modal__close-btn_type_preview"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />

        <img src={card?.imageUrl} alt={card?.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__footer-text">
            <p className="modal__text modal__text_type_title">{card?.name}</p>
            <p className="modal__text modal__text_type_caption">
              {weatherLabel ? `Weather: ${weatherLabel}` : ""}
            </p>
          </div>

          {isOwn && (
            <button
              className="modal__delete-button"
              type="button"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
