import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose }) {
  const { values, handleChange } = useForm({ name: "", weather: "hot" });

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
      name="add-garment-form"
      onClose={onClose}
      handleSubmit={(e) => {
        e.preventDefault();
        handleCloseModal();
      }}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="add-garment-name-input" className="modal__label">
          Name
          <input
            id="add-garment-name-input"
            type="text"
            className="modal__input"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        {/* ADD: other input (dont forget type) */}
        <label htmlFor="add-garment-image-input" className="modal__label">
          Image
          <input
            id="add-garment-image-input"
            type="url"
            name="link"
            className="modal__input"
            required
            placeholder="Image URL"
            inputMode="url"
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select weather type:</legend>

        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label className="modal__label modal__label_type_radio" htmlFor="hot">
            Hot
          </label>
        </div>

        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="warm"
          >
            Warm
          </label>
        </div>

        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="cold"
          >
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
