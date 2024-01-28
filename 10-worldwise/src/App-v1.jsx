import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product/Product";
import Homepage from "./pages/HomePage/Homepage";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import { useEffect, useState } from "react";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
const BASE_URL = "http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(cities);
  console.log(isLoading);
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("something worng erro...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route path="cities/:id" element={<City />} />
            {/* <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            /> */}
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="country"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
