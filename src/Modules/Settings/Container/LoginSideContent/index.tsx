import React from 'react'
import { Input, Button, H, Logo, Radio, showToast, ComponentLoader, Image, InputHeading } from "@Components";
import { image } from '@Assets';

function LoginSideContent() {
    const isSmallScreen = window.innerWidth <= 768;

    return (
        <div className="bg-primary h-100vh row justify-content-center align-items-center ">
            <div className='text-center'>
                <h1 className='font-weight-bolder text-white'
                    style={{
                        fontSize: '100px'
                    }}
                >intrvu <b className='text-white'>SPACE</b></h1>
                <p className="text-center text-white "
                    style={{
                        maxWidth: '600px'
                    }}
                >
                    Interview App is the easiest way to interview people automatically. Invite people to answer your question spontaneously with their webcam.
                </p>
                <div className='d-flex justify-content-center align-items-center '>
                    <Image
                        src={image.LOGIN_SIDE_IMAGE}
                        height={'300'}
                        width={'300'}
                    />
                </div>
            </div>
        </div>
    )
}


export { LoginSideContent }