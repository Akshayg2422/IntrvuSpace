import React from 'react'
import { ScreenHeadingProps } from './interfaces'
import { useNavigation } from '@Hooks'
import { Image } from '@Components'
import { icons } from '@Assets'

function ScreenHeading({ text, subtitle, children }: ScreenHeadingProps) {

    const { goBack } = useNavigation()

    return (

        <div className={'mb-4'} >
            <div className={'d-flex'}>
                <div className="screen-heading col-auto m-0 p-0 d-flex align-items-center" style={{ position: 'relative' }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-40px',
                            transform: 'translate(0, -57%)'
                        }}>
                        <Image
                            src={icons.backButton}
                            height={15}
                            width={15}
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                    <div>
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