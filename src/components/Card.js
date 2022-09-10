function Card(props) {
  const titleStyle = {
    'marginBottom': '1rem'
  }
  const header = props.title ? (
    <div style={titleStyle}>
        {props.title}
    </div>
  ) : (
    ""
  );
  const footer = props.footer ? (
    <div style={{padding: "0.5em"}}>
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
