import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../../components/PageNav/PageNav";
import { useUser } from "../../contexts/AuthenticateContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("unish@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticate } = useUser();

  const navigate = useNavigate();

  function handlerSubmit(e) {
    console.log("Login Called");
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  }

  useEffect(
    function () {
      if (isAuthenticate) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticate, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handlerSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary"> Login</Button>
        </div>
      </form>
    </main>
  );
}
