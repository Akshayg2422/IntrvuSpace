import React, { useState, useEffect } from 'react'
import { CallHeaderProps } from './interfaces'
import { Button, Image } from '@Components'
import { icons } from '@Assets'
import { color } from '@Themes';


function CallHeader({ webcam, mic, onMicChange, onWebCamChange, onEndClick }: CallHeaderProps) {


    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

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
        <div
            className='container-fluid align-items-center d-flex'
            style={{
                height: "70px",
                backgroundColor: color.white,
                borderRadius: 5

            }}>
            <div className='col-auto'>
                <span className="btn-inner--icon">
                    <i className="fas fa-circle text-red" />
                </span>
                <span className="nav-link-inner--text ml-2" style={{ color: '#c4c4c4' }}>{formattedTime ? formattedTime : '00:00'}</span>
            </div>
            <div className='col d-flex justify-content-end align-items-center'>
                <div className='row align-items-center'>
                    <div className='text-center mr-4 pointer' onClick={onMicChange}>
                        <Image src={mic ? icons.microPhone : icons.microPhoneMute} height={mic ? 16 : 19} width={mic ? 16 : 19} />
                        <h6 className="text-muted ls-1 mb-1"
                            style={{
                                fontSize: '8px'
                            }}>Mic</h6>
                    </div>
                    <div className="text-center mr-4 pointer" onClick={onWebCamChange}>
                        <Image src={webcam ? icons.videoCam : icons.videoCamMute} height={webcam ? 20 : 17} width={webcam ? 20 : 17} tintColor={color.black} />
                        <h6 className="text-muted ls-1 mb-1" style={{
                            fontSize: '8px'
                        }}>Camera</h6>
                    </div>

                    <div>
                        <Button variant={'icon-with-text'} icon={icons.phone} text={'End now'} height={16} width={16} onClick={onEndClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CallHeader }