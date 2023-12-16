import React from 'react'
import { ScreenHeadingProps } from './interfaces'
import { useNavigation } from '@Hooks'
import { Image } from '@Components'
import { icons } from '@Assets'
import './index.css'

function ScreenHeading({ text, subtitle, children }: ScreenHeadingProps) {

    const { goBack } = useNavigation()



    return (

        <div className={'heading-wrapper'} >
            <div className={'d-flex align-items-center'}>
                <div>
                    <div className="screen-heading  m-0 p-0 d-flex align-items-center" style={{ position: 'relative' }}>
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
                    <div className={'text-secondary'}>
                        {subtitle}
                    </div>
                </div>
            </div>
            <div 
            style={{
                flex:1,
            }}>{children}</div>
        </div >
    )
}

export { ScreenHeading }