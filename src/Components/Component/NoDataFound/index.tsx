import React from 'react'
import { NoDataFoundProps } from './interfaces'
import { Image, Button } from '@Components'


function NoDataFound({ text = 'No Data Found', type = 'action', buttonText, onClick ,isButton}: NoDataFoundProps) {
    return (
        <>
            {type === 'text' && <div className="text-muted text-center" >{text}</div>}
            {type === 'action' &&
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        <div className='text-center'>
                            <p className='mb-1'><u>{text}</u></p>
                           {isButton && <Button size={'sm'} className={'text-white'} text={buttonText} onClick={onClick} />}
                        </div>
                    </div >

                </div>

            }
        </>
    );
}

export { NoDataFound }