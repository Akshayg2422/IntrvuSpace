import React, { forwardRef } from 'react'
import { InputHeadingProps } from './interfaces'
const InputHeading = forwardRef(({ heading, id }: InputHeadingProps, ref) => {
    return (
        <>
            {heading && <label htmlFor={id} className={'form-control-label'}>{heading}</label>}
        </>
    )
})

export { InputHeading }
export type { InputHeadingProps }
