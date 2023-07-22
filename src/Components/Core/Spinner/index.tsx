import React from 'react'
import { SpinnerProps } from './interfaces'
import { Spinner as RsSpinner } from 'reactstrap'

function Spinner({ color = 'black' }: SpinnerProps) {
    return (
        <RsSpinner color={color} size={'sm'} >
            Loading...
        </RsSpinner>
    )
}

export { Spinner }