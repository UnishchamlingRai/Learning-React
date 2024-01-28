import { useCity } from "../../contexts/CityContext";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";
function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first Travel List" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
