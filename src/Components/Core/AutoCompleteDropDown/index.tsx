import React from "react";
import { AutoCompleteProps } from "./interfaces";
import Autocomplete from "react-autocomplete";
import { FormGroup, Input } from "reactstrap";
import { InputHeading } from "@Components";
import {
  matchStateToTerm,
} from "@Utils";

function AutoCompleteDropDown({
  value,
  item,
  onSelect,
  shouldItemRender,
  onChange,
  getItemValue,
  heading,
}: AutoCompleteProps) {
  return (

    <Autocomplete
      value={value}
      items={item}
      renderInput={(props) => (
        <div>
          <label className={'form-control-label'}>{heading}</label>
          <input className="form-control-default" {...props} />
        </div>
      )}
      getItemValue={(item) => item?.name}
      shouldItemRender={matchStateToTerm}
      onChange={onChange}
      onSelect={onSelect}
      renderItem={(item, isHighlighted) => (
        <div
          style={{
            background: isHighlighted ? "white" : "white",
          }}
          className="p-3"
          key={item?.id}
        >
          {item?.name}
        </div>
      )}
    />

  );
}

export { AutoCompleteDropDown };
