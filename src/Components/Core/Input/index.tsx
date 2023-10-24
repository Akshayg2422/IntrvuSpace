import { InputHeading } from '@Components';
import React from 'react';
import { FormGroup, Input as RsInput } from 'reactstrap';
import { InputProps } from './interfaces';

const Input = React.forwardRef(({ id, className, heading, variant = 'default', isMandatory,textColor, ...rest }: InputProps, ref: any) => {
    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} isMandatory={isMandatory} />
            <RsInput style={{borderRadius: 4}} ref={ref} className={`${className} ${variant !== 'default' && 'form-control-' + variant} text-black rounded-sm`} id={id} {...rest} ></RsInput>
        </FormGroup>
    )
});
export { Input };
export type { InputProps };
