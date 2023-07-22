import React from 'react'
import { DividerProps } from './interfaces'

function Divider({ space = '5' }: DividerProps) {
    return (
        <hr className={`my-${space}`}></hr>
    )
}
export { Divider }