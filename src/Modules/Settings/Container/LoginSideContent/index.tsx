import React from 'react'
import { Input, Button, H, Logo, Radio, showToast, ComponentLoader, Image, InputHeading } from "@Components";

function LoginSideContent() {
    return (
        <>
            <div className="col-sm-6 bg-primary h-100vh d-none d-sm-block">
                <div className="row ml--4 justify-content-center pt-4 mt-1 align-items-center ">
                    <h1 className='pb-0 mb--1 font-weight-bolder text-white'
                        style={{
                            fontSize: '13vh'
                        }}
                    >MOCK <b className='text-black'>EASY</b></h1>
                    <p className="text-center text-white "
                        style={{
                            maxWidth: '85vh'
                        }}
                    >
                        Interview App is the easiest way to interview people automatically. Invite people to answer your question spontaneously with their webcam. Where
                    </p>
                    <Image
                        className=""
                        src={require('file:///C:/Users/tamil_hfh9g6g/OneDrive/Pictures/P007_1-2.png')}
                        height={'55%'}
                        width={'55%'}
                    />
                </div>
            </div>
        </>
    )
}

export { LoginSideContent }