import React from 'react'
import { ProfilePhotoProps } from './interfaces'
import { Image } from '@Components'
import { icons } from '@Assets'
import { getPhoto } from '@Utils'
import { PhotoProvider, PhotoView } from "react-photo-view";

import './index.css';

function ProfilePhoto({ photo }: ProfilePhotoProps) {
    return (
        <div>
            {photo ?
                <PhotoProvider>
                    <PhotoView src={getPhoto(photo)}>
                        <Image
                            className='profile-container'
                            src={getPhoto(photo)}
                        />
                    </PhotoView>
                </PhotoProvider>
                :
                <div className='profile-placeholder-container'>
                    <Image
                        src={icons.profile}
                        height={20}
                        width={20}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            }
        </div>
    )
}

export { ProfilePhoto }