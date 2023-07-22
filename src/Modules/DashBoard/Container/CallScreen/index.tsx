import { AnimatedImage, Card, WebCamRecorder } from '@Components';
import React, { useState } from 'react';
import { Button, ButtonGroup, CardBody } from 'reactstrap';

type CallScreenProps = {
    onMicControl?: any,
    onVolumeControl?: any,
    onCallEnd?: any
    isMute?: boolean,
    speaker?: boolean,
    status?: string,
    video?: boolean
    onVideoControl?: any
}


const CallScreen = ({ onMicControl, onVolumeControl, onCallEnd, isMute = false, speaker, status, video = false, onVideoControl }: CallScreenProps) => {

    const imageUrl = "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
    return (
        <div>
            <div className=''>
                <div className={'center mr-6'} >
                    <div className='ml--6'>
                        <AnimatedImage name={"RT"} shouldBlink={isMute} />
                    </div>
                    <div className='mt-4 mr--6'>
                        <small className="h4 text-center font-weight-light">
                            {status}
                        </small>
                    </div>
                </div>
                <div className="text-center position-absolute bottom center my-6">
                    <small className="h4 font-weight-light">
                        {!isMute ? "On Mic To Speak" : "Finished Speaking Off The Mic"}
                    </small>
                    <div className="mt-3">
                        <ButtonGroup className=''>
                            <Button color="info" type="button">
                                1:30
                            </Button>
                            <Button color="info" type="button" onClick={onMicControl}>
                                {isMute ? <i className="fas fa-microphone"></i> : <i className="fas fa-microphone-slash"></i>}
                            </Button>
                            <Button color="info" type="button" onClick={onVolumeControl}>
                                {speaker ? <i className="fas fa-volume-up"></i> : <i className="fas fa-volume-xmark"></i>}
                            </Button>
                            <Button color='info' type="button" onClick={onVideoControl}>
                                {video ? <i className="fas fa-video"></i> : <i className="fas fa-video-slash"></i>}
                            </Button>
                            <Button className='bg-red' type="button" onClick={onCallEnd}>
                                {/* <i className="fas fa-phone-slash"></i> */}
                                <span>{'End Call'}</span>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            {video && <div className='position-absolute top-0 left-1 p-0 m-1'>
                <WebCamRecorder onStartRecording={function (video: string): void {
                    throw new Error('Function not implemented.');
                }} />
            </div>}
        </div >
    );
};

export { CallScreen };
