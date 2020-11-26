const Button = ({
  children, onClick,
}) => {
  return (
    <>
      <button type="submit" onClick={onClick}>{children}</button>
      <style jsx>
        {`
          button {
            min-width: 100%;
            max-width: 100%;
            height: 25px;
            border-radius: 7px;
            border: 1px solid grey;
            padding: 0 5px;
            margin: 5px 0;
          }
          button:hover {
            background: grey;
            color: white;
          }
          button:focus {
            background: #0172b5ab;
            color: white;
            outline: none;
          }
        `}
      </style>
    </>
  );
};

export default Button;
