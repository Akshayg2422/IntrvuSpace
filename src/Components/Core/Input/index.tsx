import { InputHeading } from '@Components';
import React from 'react';
import { FormGroup, Input as RsInput } from 'reactstrap';
import { InputProps } from './interfaces';

const Input = React.forwardRef(({ id, className, heading, variant = 'default', isMandatory, ...rest }: InputProps, ref: any) => {
    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} isMandatory={isMandatory} />
            <RsInput ref={ref} className={`${className} ${variant !== 'default' && 'form-control-' + variant} text-black rounded-0`} id={id} {...rest} ></RsInput>
        </FormGroup>
    )
});
export { Input };
export type { InputProps };
