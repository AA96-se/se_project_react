import { useState, useEffect } from "react";
import "../AuthForm/AuthForm.css";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  isSubmitting,
  onOpenRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setEmail("");
    setPassword("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  function handleSwitch() {
    onOpenRegister?.();
  }

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
          className="modal__close-btn modal__close-btn_type_form"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <h2 className="modal__title">Log in</h2>

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

          <div className="auth__actions">
            <button
              className="auth__submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>

            <button
              className="auth__switch"
              type="button"
              onClick={handleSwitch}
              disabled={isSubmitting}
            >
              or Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
