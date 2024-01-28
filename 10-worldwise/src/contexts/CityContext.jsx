/* eslint-disable react-refresh/only-export-components */
import { useEffect, useReducer, useCallback } from "react";
import { useContext } from "react";

import { createContext } from "react";

const BASE_URL = "http://localhost:9000";
//1) Create A context
const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: true,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/getCurrentCity":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/create":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejectedError":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown Action Type");
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  // console.log(cities);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.log("error in fetching cities:", error);
        alert("error in fetching cities");
      }
    }
    fetchData();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      console.log(Number(id), typeof currentCity.id);
      if (Number(id) === currentCity.id) return;
      // if()
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        // console.log("data:", data);
        dispatch({ type: "city/getCurrentCity", payload: data });
      } catch (error) {
        alert("Error geting City");
        dispatch({ type: "rejectedError", payload: error.message });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "post",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const addNewCity = await res.json();

      dispatch({ type: "city/create", payload: addNewCity });
    } catch (error) {
      alert("Error in Creating City");
      dispatch({ type: "rejectedError", payload: error.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "delete",
      });
      const deletedCity = await res.json();
      console.log("Delete:", deletedCity);
      // setCities((currCities) => currCities.filter((city) => city.id !== id));
      dispatch({ type: "city/delete", payload: id });
    } catch (error) {
      alert("Error in Deleting City");
      dispatch({ type: "rejectedError", payload: error.message });
    }
  }

  //provide a value to Child
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CityContext is used Outside the Provider");
  return context;
}

export { CityProvider, useCity };
