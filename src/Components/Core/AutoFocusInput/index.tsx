import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { InputHeading } from '@Components';
import { AutoFocusInputProps } from './interfaces';
import { FormGroup, Input as RsInput } from 'reactstrap';

const AutoFocusInput = React.forwardRef(({ id, className, heading, variant = 'default', isMandatory, textColor, noSpace, ...rest }: AutoFocusInputProps, ref) => {

  const inputRef = useRef<any>(null);

  useEffect(() => {

    if (ref) {
      inputRef.current.focus();
    }
  }, [ref]);

  return (

    <FormGroup className={noSpace ? 'm-0 b-0' : ''}>
      <InputHeading heading={heading} id={id} isMandatory={isMandatory} />
      <RsInput
        innerRef={inputRef}
        className={`${className} ${variant !== 'default' && 'form-control-' + variant} form-control-md`}
        id={id}
        {...rest}
        onWheel={(event) => event.currentTarget.blur()}
      ></RsInput>
    </FormGroup>


  );
});
export { AutoFocusInput };


