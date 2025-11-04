import { useState } from "react";
import "../AuthForm/AuthForm.css";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  isSubmitting,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
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
        <h2 className="modal__text">Sign Up</h2>

        <form className="auth" onSubmit={handleSubmit}>
          <label className="auth__field">
            <span className="auth__label">Name</span>
            <input
              className="auth__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="auth__field">
            <span className="auth__label">Avatar URL</span>
            <input
              className="auth__input"
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>

          <label className="auth__field">
            <span className="auth__label">Email</span>
            <input
              className="auth__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="auth__field">
            <span className="auth__label">Password</span>
            <input
              className="auth__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            className="auth__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
