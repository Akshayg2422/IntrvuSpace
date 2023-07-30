import React from 'react'
import { SpinnerProps } from './interfaces'
import { Spinner as RsSpinner } from 'reactstrap'
import './style.scss'

function Spinner({ color = 'black', spinner = true }: SpinnerProps) {
    return (
        <>
            {spinner ?

                <RsSpinner className='' color={color} size={'md'} >
                    Loading...
                </RsSpinner>
                :
                <span className="loader"></span>

            }
        </>
    )
}

export { Spinner }