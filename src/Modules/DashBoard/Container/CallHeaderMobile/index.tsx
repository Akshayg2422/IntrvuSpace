import React, { useState, useEffect } from 'react'
import { CallHeaderMobileProps } from './interfaces'
import { Button, Image, Modal, MenuBar } from '@Components'
import { icons } from '@Assets'
import { color } from '@Themes';
import { useModal } from '@Hooks';


function CallHeaderMobile({ webcam, mic, onMicChange, onWebCamChange, onEndClick, onEndInterViewClick }: CallHeaderMobileProps) {


    const CALL_MENU = [{ id: 0, name: 'End Interview' }];


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



    function proceedMenuClickHandler(selected: any) {
        if (selected?.id === CALL_MENU[0].id) {
            endInterviewModal.show()
        }
    }

    return (
        <>

            <div className='d-flex align-items-center px-2' style={{
                height: "100%"
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
                        </div>
                        <div className="text-center mr-4 pointer" onClick={onWebCamChange}>
                            <Image src={webcam ? icons.videoCam : icons.videoCamMute} height={25} width={25} />
                        </div>
                        <div>
                            <Button color={'warning'} variant={'icon-rounded'} icon={icons.phone} height={16} width={16} onClick={onEndClick} />
                        </div>
                        <div>
                            <MenuBar
                                menuData={CALL_MENU}
                                onClick={proceedMenuClickHandler} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal title={'End Interview'} isOpen={endInterviewModal.visible} onClose={endInterviewModal.hide}>
                <div className={'mt--4'}>Are you sure you want to end the interview? Once you end it, you cannot rejoin.</div>
                <div className={'d-flex justify-content-end mt-3'}>
                    <Button color={'warning'} text={'Cancel'} size={'sm'} onClick={endInterviewModal.hide} />
                    <Button text={'Proceed'} size={'sm'} onClick={onEndInterViewClick} />
                </div>
            </Modal>

        </>
    )
}

export { CallHeaderMobile }