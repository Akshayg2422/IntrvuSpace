import React, { LegacyRef } from 'react'
import { InputProps } from './interfaces'
import { Input as RsInput, FormGroup } from 'reactstrap'
import { InputHeading } from '@Components'

const Input = React.forwardRef(({ id, className, heading, variant = 'default', ...rest }: InputProps, ref: any) => {
    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} />
            <RsInput ref={ref} className={`${className} ${variant !== 'default' && 'form-control-' + variant}`} id={id} {...rest} ></RsInput>
        </FormGroup>
    )
});
export { Input }
export type { InputProps }