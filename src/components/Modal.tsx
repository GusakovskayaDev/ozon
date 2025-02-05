import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      onClose();
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className={styles.modalClose}>
          ✖
        </button>
        <h2>Войти</h2>
				{error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Введите Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.modalInput}
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.modalButton} type="submit">
            Войти
          </button>
        </form>
      </motion.div>
    </div>,
    document.body
  );
};

export default Modal;
