import styles from "./Card.module.css";

function Card(props) {
  const header = props.title ? (
    <li className={styles.title}>{props.title}</li>
  ) : (
    ""
  );
  const footer = props.footer ? (
    <li className={styles.footer}>{props.footer}</li>
  ) : (
    ""
  );

  return (
    <div className={styles.card}>
      <ul>
        {header}
        <li className={styles.body}>{props.children}</li>
        {footer}
      </ul>
    </div>
  );
}

export default Card;
