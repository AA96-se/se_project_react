import { useEffect, useState } from "react";
import "../AuthForm/AuthForm.css";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  isSubmitting,
  authError = "",
  onClearError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Optional: reset fields each time modal opens
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      onClearError?.();
    }
  }, [isOpen, onClearError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (authError) onClearError?.();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (authError) onClearError?.();
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
        <h2 className="modal__title">Log in</h2>

        <form className="auth" onSubmit={handleSubmit} noValidate>
          <label className="auth__field">
            <span className="auth__label">Email</span>
            <input
              className="auth__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>

          <label className="auth__field">
            <span className="auth__label">Password</span>
            <input
              className="auth__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>

          {authError && <p className="auth__error">{authError}</p>}

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
