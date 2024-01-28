import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Unish",
  email: "unish@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthenticate: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticate: true };
    case "logout":
      console.log("reduer logout");
      return { ...state, user: null, isAuthenticate: false };

    default:
      throw new Error("unknown Action Type");
  }
}
const AuthenticationContext = createContext();

function AuthenticationProvider({ children }) {
  const [{ user, isAuthenticate }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log("user;", user);
  function login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      console.log("Logined");
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logOut() {
    dispatch({ type: "logout" });
    console.log("context logout");
  }
  return (
    <AuthenticationContext.Provider
      value={{ user, isAuthenticate, logOut, login }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

function useUser() {
  console.log("hello");
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "you used the AuthenticationContext outside the AuthenticationContext.Provider"
    );
  }
  return context;
}

export { useUser, AuthenticationProvider };
