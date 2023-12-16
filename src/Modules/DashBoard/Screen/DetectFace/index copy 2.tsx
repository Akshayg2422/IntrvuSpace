import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, DrawingUtils, FaceLandmarker } from '@mediapipe/tasks-vision';
import { useModal, useNavigation } from '@Hooks';
import { Button, Image, Modal } from '@Components';
import { icons } from '@Assets';

function DetectFace3({onClick}) {
    const videoRef = useRef<any>(null)
    let faceLandmarker: any;
    let runningMode = "IMAGE";
    // let webcamRunning = false;
    const webcamRunningRef = useRef<any>()
    const videoWidth = 400;
    const faceDetected = useRef<any>(null)
    const canvasRef = useRef<any>(null)
    const audioContext = useRef<any>(null)
    const [noiseDetection, setNoiseDetection] = useState<any>('Checking')
    let array: any = []
    const [faceFound, setFaceFound] = useState<any>('Checking')
    const [tryAgain, setTryAgain] = useState<any>(0)
    const detectFaceModal = useModal(false)
    const videoStreamRef = useRef<any>()
    const audioStreamRef = useRef<any>(null)
    const audioStreamRunningRef = useRef<any>()
    const clearTimeOutRef = useRef<any>()
    const { goBack } = useNavigation();

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

        if(!detectFaceModal.visible){
            name()
            detectFaceModal.show()
        }

    }

    let video
    let canvasElement
    let canvasCtx
    let drawingUtils

console.log(detectFaceModal.visible,"detectFaceModal");

    useEffect(() => {
        createFaceLandmarker();
        // return () => {
        //     // Cleanup function to stop the stream when the component unmounts
        //     stopStream();
        //   };
    }, [tryAgain])

    // Check if webcam access is supported.
    console.log(videoRef.current, 'videoooo');
    
    function hasGetUserMedia() {

        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    // If webcam supported, add event listener to button for when user
    // wants to activate it.
    function name() {

        if (hasGetUserMedia()) {
            // webcamRunning = true
            enableCam()
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }
    }


    // Enable the live webcam view and start detection.
    function enableCam() {

        startAudioDetect()
        timeoutFunc()
        webcamRunningRef.current = true
    
        if (!faceLandmarker) {
            console.log("Wait! faceLandmarker not loaded yet.");
            return;
        }
        // if (webcamRunning === true) {
        //     webcamRunning = false;

        // } else {
        //     webcamRunning = true;
        // }

        // getUsermedia parameters.
        const constraints = {
            video: true
        };

        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            videoStreamRef.current = stream
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
    let results: any = undefined;

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
                    { color: "#E0E0E0", lineWidth: 1 }
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
        if (webcamRunningRef.current) {
            window.requestAnimationFrame(predictWebcam);
        }
    }


    function startAudioDetect() {
        audioStreamRunningRef.current = true

        audioContext.current = new window.AudioContext();
        const analyser = audioContext.current.createAnalyser();
        analyser.fftSize = 4096;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                audioStreamRef.current = stream
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

        // const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        // gradient.addColorStop(1, 'black');
        // gradient.addColorStop(0.75, 'blue');
        // gradient.addColorStop(0.25, 'cyan');
        // gradient.addColorStop(0, 'lime');
//         const gradient = ctx.createLinearGradient(0, 100, 250, 0);

// // Add three color stops
// gradient.addColorStop(0, "#641df2");
// gradient.addColorStop(0.5, "cyan");
// gradient.addColorStop(1, "#641df2");

// const gradient = ctx.createLinearGradient(0, 0, 600, 0);
//     gradient.addColorStop(0, "black");
//     gradient.addColorStop(0.125, "red");
//     gradient.addColorStop(0.25, "orange");
//     gradient.addColorStop(0.375, "yellow");
//     gradient.addColorStop(0.5, "green");
//     gradient.addColorStop(0.625, "blue");
//     gradient.addColorStop(0.75, "indigo");
//     gradient.addColorStop(0.875, "violet");
//     gradient.addColorStop(1, "black");


        // const draw = () => {
        //     analyser.getByteFrequencyData(dataArray);
        //     // console.log(dataArray,"dataArray",bufferLength);

        //     // Clear the canvas
        //     ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        //     let add = 0
        //     for (let i = 0; i < bufferLength; i++) {
        //         add = add + dataArray[i];
        //         const barHeight = dataArray[i];

        //         // Use linear scaling
        //         const scaledHeight = (barHeight / 255) * canvasHeight;

        //         // Draw the bar
        //         ctx.fillStyle = gradient;
        //         ctx.fillRect(i * barWidth, canvasHeight - scaledHeight, barWidth, scaledHeight);
        //     }
        //     array.push(Math.round(add / bufferLength))
        //     // console.log(add / bufferLength, 'addd');

        //     if (audioStreamRunningRef.current) {
        //         requestAnimationFrame(draw);
        //     }
        // };

        // draw();
        const drawWaveform = () => {
            analyser.getByteTimeDomainData(dataArray);
            // console.log(dataArray);
  
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#641df2';
            ctx.beginPath();
  
            const sliceWidth = (canvasWidth * 1.0) / bufferLength;
            let x = 0;
            let add = 0
  
            for (let i = 0; i < bufferLength; i++) {
              add = add + dataArray[i];
              const v = dataArray[i] / 128.0;
              const y = (v * canvasHeight) / 2;
  
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
  
              x += sliceWidth;
            }
            // console.log(add /bufferLength , 'addd');
  
            ctx.lineTo(canvasWidth, canvasHeight / 2);
            ctx.stroke();
  
            requestAnimationFrame(drawWaveform);
          };
drawWaveform()
    };



    function timeoutFunc() {
        console.log('functionCalled',5);
        
        clearTimeOutRef.current =  setTimeout(() => {
            let count = 0
            let average: any;
            if (array.length > 0) {
                const sum = array.reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
                average = sum / array.length;

            }
            // console.log(array, "average");

            if (faceDetected.current) {
                setFaceFound(true)

            }
            else {
                // webcamRunningRef.current = false
                setFaceFound(false)
            }
            if (average < 20) {
                setNoiseDetection(true)
                count = count + 1
                console.log("average", average, 2)
                array = []
            }
            else {
                console.log("average", average, 3)
                setNoiseDetection(false)
                audioContext.current.close();
                array = []
            }

        }, 7000);
    }

    const stopStream = () => {
        console.log(45);
        
        webcamRunningRef.current = false
        if (videoStreamRef) {
            videoStreamRef.current.getTracks().forEach(function (track) {
                track.stop();
            });
        }

        audioStreamRunningRef.current = false
        if (audioContext.current) {
            audioContext.current.close();
        }
        if (audioStreamRef.current) {
            const tracks = audioStreamRef.current.getTracks();
            tracks.forEach((track) => track.stop());
        }

    }
    return (
        <>
            <Modal isOpen={detectFaceModal.visible}
                onClose={() => {
                    detectFaceModal.hide()
                    setFaceFound(false)
                    setNoiseDetection(false)
                    stopStream()
                    setNoiseDetection('Checking')
                    setFaceFound('Checking')
                    clearTimeout(clearTimeOutRef.current)
                    // setCallDetectFace(false)
                    goBack()
                }}
                title={'Face and Noise Validation'}>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <div style={{ position: 'relative', width: "400px", height: "300px" }}>
                        <video id="webcam" ref={videoRef} autoPlay playsInline style={{ position: 'absolute', left: '0px', top: '0px', bottom: "0px", right: '0px' }}></video>
                        <canvas className="output_canvas" id="output_canvas" style={{ position: 'absolute', left: '0px', top: '0px', bottom: "0px", right: '0px' }}></canvas>
                        <canvas ref={canvasRef} width={400} height={100} style={{ position: 'absolute', left: '0px', bottom: "0px", right: '0px' }} />
                    </div>
                    <div className='mt-4'>

                        {
                            faceFound === 'Checking' && noiseDetection === 'Checking' ? <h5 className='text-secondary'>Checking...</h5> : faceFound && noiseDetection ? <Button text={'Continue'} className={'m-0'} onClick={()=>{detectFaceModal.hide()
                                webcamRunningRef.current = false
                                audioStreamRunningRef.current = false
                                setNoiseDetection('Checking')
                                setFaceFound('Checking')
                                audioContext.current.close();
                                onClick()
                        }}></Button> : <Button text={'Try Again'} className={'m-0'} onClick={() => {
                                // setTryAgain(tryAgain + 1)
                                // createFaceLandmarker()
                                setNoiseDetection('Checking')
                                setFaceFound('Checking')
                                enableCam()
                            }}></Button>
                        }
                    </div>

                        <div className='mt-3 mb--5'>
                            {
                                faceFound === 'Checking' ? <></> : faceFound === true ? <div>
                                    <Image src={icons.checkIcon} height={12} width={12} style={{
                                        objectFit: 'contain'
                                    }} />
                                    <span className='ml-2'>Face detected</span>
                                </div> : <div> <Image src={icons.frameIcon} height={20} width={12} style={{
                                    objectFit: 'contain'
                                }} /> <span className='ml-1'>Face not detected</span></div>
                            }
                            {
                                noiseDetection === 'Checking' ? <></> :
                                    noiseDetection === true ? <div>
                                        <Image src={icons.checkIcon} height={12} width={12} style={{
                                            objectFit: 'contain'
                                        }} />
                                        <span className='ml-2'>No noise captured</span>
                                    </div> : <div> <Image src={icons.frameIcon} height={20} width={12} style={{
                                        objectFit: 'contain'
                                    }} /> <span className='ml-1'>Noise occurred</span></div>
                            }
                        </div>
                </div>

            </Modal>
        </>
    );
};

export default DetectFace3;

