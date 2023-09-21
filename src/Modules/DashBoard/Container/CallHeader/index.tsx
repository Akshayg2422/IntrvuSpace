import React, { useState, useEffect } from 'react'
import { CallHeaderProps } from './interfaces'
import { Button, Image, Modal } from '@Components'
import { icons } from '@Assets'
import { color } from '@Themes';
import { useModal } from '@Hooks';


function CallHeader({ webcam, mic, onMicChange, onWebCamChange, onEndClick, onEndInterViewClick }: CallHeaderProps) {


    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const endInterviewModal = useModal(false)

    useEffect(() => {

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

    }, []);

    function formatTime(value) {
        return value < 10 ? `0${value}` : value;
    }

    const formattedTime = time.hours > 0
        ? `${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(time.seconds)}`
        : `${formatTime(time.minutes)}:${formatTime(time.seconds)}`;

    return (
        <>
            <div className='row align-items-center d-flex justify-content-center w-100'>
                <div className='align-items-center d-flex px-3'
                    style={{
                        backgroundColor: color.davyGrey,
                        width: '30%',
                        height: "60px",
                        borderRadius: 5,

                    }}>
                    <div className='col-auto mb-0'>
                        <span className="btn-inner--icon">
                            <i className="fas fa-circle text-red" />
                        </span>
                        <span className="nav-link-inner--text ml-2" style={{ color: '#c4c4c4' }}>{formattedTime ? formattedTime : '00:00'}</span>
                    </div>
                    <div className='col d-flex justify-content-end align-items-center'>
                        <div className='row align-items-center'>
                            <div className='text-center mr-3 pointer' onClick={onMicChange}>
                                <Image src={mic ? icons.microPhone : icons.microPhoneMute} height={mic ? 22 : 24} width={mic ? 22 : 24} />
                                {/* <h6 className="text-muted ls-1 mb-1"
                            style={{
                                fontSize: '8px'
                            }}>Mic</h6> */}
                            </div>
                            <div className="text-center mr-4 pointer" onClick={onWebCamChange}>
                                <Image src={webcam ? icons.videoCam : icons.videoCamMute} height={webcam ? 24 : 25} width={webcam ? 24 : 25} />
                                {/* <h6 className="text-muted ls-1 mb-1" style={{
                            fontSize: '8px'
                        }}>Camera</h6> */}
                            </div>

                            <div>
                                <Button color={'warning'} variant={'icon-rounded'} icon={icons.phone} height={16} width={16} onClick={onEndClick} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='ml-3'>
                    <Button text={"End Interview"} onClick={endInterviewModal.show} />
                </div>
            </div>
            <Modal isOpen={endInterviewModal.visible} onClose={endInterviewModal.hide}>
                <h4 className={'mt--4'}>Are you sure you want to end the interview? Once you end it, you cannot rejoin.</h4>
                <div className={'d-flex justify-content-end'}>
                <Button color={'secondary'} text={'Cancel'} size={'sm'} onClick={endInterviewModal.hide}/>
                <Button text={'Proceed'} size={'sm'} onClick={onEndInterViewClick}/>
                </div>
            </Modal>

        </>
    )
}

export { CallHeader }