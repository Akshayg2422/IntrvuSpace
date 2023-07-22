import React from 'react'
import { ImageProps, ImageVariant } from './interfaces'
function Image({ variant = 'default', className, alt, size, ...rest }: ImageProps) {

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
        <img className={`${getVariantStyle(variant)} ${className}`} alt={alt} {...rest}></img>
    )
}

export { Image }