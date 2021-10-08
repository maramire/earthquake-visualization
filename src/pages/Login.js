import { Fragment } from "react";
import styles from "./Login.module.css";
import Card from "../components/Card";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <Fragment>
      <div className={styles.main}>
        <h1>Login</h1>
      </div>
      <div className={styles["section-two"]}>
        <Card title="Login">
          <LoginForm />
        </Card>
      </div>
    </Fragment>
  );
}

export default Login;
