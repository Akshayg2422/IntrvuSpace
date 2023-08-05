import { AnimatedImage, Card, WebCamRecorder, Image } from '@Components';
import { Button } from 'reactstrap';
import '../../../../Components/Component/AnimatedImage/AnimatedImageFrame.scss'
import { useEffect, useState } from 'react';


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
    userName?: string
    loading?: boolean
    onMic: boolean
    variant: string
}

const CallScreen = ({ onMicControl, startTimer = false, onMic = false, loading = false, userName = '', micDisable = false, onVolumeControl, onCallEnd, isMute = false, speaker, status, video = false, onVideoControl, variant }: CallScreenProps) => {

    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });


    useEffect(() => {
        if (startTimer) {
            const interval = setInterval(() => {
                setTime(prevTime => {
                    const seconds = prevTime.seconds + 1;
                    const minutes = prevTime.minutes + Math.floor(seconds / 60);
                    const hours = prevTime.hours + Math.floor(minutes / 60);
                    return {
                        hours: hours,
                        minutes: minutes % 60,
                        seconds: seconds % 60
                    };
                });
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }

    }, [startTimer]);

    function formatTime(value) {
        return value < 10 ? `0${value}` : value;
    }

    const formattedTime = time.hours > 0
        ? `${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(time.seconds)}`
        : `${formatTime(time.minutes)}:${formatTime(time.seconds)}`;

    function getShortName(fullName: string) {
        const names = fullName.split(' ');

        if (names.length === 1) {
            return names[0].substring(0, 2).toUpperCase();
        }

        const firstNameInitial = names[0][0].toUpperCase();
        const lastNameInitial = names[names.length - 1][0].toUpperCase();
        return `${firstNameInitial}${lastNameInitial}`;
    }


    return (
        <div className='text-center'>
            <h1 className='display-2 mb-4'>{userName}</h1>
            <div>
                <AnimatedImage show={loading} name={getShortName(userName)} variant={variant} shouldBlink={isMute} />
            </div>
            <div className='text-center my-3'>
                <small className="h4 text-center text-black font-weight-bold">
                    {status}
                </small>
            </div>
            <small className="h4 text-black font-weight-bold">
                {!isMute ? "On Mic To Speak" : "Finished Speaking Off The Mic"}
            </small>
            <div className="my-4">
                <Button
                    className='border-0 shadow-none'
                    style={{ borderRadius: 7, backgroundColor: '#f5f5f5' }}
                >
                    <div>
                        <span className="btn-inner--icon">
                            <i className="fas fa-circle mr-2 text-red" />
                        </span>
                        <span className="nav-link-inner--text ml-1 text-lg " style={{ color: '#c4c4c4' }}>{startTimer ? formattedTime : '00:00'}</span>
                    </div>
                </Button>
                <Button
                    style={{
                        backgroundColor: '#f5f5f5',
                        padding: 15
                    }}
                    className={`border-0 shadow-none ${onMic ? 'animated-button' : ''}`}
                    disabled={micDisable}
                    onClick={onMicControl}
                >
                    <div className=''>
                        <span className="btn-inner--icon  ">
                            {isMute ? <i className="fas fa-microphone text-lg " style={{ color: '#c4c4c4' }}></i> : <i className="fas fa-microphone-slash text-lg " style={{ color: '#c4c4c4' }}></i>}
                        </span>
                    </div>
                </Button>
                <Button
                    className='border-0 shadow-none bg-red'
                    style={{ borderRadius: 7 }}
                    onClick={onCallEnd}
                >
                    <div className=''>
                        <span className="nav-link-inner--text mx-6 text-lg text-white" style={{ color: '#f5f5f5' }}>{'End Call'}</span>
                    </div>
                </Button>
                {/* <Button
                    className='border-0 shadow-none'
                    style={{ borderRadius: 7, backgroundColor: '#f5f5f5', padding: 15 }}
                    onClick={onVolumeControl}
                >
                    <div className=''>
                        <span className="btn-inner--icon">
                            {speaker ? <i className="fas fa-volume-up text-lg " style={{ color: '#c4c4c4' }}></i> : <i className="fas fa-volume-xmark text-lg " style={{ color: '#c4c4c4' }}></i>}
                        </span>
                    </div>
                </Button> */}
                <Button
                    className='border-0 shadow-none'
                    style={{ borderRadius: 7, backgroundColor: '#f5f5f5', padding: 15 }}
                    onClick={onVideoControl}
                >
                    <div className=''>
                        <span className="btn-inner--icon">
                            {video ? <i className="fas fa-video text-lg " style={{ color: '#c4c4c4' }}></i> : <i className="fas fa-video-slash text-lg " style={{ color: '#c4c4c4' }}></i>}
                        </span>
                    </div>
                </Button>
            </div>
            {
                video && <div className='position-absolute  justify-content-end bottom-9 right-6'>
                    <WebCamRecorder />
                </div>
            }
        </div >

    );
};

export { CallScreen };
