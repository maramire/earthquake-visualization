import styles from "./Card.module.css";

function Card(props) {
  const header = props.title ? (
    <div className={styles.title}>
      <p>
        {props.title}
      </p>
    </div>
  ) : (
    ""
  );
  const footer = props.footer ? (
    <div className={styles.footer}>
      {props.footer}
    </div>
  ) : (
    ""
  );

  return (
    <div className={styles.card}>
        {header}
      <div className={styles.body}>
        {props.children}
      </div>
        {footer}
    </div>
  );
}

export default Card;
