import React, { useState } from "react";
import { Option } from '@Components'

const useDropDown = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (option: Option) => {
    setValue(option);
  };

  const set = (value: any) => {
    setValue(value)
  }

  
  

  return {
    value,
    onChange: handleChange,
    set
  }
};

export { useDropDown };

