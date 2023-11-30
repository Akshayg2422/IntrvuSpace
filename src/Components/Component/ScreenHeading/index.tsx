import React from 'react'
import { ScreenHeadingProps } from './interfaces'
import { useNavigation } from '@Hooks'
import { Image } from '@Components'
import { icons } from '@Assets'

function ScreenHeading({ text, subtitle, children }: ScreenHeadingProps) {

    const { goBack } = useNavigation()

    return (

        <div className={'mb-4'} >
            <div className="row">
                <div className="screen-heading d-flex align-items-center col-4 m-0 p-0">
                    <span className={'ml-md--3 pr-md-4 pr-sm-0 pr-2 d-flex align-items-center'}>
                        <Image
                            className="pointer"
                            src={icons.backButton}
                            height={12}
                            onClick={() => { goBack() }} />
                    </span>
                    {text}
                </div>
                <div className={'col-8'}>{children}</div>
            </div>
            <div className={'text-secondary'}>
                {subtitle}
            </div>
        </div>
    )
}

export { ScreenHeading }