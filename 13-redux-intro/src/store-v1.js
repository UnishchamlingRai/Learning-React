import { combineReducers, createStore } from "redux";
const intitialStateAccount = {
  balance: 0,
  loanPurpose: "",
  loan: 0,
};

const intitialStateCostumer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function costumerReducer(state = intitialStateCostumer, action) {
  switch (action.type) {
    case "costumer/createCostumer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "costumer/updateCostumer":
      return { ...state, function: action.payload };

    default:
      return state;
  }
}

function accountReducer(state = intitialStateAccount, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  costumer: costumerReducer,
});
console.log("RootReducer:", rootReducer);
const store = createStore(rootReducer);
console.log("store:", store);
// store.dispatch({ type: "account/deposite", payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, loanPurpose: "to buy a car" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan", payload: 1000 });
// console.log(store.getState());
// const ACCOUNT_DEPOSIT='account/deposite'

function deposite(amount) {
  return { type: "account/deposite", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, loanPurpose: loanPurpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

function createCostumer(fullName, nationalId) {
  return {
    type: "costumer/createCostumer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateCostumer(fullName) {
  return { type: "costumer/updateCostumer", payload: fullName };
}

console.log("store:", store);
store.dispatch(deposite(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(1000, "buy a car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCostumer("Unish Rai", "233434"));
console.log(store.getState());
