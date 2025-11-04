import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser?._id && card?.owner === currentUser._id;

  const deleteBtnClass = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close-btn"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <img src={card?.imageUrl} alt={card?.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__text">{card?.name}</p>

          {/* Only owner sees this button */}
          <button
            className={deleteBtnClass}
            type="button"
            onClick={() => handleDeleteItem(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
