import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/cartSlice';
import styles from './cartPage.module.css';

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={styles.cartPage}>
      <h2>Корзина</h2>

      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.details}>
                <h3>{item.title}</h3>
                <p>Цена: {item.price * 100 - 3} &#8381;</p>
                <p>Количество: {item.quantity}</p>
                <button
                  className={styles.removeButton}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;