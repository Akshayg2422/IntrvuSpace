import React from 'react'
import { SpinnerProps } from './interfaces'
import { Spinner as RsSpinner } from 'reactstrap'
import './style.scss'

function Spinner({ color = 'black', spinner = true, className }: SpinnerProps) {
    return (
        <>
            {spinner ?

                <RsSpinner className={className} color={color} size={'sm'} >
                    Loading...
                </RsSpinner>
                :
                <span className="loader"></span>

            }
        </>
    )
}

export { Spinner }