/* eslint-disable react-hooks/exhaustive-deps */
import { syncVideo } from '@Redux/';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

const VideoStream = (props) => {
    const videoRef = useRef(null);
    const mediaRecorder = useRef(null);
    const recordInterval = useRef(null);
    const dispatch = useDispatch();
    const { schedule_id } = useParams();
    const [mediaStream, setMediaStream] = useState(null);


    useEffect(() => {
        if (props.isRecording) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setMediaStream(stream);
                    videoRef.current.muted = true;
                    videoRef.current.srcObject = stream;
                    startRecording();
                })
                .catch((error) => {
                    console.error('Error accessing webcam:', error);
                });
        } else {
            stopRecording();
        }


        return () => {
            stopRecording();
        };

    }, [props.isRecording]);


    const startRecording = () => {
        // Create a MediaRecorder instance to continuously capture data
        mediaRecorder.current = new MediaRecorder(videoRef.current.srcObject);

        // Add an event listener for the dataavailable event
        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                const blob = new Blob([event.data], { type: 'video/webm' });
                const reader = new FileReader();
                reader.onload = function () {
                    syncVideoApiHelper(reader.result)
                };
                reader.readAsDataURL(blob);  
            }
        };

        // Start the MediaRecorder
        mediaRecorder.current.start();

        // Start capturing data every 5000ms (5 seconds)
        recordInterval.current = setInterval(() => {
            mediaRecorder.current.requestData();
        }, 1000);
    };

    const stopRecording = () => {
        clearInterval(recordInterval.current); // Stop the recording interval

        try {
            if (mediaRecorder.current) {
                mediaRecorder.current.stop();
            }
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        } catch (e) {
            console.error(e);
        }


    };

    function syncVideoApiHelper(base64) {
        const params = { schedule_id: schedule_id, 'data_b64': base64 };
        // dispatch(
        //     syncVideo({
        //         params,
        //         onSuccess: () => () => {
        //         },
        //         onError: () => () => { },
        //     })
        // );
    }


    if (!props.isRecording)
        return null;

    return (
        <div>
            <div className="d-block d-md-none d-lg-none d-xl-none">
                <video
                    style={{ marginTop: 6, height: 200, width: 200, objectFit: 'cover', alignItems: 'center', justifyContent: 'center' }}
                    ref={videoRef}
                    autoPlay
                    playsInline
                />
            </div>

            <div className="d-none d-md-block d-lg-block d-xl-block">
                <video
                    style={{ marginTop: 6, height: 250, width: 250, objectFit: 'cover', alignItems: 'center', justifyContent: 'center' }}
                    ref={videoRef}
                    autoPlay
                    playsInline
                />
            </div>
        </div>
    );
};

export { VideoStream };
