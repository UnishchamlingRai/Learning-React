import { createSlice } from "@reduxjs/toolkit";

const intitialStateAccount = {
  balance: 0,
  loanPurpose: "",
  loan: 0,
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: intitialStateAccount,
  reducers: {
    deposite(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, loanPurpose) {
        return { payload: { amount, loanPurpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance = state.balance + action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

console.log("AccountSlice:", accountSlice);
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposite(amount, currency) {
  console.log("from:", amount);
  if (currency === "USD") {
    return { type: "account/deposite", payload: amount };
  }

  return async function (dispatch) {
    const host = "api.frankfurter.app";
    dispatch({ type: "account/convertingCrrency" });
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: "account/deposite", payload: data.rates.USD });
  };
}

console.log(requestLoan(1000, "car"));
export default accountSlice.reducer;
/*
export default function accountReducer(state = intitialStateAccount, action) {
  switch (action.type) {
    case "account/deposite":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      //   if (state.loan > 0) return state;
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
    case "account/convertingCrrency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposite(amount, currency) {
  console.log("from:", amount);
  if (currency === "USD") {
    return { type: "account/deposite", payload: amount };
  }

  return async function (dispatch) {
    const host = "api.frankfurter.app";
    dispatch({ type: "account/convertingCrrency" });
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: "account/deposite", payload: data.rates.USD });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, loanPurpose) {
  console.log("from request loan:", amount, loanPurpose);
  return {
    type: "account/requestLoan",
    payload: { amount: amount, loanPurpose: loanPurpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
