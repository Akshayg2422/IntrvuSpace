import React from 'react'
import { ImageProps, ImageVariant } from './interfaces'
import { color } from '@Themes';
import { hexToHue } from '@Utils'

function Image({ variant = 'default', className, alt, size, tintColor, ...rest }: ImageProps) {

    function getVariantStyle(variant: ImageVariant) {
        let styles = ''
        switch (variant) {
            case 'default':
                styles = ''
                break;
            case 'avatar':
                styles = `avatar ${size && `avatar-${size}`}`
                break;
            case 'rounded':
                styles = `avatar ${size && `avatar-${size}`} rounded-circle`
                break;
        }
        return styles;
    }



    return (
        <img className={`${getVariantStyle(variant)} ${className} rounded-0`} alt={alt} {...rest} style={{
            ...(tintColor && { filter: `sepia(100%) hue-rotate(${hexToHue(tintColor)}deg)` }),
            objectFit: 'cover'

        }}></img>
    )
}

export { Image }