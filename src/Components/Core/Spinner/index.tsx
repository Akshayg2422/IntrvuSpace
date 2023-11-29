import React from 'react'
import { SpinnerProps } from './interfaces'
import { Spinner as RsSpinner } from 'reactstrap'
import './style.scss'

function Spinner({ color = 'primary', spinner = true, className, size = 'sm' }: SpinnerProps) {
    return (
        <div className = {className}>
            {spinner ?

                <RsSpinner className={className} color={color} size={size} >
                    Loading...
                </RsSpinner>
                :
                <span className="loader"></span>

            }
        </div>
    )
}

export { Spinner }