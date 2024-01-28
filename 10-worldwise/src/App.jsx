import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
// import Product from "./pages/Product/Product";
// import Homepage from "./pages/HomePage/Homepage";
// import Pricing from "./pages/Pricing/Pricing";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
// import AppLayout from "./pages/AppLayout/AppLayout";
// import Login from "./pages/Login/Login";

const Product = lazy(() => import("./pages/Product/Product"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const Login = lazy(() => import("./pages/Login/Login"));

import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CityProvider } from "./contexts/CityContext";
import { AuthenticationProvider } from "./contexts/AuthenticateContext";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";
// import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <AuthenticationProvider>
        <CityProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="cities/:id" element={<City />} />
                  {/* <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            /> */}
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="country" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CityProvider>
      </AuthenticationProvider>
    </>
  );
}

export default App;
