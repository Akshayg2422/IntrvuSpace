import React from 'react'
import { Input, Button, H, Logo, Radio, showToast, ComponentLoader, Image, InputHeading } from "@Components";
import { image } from '@Assets';

function LoginSideContent() {
    const isSmallScreen = window.innerWidth <= 768;

    return (
        <div className="bg-primary col h-100vh">
            <div className='d-flex  justify-content-center align-items-center  mt-7'>
                <h1 className='font-weight-bolder text-white'
                    style={{
                        fontSize: isSmallScreen ? '58px' : '100px'
                    }}
                >MOCK <b className='text-black'>EAZY</b></h1>
            </div>
            <div className="row align-items-center justify-content-center">
                <p className="text-center text-white "
                    style={{
                        maxWidth: isSmallScreen ? '350px' : '600px'
                    }}
                >
                    Interview App is the easiest way to interview people automatically. Invite people to answer your question spontaneously with their webcam. Where
                </p>
            </div>
            <div className='row align-items-center mt-sm-0 mt-3 justify-content-center'>
                <Image
                    className=""
                    src={image.LOGIN_SIDE_IMAGE}
                    height={'300'}
                    width={'300'}
                />
            </div>
        </div>
    )
}


export { LoginSideContent }