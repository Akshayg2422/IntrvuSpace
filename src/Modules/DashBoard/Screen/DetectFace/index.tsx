import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, DrawingUtils, FaceLandmarker } from '@mediapipe/tasks-vision';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DetectFace2() {
    const videoRef = useRef<any>(null)
    let faceLandmarker;
    let runningMode = "IMAGE";
    let webcamRunning = false;
    const videoWidth = 300;
    const [modal, setModal] = useState(false);
    const faceDetected = useRef<any>(null)
    const canvasRef = useRef<any>(null)
    const audioContext = useRef<any>(null)
    const [noiseDetection, setNoiseDetection] = useState<any>(false)
    let array:any = []
    const [next, setNext] = useState()
    const [faceFound, setFaceFound] = useState<any>()
    const [tryAgain, setTryAgain] = useState<any>()

    async function createFaceLandmarker() {
        try {

            const filesetResolver = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
            );
            faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: "GPU"
                },
                outputFaceBlendshapes: true,
                runningMode: 'VIDEO',
                numFaces: 1,
            });
        }
        catch (error) {
            console.log(error, 'error1');
        }
    }

    let video
    let canvasElement
    let canvasCtx
    let drawingUtils


    useEffect(() => {
        createFaceLandmarker();
    }, [tryAgain])

    // Check if webcam access is supported.
    function hasGetUserMedia() {

        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    // If webcam supported, add event listener to button for when user
    // wants to activate it.
    function name(params) {

        if (hasGetUserMedia()) {
            // webcamRunning = true
            enableCam()
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }
    }


    // Enable the live webcam view and start detection.
    function enableCam() {

        start()
        // runStreamingAudioClassification();
        timeoutFunc()
        // harkSound()
        if (!faceLandmarker) {
            console.log("Wait! faceLandmarker not loaded yet.");
            return;
        }
        if (webcamRunning === true) {
            webcamRunning = false;
            video.srcObject.getTracks().forEach(function (track) {
                track.stop();
            });
            video.srcObject = null;
        } else {
            webcamRunning = true;
        }

        // getUsermedia parameters.
        const constraints = {
            video: true
        };

        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            video = videoRef?.current
            console.log(video, "video");

            canvasElement = document?.getElementById(
                "output_canvas"
            );
            canvasCtx = canvasElement?.getContext("2d");
            drawingUtils = new DrawingUtils(canvasCtx);
            video.srcObject = stream;

            video.addEventListener("loadeddata", predictWebcam);
        });
    }

    let lastVideoTime = -1;
    let results : any = undefined;

    async function predictWebcam() {

        const radio = video.videoHeight / video.videoWidth;
        video.style.width = videoWidth + "px";
        video.style.height = videoWidth * radio + "px";
        canvasElement.style.width = videoWidth + "px";
        canvasElement.style.height = videoWidth * radio + "px";
        canvasElement.width = video.videoWidth;
        canvasElement.height = video.videoHeight;
        // Now let's start detecting the stream.
        if (runningMode === "IMAGE") {
            runningMode = "VIDEO";
             optionSet()
        }
        async function optionSet() {
            try {
                await faceLandmarker.setOptions({ runningMode: 'VIDEO' });
            }
            catch (error) {
                console.log(error, "error");
            }
        }
        let startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
            lastVideoTime = video.currentTime;

            results = faceLandmarker?.detectForVideo(video, startTimeMs);
        }
        if (results.faceLandmarks) {

            for (const landmarks of results.faceLandmarks) {

                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                    { color: "#C0C0C070", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
                    { color: "#E0E0E0" ,lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
                    { color: "#E0E0E0", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
                    { color: "#E0E0E0", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
                    { color: "#E0E0E0", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
                    { color: "#E0E0E0", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LIPS,
                    { color: "#E0E0E0", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
                    { color: "#E0E0E0", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
                    { color: "#E0E0E0", lineWidth: 1 }
                );

            }
        }

        //   console.log(results,"results.faceBlendshapes");

        if (results.faceBlendshapes.length > 0) {
            faceDetected.current = true
      
        } else {
            faceDetected.current = false
            console.log('show Face clearly')
        }


        // Call this function again to keep predicting when the browser is ready.
        if (webcamRunning === true) {
            window.requestAnimationFrame(predictWebcam);
        }
    }


    function start() {


        audioContext.current = new window.AudioContext();
        const analyser = audioContext.current.createAnalyser();
        analyser.fftSize = 4096;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const source = audioContext.current.createMediaStreamSource(stream);
                source.connect(analyser);
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                // Draw the spectrogram
                drawSpectrogram(ctx, analyser);
            })
            .catch((err) => {
                console.error('Error accessing microphone:', err);
            });
    }
    const drawSpectrogram = (ctx, analyser) => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const barWidth = canvasWidth / bufferLength;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(1, 'black');
        gradient.addColorStop(0.75, 'blue');
        gradient.addColorStop(0.25, 'cyan');
        gradient.addColorStop(0, 'lime');

        const draw = () => {
            analyser.getByteFrequencyData(dataArray);
            // console.log(dataArray,"dataArray",bufferLength);

            // Clear the canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            let add = 0
            for (let i = 0; i < bufferLength; i++) {
                add = add + dataArray[i];
                const barHeight = dataArray[i];

                // Use linear scaling
                const scaledHeight = (barHeight / 255) * canvasHeight;

                // Draw the bar
                ctx.fillStyle = gradient;
                ctx.fillRect(i * barWidth, canvasHeight - scaledHeight, barWidth, scaledHeight);
            }
            array.push(Math.round(add /bufferLength ))
            console.log(add /bufferLength , 'addd');

            requestAnimationFrame(draw);
        };

        draw();
    };



    function timeoutFunc() {

        setTimeout(() => {
            let count = 0
            let average
            if (array.length > 0) {
                const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue);
                average = sum / array.length;

            }
            console.log(array,"average");

            if (faceDetected.current) {
                count = count + 1
            }
            else {
                webcamRunning = false
            }
            if (average < 20) {
                setNoiseDetection(true)
                count = count + 1
                console.log("average", average,2)
            }
            else {
                console.log("average", average,3)
                setNoiseDetection(false)
                audioContext.current.close();
            }
            if (count == 2) {
                
            }
        }, 7000);
    }
    return (
        <>
            <div>
                <Modal>
                        <div>
                            <div style={{ position: 'relative', width: "300px", height: "225px", marginLeft: '65px', marginBottom: '20px' }}>
                                <video id="webcam" ref={videoRef} autoPlay playsInline style={{ position: 'absolute', left: '0px', top: '0px', bottom: "0px", right: '0px' }}></video>
                                <canvas className="output_canvas" id="output_canvas" style={{ position: 'absolute', left: '0px', top: '0px', bottom: "0px", right: '0px' }}></canvas>
                                <canvas ref={canvasRef} width={300} height={100} style={{ position: 'absolute', left: '0px', bottom: "0px", right: '0px' }}/>

                            </div>
                        </div>
                </Modal >
            </div >
        </>
    );
};

export default DetectFace2;