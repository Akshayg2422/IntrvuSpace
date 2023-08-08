import React from 'react'
import { Input, Button, H, Logo, Radio, showToast, ComponentLoader, Image, InputHeading } from "@Components";
import { image } from '@Assets';

function LoginSideContent() {
    return (
        <>
            <div className="col-sm-6 bg-primary h-100vh d-none d-sm-block">
                <div className="row  justify-content-center pt-4 mt-1 align-items-center ">
                    <h1 className='pb-0 mb--1 font-weight-bolder text-white'
                        style={{
                            fontSize: '13vh'
                        }}
                    >MOCK <b className='text-black'>EAZY</b></h1>
                    <p className="text-center text-white "
                        style={{
                            maxWidth: '85vh'
                        }}
                    >
                        Interview App is the easiest way to interview people automatically. Invite people to answer your question spontaneously with their webcam. Where
                    </p>
                    <Image
                        className=""
                        src={image.LOGIN_SIDE_IMAGE}
                        height={'55%'}
                        width={'55%'}
                    />
                </div>
            </div>
            <div className="col-sm-6 bg-primary d-block d-sm-none"
                style={{
                    height: '90vh'
                }}
            >
                <div className="row justify-content-center pt-1 mt-3 align-items-center ">
                    <h1 className=' font-weight-bolder text-white'
                        style={{
                            fontSize: '8vh'
                        }}
                    >MOCK <b className='text-black'>EASY</b></h1>
                    <p className="text-center text-white"
                        style={{
                            maxWidth: '85vh'
                        }}
                    >
                        Interview App is the easiest way to interview people automatically. Invite people to answer your question spontaneously with their webcam. Where
                    </p>
                    <Image
                        className=""
                        src={image.LOGIN_SIDE_IMAGE}
                        height={'60%'}
                        width={'60%'}
                    />
                </div>
            </div>
        </>
    )
}

export { LoginSideContent }