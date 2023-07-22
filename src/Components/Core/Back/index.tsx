import React from 'react'
import { Image } from '@Components'
import { icons } from '@Assets'
import { BackProps } from './interfaces'
import { useNavigation } from '@Hooks'
function Back({ icon = icons.backArrow }: BackProps) {
    const { goBack } = useNavigation()
    return (
        <div onClick={() => { goBack() }} className='pointer'>
            <Image src={icon} width={20} height={20} />
        </div>
    )
}

export { Back }