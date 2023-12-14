import { AnimatedImage, Card, WebCamRecorder, Image } from '@Components';
import { Button } from 'reactstrap';
import '../../../../Components/Component/AnimatedImage/AnimatedImageFrame.scss'
import { useEffect, useState } from 'react';



type CallScreenProps = {
    basicInfo: any
    onMicControl?: any,
    onVolumeControl?: any,
    onCallEnd?: any
    isMute?: boolean,
    speaker?: boolean,
    status?: string,
    video?: boolean
    onVideoControl?: any
    micDisable?: boolean
    loading?: boolean
    onMic: boolean
    variant: string
    conditionalButton: 'start' | 'processing' | 'end'
    startButtonOnclick?: any
    ReportButtonOnclick?: any
    endInterview?: ()=> void;
}

const CallScreen = ({ basicInfo, onMicControl, onMic = false, loading = false, conditionalButton, ReportButtonOnclick, micDisable = false, onVolumeControl, onCallEnd, isMute = false, speaker, status, video = false, onVideoControl, variant, startButtonOnclick, endInterview }: CallScreenProps) => {

    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const isSmallScreen = window.innerWidth <= 768;

    useEffect(() => {
        if (conditionalButton === 'processing') {
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

    }, [conditionalButton]);

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

            <div className=''>
                <AnimatedImage show={loading} name={basicInfo && basicInfo?.interviewer_name && getShortName(basicInfo?.interviewer_name)} variant={variant} shouldBlink={isMute} endInterview={endInterview} />
            </div>
            <h2 className='display-2 mb-4'>{basicInfo?.interviewer_name}</h2>
            {
                isSmallScreen && video && <div>
                    <WebCamRecorder />
                    <h3 className='display-2 mb-4'>{basicInfo?.interviewee_name}</h3>
                </div>
            }
            <div className='text-center my-3'>
                {conditionalButton === 'processing' && <small className="h4 text-center text-black font-weight-bold">
                    {status}
                </small>}
            </div>
            {conditionalButton === 'processing' && <small className="h4 text-black font-weight-bold">
                {!isMute ? "On Mic To Speak" : "Finished Speaking Off The Mic"}
            </small>}
            {conditionalButton === 'processing' &&
                <div className="my-4">
                    <Button
                        className='border-0 shadow-none'
                        style={{ borderRadius: 7, backgroundColor: '#f5f5f5' }}
                    >
                        <div>
                            <span className="btn-inner--icon">
                                <i className="fas fa-circle mr-2 text-red" />
                            </span>
                            <span className="nav-link-inner--text ml-1 text-lg " style={{ color: '#c4c4c4' }}>{conditionalButton ? formattedTime : '00:00'}</span>
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
                            <span className="btn-inner--icon">
                                {isMute ? <i className="fas fa-microphone text-lg px-2" style={{ color: '#c4c4c4' }}></i> : <i className="fas fa-microphone-slash text-lg " style={{ color: '#c4c4c4' }}></i>}
                            </span>
                        </div>
                    </Button>
                    {isSmallScreen && <Button
                        className='border-0 shadow-none'
                        style={{ borderRadius: 7, backgroundColor: '#f5f5f5', padding: 15 }}
                        onClick={onVideoControl}
                    >
                        <div className=''>
                            <span className="btn-inner--icon">
                                {video ? <i className="fas fa-video text-lg " style={{ color: '#c4c4c4' }}></i> : <i className="fas fa-video-slash text-lg " style={{ color: '#c4c4c4' }}></i>}
                            </span>
                        </div>
                    </Button>}
                    <Button
                        className='border-0 shadow-none bg-red my-sm-0 my-4'
                        style={{ borderRadius: 7 }}
                        onClick={onCallEnd}
                    >
                        <div className=''>
                            <span className="nav-link-inner--text mx-6 text-lg text-white " style={{ color: '#f5f5f5' }}>{'End Call'}</span>
                        </div>
                    </Button>
                    {!isSmallScreen && <Button
                        className='border-0 shadow-none'
                        style={{ borderRadius: 7, backgroundColor: '#f5f5f5', padding: 15 }}
                        onClick={onVideoControl}
                    >
                        <div className=''>
                            <span className="btn-inner--icon">
                                {video ? <i className="fas fa-video text-lg " style={{ color: '#c4c4c4' }}></i> : <i className="fas fa-video-slash text-lg " style={{ color: '#c4c4c4' }}></i>}
                            </span>
                        </div>
                    </Button>}
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
                </div>}
            {conditionalButton === 'start' &&
                <>
                    {!basicInfo?.is_complete ? <div className="my-4">
                        <Button
                            className='border-0 shadow-none bg-primary my-sm-0 my-4'
                            style={{ borderRadius: 7 }}
                            onClick={startButtonOnclick}
                        >
                            <div className=''>
                                <span className="nav-link-inner--text mx-6 text-lg text-white " style={{ color: '#f5f5f5' }}>{basicInfo?.is_started ? 'Resume' : 'Start Now'}</span>
                            </div>
                        </Button>
                    </div> : <Button
                        className='border-0 shadow-none bg-primary my-sm-0 my-4'
                        style={{ borderRadius: 7 }}
                        onClick={ReportButtonOnclick}
                    >
                        <div className=''>
                            <span className="nav-link-inner--text mx-6 text-lg text-white " style={{ color: '#f5f5f5' }}>{"Report"}</span>
                        </div>
                    </Button>}
                </>

            }
            {conditionalButton === 'end' &&
                <div className="my-4">
                    <div className=''>
                        <span className="nav-link-inner--text mx-6 text-lg text-red" style={{ color: '#f5f5f5' }}>{'Call As Been Ended...'}</span>
                    </div>
                </div>

            }
            {
                !isSmallScreen && video && <div className={`position-absolute justify-content-end bottom-5 right-6`}>
                    <WebCamRecorder />
                </div>
            }
        </div >

    );
};

export { CallScreen };
