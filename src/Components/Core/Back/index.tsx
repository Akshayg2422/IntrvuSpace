import React from 'react'
import { Image } from '@Components'
import { icons } from '@Assets'
import { BackProps } from './interfaces'
import { useNavigation } from '@Hooks'
function Back({ variant = 'default', icon = icons.backButton, h = 16, w = 16, onClick }: BackProps) {

    const { goBack } = useNavigation()
    return (
        <div onClick={() => {
            if (variant === 'default') {
                goBack()
            } else if (variant === 'override') {
                if (onClick) {
                    onClick();
                }
            }

        }} className='pointer d-flex align-items-center'>
            <Image src={icon} height={h} width={w} style={{
                objectFit: 'contain',
            }} />
        </div>
    )
}

export { Back }