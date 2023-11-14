import React from 'react'
import { NoDataFoundProps } from './interfaces'



function NoDataFound({ text = 'No Data Found', type = 'text', buttonText, onClick, isButton }: NoDataFoundProps) {
    return (
        <div>
            {type === 'text' && <div className={'screen-des'} >{text}</div>}
        </div>
    );
}

export { NoDataFound }