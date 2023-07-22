import React from "react";
import { OtpInputProps } from "./interfaces";
import { Input as RsInput } from 'reactstrap'

const OtpInput = React.forwardRef(({ ...props }: OtpInputProps, ref: any) => {
  return (
    <RsInput
      ref={ref}
      {...props}
      className={'text-center bg-secondary ml-2 font-weight-bold mb-0 form-control'}
      maxLength={1}
      type={'number'}
      style={{ width: "50px", height: "50px", fontSize: "16px" }} />
  );
});

export { OtpInput };
