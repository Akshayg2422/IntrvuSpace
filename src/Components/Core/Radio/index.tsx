import React, { useEffect, useState } from "react";
import { RadioProps, RadioItem } from "./interfaces";
import { Form, Row, Col } from "reactstrap";

function Radio({
  data,
  selected,
  onRadioChange,
  variant = 'row',
  disableId,
  selectItem,
  ...rest
}: RadioProps) {

  function onChangeHandler(selected: RadioItem) {
    if (onRadioChange) {
      onRadioChange(selected);
    }
  }


  function renderContent() {
    return (
      <>
        {data?.map((item: RadioItem, index: number) => {
          const { id, text, subText } = item;
          let isSelected: boolean = false;
          const disable = disableId?.some(each => each.id === item.id)

          if (selectItem) {
            isSelected = item.id === selectItem.id;
          }

          return (
            <div
              key={id}
              className={`custom-control custom-radio  mb-2 ${variant === 'row' && index !== 0 ? 'ml-4' : 'ml-0'} align-items-center mt-1`}
            >
              <input
                className={'custom-control-input'}
                id={id}
                name={id}
                disabled={disable}
                type={'radio'}
                onChange={() => onChangeHandler(item)}
                checked={isSelected}
                {...rest}
              />
              <label className={'custom-control-label mb-0'} htmlFor={id}>
                <span >{text}</span>
              </label>
              <div className={'d-flex justify-content-end'}>
                <span style={{ fontSize: '8px', fontWeight: '500' }}>{subText}</span>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  return (
    <Form>
      {variant === 'row' && <Row className={'ml-1'}>{renderContent()}</Row>}
      {variant === 'column' && renderContent()}
    </Form>
  );
}

export { Radio };
export type { RadioItem };