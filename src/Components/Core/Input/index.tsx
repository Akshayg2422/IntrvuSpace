import React from 'react'
import { InputProps } from './interfaces'
import { Input as RsInput, FormGroup } from 'reactstrap'
import { InputHeading } from '@Components'


const Input = React.forwardRef(({ id, className, heading, variant = 'default', isMandatory, ...rest }: InputProps, ref: any) => {
    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} isMandatory={isMandatory} />
            <RsInput ref={ref} className={`${className} ${variant !== 'default' && 'form-control-' + variant} text-black`} style={{overflowY: 'hidden'}} id={id} {...rest} ></RsInput>
        </FormGroup>
    )
});
export { Input }
export type { InputProps }