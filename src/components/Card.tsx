import type { Product } from '../store/productSlice';
import { Link } from 'react-router-dom';
import styles from './card.module.css';
import { FaStar } from 'react-icons/fa';
import { GiNothingToSay } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

interface CardProps {
  product: Product;
}

function Card({ product }: CardProps) {

	const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem ? cartItem.quantity : 0;
  const price = product.price * 100 - 3;
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <FaHeart className={styles.favorite} />
      <img className={styles.image} src={product.image} alt="image goods" />
      <div className={styles.text}>
        <h3 className={styles.price}>{price} &#8381;</h3>
        <p className={styles.sale}>{price * 2} &#8381;</p>
        <p className={styles.procent}>-50 &#37;</p>
      </div>
      <p className={styles.title}>
        {product.title.length > 16
          ? product.title.slice(0, 28) + '...'
          : product.title}
      </p>

      <div className={styles.grades}>
        <FaStar className={styles.star} />
        <p className={styles.rating}>{product.rating.rate}</p>
        <GiNothingToSay className={styles.convers} />
        <p className={styles.review}>{product.rating.count} отзывов</p>
      </div>

			{quantity > 0 && <span className={styles.counter}>{quantity}</span>}
    </Link>
  );
}

export default Card;
