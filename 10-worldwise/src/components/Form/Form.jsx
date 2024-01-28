// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../Button";
import ButtonBack from "../ButtonBack/ButtonBack";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import { useCity } from "../../contexts/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading } = useCity();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGetCityDetail, setIsLoadingGetCityDetail] = useState(false);
  const [errorGetCityDetail, setErrorGetCityDetail] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  console.log("lat:", lat, lng);

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchLocation() {
        try {
          setErrorGetCityDetail("");
          setIsLoadingGetCityDetail(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.city && !data.countryName)
            throw new Error("That does'n seems to be City.Click someware else");
          setCityName(data.city);
          setCountry(data.countryName);
          setEmoji(data.countryCode);
          console.log("data:", data);
        } catch (error) {
          console.log(error);
          setErrorGetCityDetail(error.message);
        } finally {
          setIsLoadingGetCityDetail(false);
        }
      }
      fetchLocation();
    },
    [lat, lng]
  );

  async function handlerSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      countryName: country,
      countryCode: emoji,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log("newCity:", newCity);
    await createCity(newCity);
    navigate("/app/cities");
  }
  if (!lat && !lng)
    return <Message message={"Start By Clicking Somewere Else"} />;
  if (isLoadingGetCityDetail) return <Spinner />;
  if (errorGetCityDetail) return <Message message={errorGetCityDetail} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handlerSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {emoji && <span className={styles.flag}>{convertToEmoji(emoji)}</span>}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        {/* <button>Add</button>
         */}
        <Button type="primary">Add</Button>
        <ButtonBack />

        {/* <button>&larr; Back</button> */}
      </div>
    </form>
  );
}

export default Form;
