import styles from './search.module.css';
import { IoSearch } from 'react-icons/io5';
import Button from '../UI/Button';

function Search() {
  return (
    <div className={styles.search}>
      <input className={styles.searchInput}></input>
      <Button className={styles.searchBtn} pure>
        <IoSearch />
      </Button>
    </div>
  );
}

export default Search;
