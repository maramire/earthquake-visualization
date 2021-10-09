import { useRef } from "react";
import styles from "./LoginForm.module.css";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

function LoginForm() {
  const email = useRef();
  const password = useRef();
  const authContext = useContext(AuthContext);
  const { fetchData } = useFetch();

  const loginHandler = async (event) => {
    event.preventDefault();
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetchData(url, options).then((data) => {
      authContext.login(data);
    });
  };

  return (
    <form className={styles.form} onSubmit={loginHandler}>
      <div className={styles.control}>
        <input
          ref={email}
          type="email"
          id="email"
          name="email"
          placeholder="Correo electrónico"
        />
      </div>
      <div className={styles.control}>
        <input
          ref={password}
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
