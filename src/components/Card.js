import cardStyles from "./Card.module.css";

function Card(props) {
  const header = props.title ? (
    <li className={cardStyles.title}>{props.title}</li>
  ) : (
    ""
  );
  const footer = props.footer ? (
    <li className={cardStyles.footer}>{props.footer}</li>
  ) : (
    ""
  );

  return (
    <div className={cardStyles.card}>
      <ul>
        {header}
        <li className={cardStyles.body}>{props.children}</li>
        {footer}
      </ul>
    </div>
  );
}

export default Card;
