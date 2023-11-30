import React from 'react'
import { ScreenHeadingProps } from './interfaces'
import { useNavigation } from '@Hooks'
import { Image } from '@Components'
import { icons } from '@Assets'
import './index.css'

function ScreenHeading({ text, subtitle, children }: ScreenHeadingProps) {

    const { goBack } = useNavigation()



    return (

        <div className={'mb-4'} >
            <div className={'d-flex'}>
                <div className="screen-heading col-auto m-0 p-0 d-flex align-items-center" style={{ position: 'relative' }}>
                    <div
                        className='pointer back-btn-container'
                        onClick={() => { goBack() }}
                    >
                        <Image
                            className={'btn-image-container'}
                            src={icons.backButton}
                        />
                    </div>
                    <div className='m-0'>
                        {text}
                    </div>
                </div>
                <div className={'col'}>{children}</div>
            </div>

            <div className={'text-secondary'}>
                {subtitle}
            </div>
        </div >
    )
}

export { ScreenHeading }