import { useCity } from "../../contexts/CityContext";
import CountryItem from "../CountryItem/CountryItem";
import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";
function CountryList() {
  const { cities, isLoading } = useCity();
  // console.log(cities);
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, currCity) => {
    if (!arr.map((el) => el.country).includes(currCity.country)) {
      return [...arr, { country: currCity.country, emoji: currCity.emoji }];
    } else {
      return arr;
    }
  }, []);
  console.log(countries);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
