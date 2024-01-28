// import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customersSlice";
import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export { store };
