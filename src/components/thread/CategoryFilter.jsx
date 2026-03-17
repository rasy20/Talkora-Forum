import styles from './CategoryFilter.module.css';

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => onSelect('')}
        className={`${styles.button} ${!selected ? styles.active : styles.inactive}`}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          onClick={() => onSelect(category)}
          className={`${styles.button} ${selected === category ? styles.active : styles.inactive}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
