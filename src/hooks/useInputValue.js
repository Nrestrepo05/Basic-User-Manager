import { useEffect, useState } from 'react';

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e) => setValue(e.target.value);

  return { value, onChange };
};

export default useInputValue;
