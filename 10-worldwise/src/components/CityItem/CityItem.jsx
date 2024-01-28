import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCity } from "../../contexts/CityContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCity();
  function handleClick(e) {
    e.preventDefault();
    deleteCity(city.id);
  }
  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={`${styles.cityItem} ${
          city.id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}> ({formatDate(city.date)})</time>
        <time className={styles.deleteBtn} onClick={handleClick}>
          x
        </time>
      </Link>
    </li>
  );
}

export default CityItem;
