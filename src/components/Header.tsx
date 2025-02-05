import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './header.module.css';
import logo from '../assets/logo.webp';
import Search from './Search';
import Button from '../UI/Button';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaBox } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';

type headerProps = {
  openModal: () => void;
};

function Header({ openModal }: headerProps) {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>
      <Button>
        <HiMiniSquares2X2 />
				<p>Каталог</p>
      </Button>
      <Search />
      <div className={styles.icons}>
        {user ? (
          <>
            <Link to="/profile" className={styles.icon}>
              <BsFillPersonFill />
              <p className={styles.text}>{user.username}</p>
            </Link>
            {/* <button className={styles.logoutButton} onClick={logout}>
              Выйти
            </button> */}
          </>
        ) : (
          <div className={styles.icon} onClick={openModal}>
            <BsFillPersonFill />
            <p className={styles.text}>Войти</p>
          </div>
        )}

        <Link to="/orders" className={styles.icon}>
          <FaBox />
          <p className={styles.text}>Заказы</p>
        </Link>

        <Link to="/favorites" className={styles.icon}>
          <FaHeart />
          <p className={styles.text}>Избранное</p>
        </Link>

        <Link to="/cart" className={styles.icon}>
          <FaShoppingCart />
          <p className={styles.text}>Корзина</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
