import { AnimatedImage, Card, WebCamRecorder } from '@Components';
import { useTimer } from '@Hooks';
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
    startTimer: boolean
    micDisable?: boolean
}


const CallScreen = ({ onMicControl, startTimer = false, micDisable = false, onVolumeControl, onCallEnd, isMute = false, speaker, status, video = false, onVideoControl }: CallScreenProps) => {
    // const { time, formatTime } = useTimer();
    // const imageUrl = "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
    return (
        <div className='text-center'>
            <div>
                <AnimatedImage name={"RT"} shouldBlink={isMute} />
            </div>
            <div className='text-center  my-3'>
                <small className="h4 text-center text-secondary font-weight-light">
                    {status}
                </small>
            </div>
            <small className="h4 text-secondary font-weight-light">
                {!isMute ? "On Mic To Speak" : "Finished Speaking Off The Mic"}
            </small>
            <div className=" my-4">
                <ButtonGroup>
                    <Button className='border-0' color="secondary" type="button">
                        {/* {startTimer ? formatTime(time) : '00:00'} */}
                    </Button>
                    <Button className='border-0' disabled={micDisable} color="secondary" type="button" onClick={onMicControl}>
                        {isMute ? <i className="fas fa-microphone"></i> : <i className="fas fa-microphone-slash"></i>}
                    </Button>
                    {/* <Button className='border-0' color="secondary" type="button" onClick={onVolumeControl}>
                        {speaker ? <i className="fas fa-volume-up"></i> : <i className="fas fa-volume-xmark"></i>}
                    </Button> */}
                    <Button className='border-0' color='secondary' type="button" onClick={onVideoControl}>
                        {video ? <i className="fas fa-video"></i> : <i className="fas fa-video-slash"></i>}
                    </Button>
                    <Button className='bg-red border-0' type="button" onClick={onCallEnd}>
                        <span>{'End Call'}</span>
                    </Button>
                </ButtonGroup>
            </div>
            {
                video && <div className='position-absolute row justify-content-end bottom-2 right-4'>
                    <WebCamRecorder />
                </div>
            }
        </div >

    );
};

export { CallScreen };
