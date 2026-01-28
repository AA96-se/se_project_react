import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name ?? "");
      setAvatar(currentUser.avatar ?? "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__container modal__container_type_form"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close-btn"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <h2 className="modal__text">Edit profile</h2>

        <form className="profile-edit" onSubmit={handleSubmit}>
          <label className="profile-edit__field">
            <span className="profile-edit__label">Name</span>
            <input
              className="profile-edit__input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="profile-edit__field">
            <span className="profile-edit__label">Avatar URL</span>
            <input
              className="profile-edit__input"
              type="url"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>

          <button
            className="profile-edit__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
