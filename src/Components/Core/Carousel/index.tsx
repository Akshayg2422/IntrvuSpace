import React from 'react'
import { SliderProps } from './interface'
import { Carousel as RsCarousel } from 'react-responsive-carousel';
import { Image } from '@Components'
// import {getImageUri} from '@utils'

function Carousel({ images, isServer = true, ...props }: SliderProps) {
    return (
        <RsCarousel>
            {
                images.map(item => {
                    return <Image />
                })
            }

        </RsCarousel>
    )

}
export { Carousel };
