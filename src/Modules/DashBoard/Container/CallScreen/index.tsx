import { AnimatedImage, Card, WebCamRecorder, Image } from '@Components';
import { Button } from 'reactstrap';


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
}

const CallScreen = ({ onMicControl, startTimer = false, userName = "Tamil Selvan", micDisable = false, onVolumeControl, onCallEnd, isMute = false, speaker, status, video = false, onVideoControl }: CallScreenProps) => {
    return (
        <div className='text-center'>
            <h1 className='display-2 mb-4'>{userName}</h1>
            <div>
                <AnimatedImage name={"TS"} shouldBlink={isMute} />
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
                        <span className="nav-link-inner--text ml-1 text-lg " style={{ color: '#c4c4c4' }}>{startTimer ? '1.20' : '00:00'}</span>
                    </div>
                </Button>
                <Button
                    className='border-0 shadow-none'
                    style={{ borderRadius: 7, backgroundColor: '#f5f5f5', padding: 15 }}
                    disabled={micDisable}
                    onClick={onMicControl}
                >
                    <div className=''>
                        <span className="btn-inner--icon">
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
                <Button
                    className='border-0 shadow-none'
                    style={{ borderRadius: 7, backgroundColor: '#f5f5f5', padding: 15 }}
                    onClick={onVolumeControl}
                >
                    <div className=''>
                        <span className="btn-inner--icon">
                            {speaker ? <i className="fas fa-volume-up text-lg " style={{ color: '#c4c4c4' }}></i> : <i className="fas fa-volume-xmark text-lg " style={{ color: '#c4c4c4' }}></i>}
                        </span>
                    </div>
                </Button>
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
                video && <div className='position-absolute row justify-content-end top-2 right-4'>
                    <WebCamRecorder />
                </div>
            }
        </div >

    );
};

export { CallScreen };
