import { useEffect } from "react";

function ModalWithForm({
  isOpen,
  children,
  handleSubmit,
  title,
  buttonText,
  name,
  onClose, // NEW
}) {
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
      <div
        className="modal__container modal__container_type_form"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal__title">{title}</h2>

        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          aria-label="Close"
          onClick={onClose}
        ></button>

        <form
          onSubmit={handleSubmit}
          name={name}
          id={name}
          className="modal__form"
        >
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
