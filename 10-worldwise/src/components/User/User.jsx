import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/AuthenticateContext";
import styles from "./User.module.css";
// const user = {
//   name: "Unish",
//   email: "unish@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };
function User() {
  const { logOut, user } = useUser();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    console.log("logout");
    logOut();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
