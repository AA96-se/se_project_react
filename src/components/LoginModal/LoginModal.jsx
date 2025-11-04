import { useState } from "react";
import "../AuthForm/AuthForm.css";

export default function LoginModal({ isOpen, onClose, onLogin, isSubmitting }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
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
        <h2 className="modal__text">Log in</h2>

        <form className="auth" onSubmit={handleSubmit}>
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
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
