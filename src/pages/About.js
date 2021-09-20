import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.main}>
      <h1>About</h1>
      <p>
        Earthquake viewer is a basic (non-responsive yet) website created with
        frontend framework React for learning purposes. It uses the API provided
        by USGS to track the most recent events ocurred in a certain place.
      </p>
    </div>
  );
}

export default About;
