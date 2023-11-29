import React from "react";
import { DropDownProp } from "./interfaces";
const DropDownIcon = ({
  heading,
  placeholder,
  data,
  error,
  onChange,
  name,
  value,
  title,
  id,
  className,
  disabled = false,
  style,
  ...props
}: DropDownProp) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === placeholder) {
      return "";
    }
    if (onChange) onChange(event);
  };
  return (
    <div>
      {heading && <label className="form-control-label">{heading}</label>}
      <select
        value={value}
        className={`form-control form-select ${className}`}
        {...props}
        onChange={handleSelectChange}
        name={name}
        disabled={disabled}
        style={{ ...style }}
      >
        {placeholder && <option>{placeholder}</option>}
        {data && data.length > 0 ? (
          data.map((item, index) => (
            //    <option value="fa fa-building " className="fa ">&#xf1ad; building</option>
            <option
              className={`dropdown-item text-${item.color || "default"}`}
              key={index}
              value={item.id || item.type}
            >
              {item.name ? item.name : item.group_name} {item.title}
            </option>
          ))
        ) : (
          <option disabled>{"--- No Record Found ---"}</option>
        )}
      </select>
      {error && <code className="text-danger">{error}</code>}
    </div>


  );
};

export { DropDownIcon };
