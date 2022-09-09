function Card(props) {
  const titleStyle = {
    'margin-bottom': '1rem'
  }
  const header = props.title ? (
    <div style={titleStyle}>
        {props.title}
    </div>
  ) : (
    ""
  );
  const footer = props.footer ? (
    <div >
      {props.footer}
    </div>
  ) : (
    ""
  );

  return (
    <div >
        {header}
      <div >
        {props.children}
      </div>
        {footer}
    </div>
  );
}

export default Card;
