import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ card = {}, isOpen, onClose }) {
  const { link = "", name = "", weather = "" } = card;

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (isOpen) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal${isOpen ? " modal_is-opened" : ""}`}
      onClick={onClose}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close-btn"
          type="button"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <img src={link} alt={name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__text">{name}</h2>
          <p className="modal__text">{weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
