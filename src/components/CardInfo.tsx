import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from './cardInfo.module.css';
import Button from '../UI/Button';
import { FaHeart } from 'react-icons/fa';

const ProductPage = () => {
  const { id } = useParams();

  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <p>Товар не найден!</p>;
  }

  return (
    <div className={styles.cardInfo}>
      <img className={styles.img} src={product.image} alt={product.title} />
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
				<p>{product.title}</p>
				<h2 className={styles.price}>{product.price}</h2>
      </div>
      <div className={styles.actions}>
        <div className={styles.btns}>
          <Button>Добавить в корзину</Button>
          <button className={styles.favorite}><FaHeart/></button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
