import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

function Navbar() {
  const authContext = useContext(AuthContext);
  const logoutHandler = (event) => {
    authContext.logout();
  };
  return (
    <header>
      <nav>
        <div className={styles.brand}>
          <NavLink to="/events">Earthquake Viewer</NavLink>
        </div>
        <ul className={styles["nav-list"]}>
          {authContext.isLoggedIn && (
            <li className={styles["nav-item"]}>
              <NavLink to="/events">Events</NavLink>
            </li>
          )}
          <li className={styles["nav-item"]}>
            <NavLink to="/about">About</NavLink>
          </li>
          {authContext.isLoggedIn && (
            <li className={styles["nav-item"]}>
              <NavLink to="/" onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
