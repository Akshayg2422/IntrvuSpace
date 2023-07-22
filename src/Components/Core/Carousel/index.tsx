import React from 'react'
import { SliderProps } from './interface'
import { Carousel } from 'react-responsive-carousel';
import {Image} from '@Components'
// import {getImageUri} from '@utils'

function Slider({ images, isServer = true, ...props }: SliderProps) {
    return(
    <Carousel >
        {
            images.map(item => {
                return <Image />
            })
        }

    </Carousel>

)

}
export { Slider };
