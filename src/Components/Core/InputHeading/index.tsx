import React, { forwardRef } from 'react'
import { InputHeadingProps } from './interfaces'
const InputHeading = forwardRef(({ heading, Class, id, isMandatory = false }: InputHeadingProps, ref) => {
    return (
        <>
            {heading && <label htmlFor={id} className={`form-control-label ${Class} `}>{heading}
                {
                    isMandatory && <label htmlFor={id} className={`form-control-label ${Class}  ml-1`}>{"*"}</label>
                }
            </label>}
        </>
    )
})

export { InputHeading }
export type { InputHeadingProps }
