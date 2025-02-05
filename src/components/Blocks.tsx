import Card from './Card';
import styles from './blocks.module.css';
import type { Product } from '../store/productSlice';

type BlocksProps = {
  title: string;
  products: Product[];
};

function Blocks({ title, products }: BlocksProps) {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.goods}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Blocks;
