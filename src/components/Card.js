import styles from "./Card.module.css";

function Card(props) {
  const header = props.title ? (
    <p className={styles.title}>
      {props.title}
    </p>
  ) : (
    ""
  );
  const footer = props.footer ? (
    <p className={styles.footer}>
      {props.footer}
    </p>
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
