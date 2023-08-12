import React from 'react'
import { DividerProps } from './interfaces'

function Divider({ space = '5', className }: DividerProps) {
    return (
        <hr className={`my-${space} ${className}`}></hr>
    )
}
export { Divider }