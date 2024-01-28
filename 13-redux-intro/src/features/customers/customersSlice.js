import { createSlice } from "@reduxjs/toolkit";

const intitialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: intitialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateCustomer(state, action) {
      state.fullName = action.payload;
    },
  },
});
console.log(customerSlice);
export const { createCustomer, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer;
/*
export default function customerReducer(state = intitialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateCustomer":
      return { ...state, function: action.payload };

    default:
      return state;
  }
}

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

export function updateCustomer(fullName) {
  return { type: "customer/updateCustomer", payload: fullName };
}
*/
