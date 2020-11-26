const Input = ({
  name, placeholder, value, onChange,
}) => {
  return (
    <>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <style jsx>
        {`
          input {
            min-width: calc(100% - 12px);
            max-width: 100%;
            height: 25px;
            border-radius: 7px;
            border: 1px solid grey;
            padding: 0 5px;
            margin: 5px 0;
          }
        `}
      </style>
    </>
  );
};

export default Input;
