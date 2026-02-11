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
          {/* LEFT SIDE TEXT */}
          <div className="modal__footer-text">
            <p className="modal__text">{card?.name}</p>
            <p className="modal__text modal__text_type_caption">
              Weather: {card?.weather}
            </p>
          </div>

          {/* RIGHT SIDE DELETE */}
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
