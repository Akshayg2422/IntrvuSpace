import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, DrawingUtils, FaceLandmarker } from '@mediapipe/tasks-vision';
import { useModal, useNavigation, useLoader } from '@Hooks';
import { Back, Button, Image, Modal, Spinner } from '@Components';
import { icons } from '@Assets';
import {
    getOperatingSystem,
    gotoPermissionSetting,
    hasCameraPermission,
    hasMicrophonePermission,
} from "@Utils";
import './index.css'

function DetectFace({ onClick, heading, experience, duration, loading }) {



    const videoRef = useRef<any>(null)

    let faceLandmarker: any;
    let runningMode = "IMAGE";

    const webcamRunningRef = useRef<any>()
    const videoWidth = 600;
    const faceDetected = useRef<any>(null)
    const canvasRef = useRef<any>(null)
    const audioContext = useRef<any>(null)
    const [noiseDetection, setNoiseDetection] = useState<any>('Checking')
    let array: any = []
    const [faceFound, setFaceFound] = useState<any>('Checking')
    const [micCheck, setMicCheck] = useState<any>('Checking')

    const detectFaceModal = useModal(false)
    const videoStreamRef = useRef<any>()
    const audioStreamRef = useRef<any>(null)
    const audioStreamRunningRef = useRef<any>()
    const clearTimeOutRef = useRef<any>()
    const { goBack } = useNavigation();
    const [proceed, setProceed] = useState(false)
    const camPermissionModal = useModal(false);
    const micPermissionModal = useModal(false);
    const [showDetecting, setShowDetecting] = useState<any>(false)
    // const [showCanvas, setShowCanvas] = useState(false)

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
            // After loading model, start detecting face and noise detection 
            detectingHandler()
        }
        catch (error) {
            console.log(error, 'error1');
        }



    }

    let video
    let canvasElement
    let canvasCtx
    let drawingUtils

    let hitCount = 0
    useEffect(() => {

        if (hitCount === 0) {
            checkMicAndCameraPermission()
            console.log('hit');
            hitCount = hitCount + 1
        }
        console.log(hitCount, "hitCount");


    }, [])
    // checking camera and mic permission
    async function checkMicAndCameraPermission() {
        const hasCamPermission = await hasCameraPermission();
        if (hasCamPermission) {
            camPermissionModal.hide();

            const hasMicPermission = await hasMicrophonePermission();
            if (hasMicPermission) {
                micPermissionModal.hide();
                // detectFaceModal.show()
                setShowDetecting(true)
                enableCam()
            } else {
                micPermissionModal.show();
            }
        } else {
            camPermissionModal.show();

        }
    }

    // Enable the live webcam view and start detection.

    function enableCam() {
        // getUsermedia parameters.
        const constraints = {
            video: true
        } as any;

        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            videoStreamRef.current = stream
            video = videoRef?.current
            canvasElement = document?.getElementById(
                "output_canvas"
            );
            canvasCtx = canvasElement?.getContext("2d");
            drawingUtils = new DrawingUtils(canvasCtx);
            console.log(video, 'videooooo');
            if (video)
                video.srcObject = stream;

            // Load face landMark model
            if (video) {
                createFaceLandmarker();
            }
        });
    }

    function detectingHandler() {
        if (webcamRunningRef.current) {
            startAudioDetect()
            timeoutFunc()
        }

        webcamRunningRef.current = true

        if (!faceLandmarker) {
            console.log("Wait! faceLandmarker not loaded yet.");
            return;
        }
        else {
            startAudioDetect()
            timeoutFunc()
            // video.addEventListener("loadeddata", predictWebcam);
            predictWebcam()
        }

    }



    let lastVideoTime = -1;
    let results: any = undefined;

    // predicting faceLandMark 

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
                    { color: "#C0C0C070", lineWidth: 0.4 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
                    { color: "#E0E0E0", lineWidth: 0.3 }
                );
                // drawingUtils.drawConnectors(
                //     landmarks,
                //     FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
                //     { color: "#E0E0E0", lineWidth: 1 }
                // );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
                    { color: "#E0E0E0", lineWidth: 0.3 }
                );
                // drawingUtils.drawConnectors(
                //     landmarks,
                //     FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
                //     { color: "#E0E0E0", lineWidth: 1 }
                // );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
                    { color: "#4cc916", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LIPS,
                    { color: "#E0E0E0", lineWidth: 0.4 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
                    { color: "#E0E0E0", lineWidth: 0.3 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
                    { color: "#E0E0E0", lineWidth: 0.4 }
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

    // detecting audio stream
    function startAudioDetect() {
        audioStreamRunningRef.current = true

        audioContext.current = new window.AudioContext();
        const analyser = audioContext.current.createAnalyser();
        analyser.fftSize = 2048;
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

        // const gradient = ctx.createLinearGradient(0, 100, 250, 0);

        // // Add three color stops
        // gradient.addColorStop(0, "#641df2");
        // gradient.addColorStop(0.5, "#641df2");
        // gradient.addColorStop(1, "#641df2");

        // const draw = () => {

        //     analyser.getByteFrequencyData(dataArray);
        //     console.log(dataArray,"dataArray",bufferLength);



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

            analyser.getByteFrequencyData(dataArray);
            let add = 0
            for (let j = 0; j < bufferLength; j++) {
                add = add + dataArray[j];
            }
            array.push(Math.round(add / bufferLength))

            console.log(array, 'addd');

            analyser.getByteTimeDomainData(dataArray);


            // Set transparent background
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#4cc916';
            ctx.beginPath();

            const sliceWidth = (canvasWidth * 1.0) / bufferLength;
            let x = 0;


            for (let i = 0; i < bufferLength; i++) {

                const v = dataArray[i] / 128.0;
                const y = (v * canvasHeight) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }


            ctx.lineTo(canvasWidth, canvasHeight / 2);
            ctx.stroke();

            if (audioStreamRunningRef.current) {
                requestAnimationFrame(drawWaveform);
            }
        };
        drawWaveform()
    };


    function timeoutFunc() {
        console.log('functionCalled', 5);

        clearTimeOutRef.current = setTimeout(() => {
            let count = 0
            let average: any;
            let MicDisableAverage: any;
            if (array.length > 0) {
                const sum = array.reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
                average = sum / array.length;
                const micDisableSum = array.slice(array.length-10, array.length).reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
                MicDisableAverage = micDisableSum / 10
                // console.log(micDisableSum,"micDisableSum");
                

            }
            console.log(array, "average");

            if (faceDetected.current) {
                setFaceFound(true)
                count = count + 1
            }
            else {
                // webcamRunningRef.current = false
                setFaceFound(false)
                // audioContext.current.close();

            }
            if (MicDisableAverage == 0) {
                setMicCheck(true)
                audioContext.current.close();
                audioStreamRunningRef.current = false
                array = []
            }
            else {
                count = count + 1
                setMicCheck(false)
               
            }

            if (average < 30) {
                setNoiseDetection(true)
                count = count + 1
                console.log("average", average, 2)
                array = []
            }
          
            else {
                console.log("average", average, 3)
                setNoiseDetection(false)
                audioStreamRunningRef.current = false
                audioContext.current.close();
                array = []
            }
            if (count === 3) {
                webcamRunningRef.current = false
                audioStreamRunningRef.current = false
                audioContext.current.close();
                console.log(audioContext.current.state);

                setProceed(true)
            }

        }, 7000);
    }

    const stopStream = () => {
        console.log(45);
        setNoiseDetection('Checking')
        setFaceFound('Checking')
        setMicCheck('Checking')
        clearTimeout(clearTimeOutRef.current)

        webcamRunningRef.current = false
        if (videoStreamRef) {
            videoStreamRef.current.getTracks().forEach(function (track) {
                track.stop();
            });
        }

        audioStreamRunningRef.current = false
        console.log(audioContext.current, 'js');

        // if (noiseDetection) {
        //     audioContext.current.close();
        // }
        if (audioStreamRef.current) {
            console.log(audioStreamRef.current, "audioStreamRef");

            const tracks = audioStreamRef.current.getTracks();
            tracks.forEach((track) => track.stop());
        }
        console.log(audioStreamRef.current, "audioStreamRef");
        goBack()
    }
    return (
        <>
            <div className='position-relative px-lg-6 pt-4 px-2' >
                <div className='screen-back'>
                    <Back variant='override' onClick={stopStream} />
                </div>
                <div className={'text-secondary col-md-9 mb-md-4 m-0 p-0'}>
                    <span className="screen-heading m-0 p-0 lh-120">{`Interview for the role of ${heading}`}<span className={'text-secondary text-des ml-2'}>{experience}</span></span>
                    <div
                        className='text-secondary text-des font-weight-700 mt-2'>
                        {`${duration} mins`}
                        <span className={'font-weight-400 ml-1'}>{'Duration'}</span>
                    </div>
                </div>
                {/* <Modal isOpen={detectFaceModal.visible}
                onClose={() => {
                    detectFaceModal.hide()
                    setFaceFound(false)
                    setNoiseDetection(false)

                    setNoiseDetection('Checking')
                    setFaceFound('Checking')
                    clearTimeout(clearTimeOutRef.current)
                    stopStream()
                    // setCallDetectFace(false)
                    goBack()
                }}
                title={'Validating face and noise'}
                size='xl'> */}

                {showDetecting && <div className='d-lg-flex text-secondary'>
                    <div className='col-lg-7 col-12' style={{ position: 'relative', width: "600px", height: "450px" }}>
                        <video id="webcam" ref={videoRef} autoPlay playsInline disablePictureInPicture height={450} width={600} style={{ position: 'absolute', left: '0px', top: '0px', bottom: "0px", right: '0px', }}></video>
                        {!proceed && <><canvas id="output_canvas" height={450} width={600} style={{ position: 'absolute', left: '0px', top: '0px', bottom: "0px", right: '0px', }}></canvas>
                            <canvas ref={canvasRef} width={600} height={100} style={{ position: 'absolute', left: '0px', bottom: "0px", right: '0px' }} /></>}
                    </div>
                    <div className=' col-lg-5 col-12 position-relative'>


                        <div className='ml-3 text-secondary'>
                            <h2 className='text-secondary'>Checking Prerequirites</h2>
                            <div className='mt-4'>
                                {
                                    faceFound === 'Checking' ? <div className='d-flex align-items-center'> <Spinner color='secondary' className={'d-inline-block  '} /> <span className='mt-1 ml-3'>Validating video input</span></div> : faceFound === true ?
                                        <div className=' d-flex align-items-baseline'> <Image src={icons.greenTick} height={12} width={12} style={{
                                            objectFit: 'contain'
                                        }} /> <span className='ml-3'>Face visible & valid</span></div>
                                        : <div className='mt-3 d-flex align-items-center'> <Image src={icons.wrong} height={20} width={12} style={{
                                            objectFit: 'contain'
                                        }} /> <span className='ml-3 '> Face not visible & valid</span></div>
                                }

                            </div>
                            <div className='mt-2'>

                                {
                                    micCheck === 'Checking' ? <div className='d-flex align-items-center'> <Spinner color='secondary' className={'d-inline-block  '} /> <span className='mt-1 ml-3'>Validating audio input</span></div> :
                                        micCheck  ?
                                            <div className='mt-3 d-flex align-items-center'> <Image src={icons.wrong} height={20} width={12} style={{
                                                objectFit: 'contain'
                                            }} /> <span className='ml-3'> Audio input ia not clear</span></div>

                                            : <div className='mt-3 d-flex align-items-baseline'> <Image src={icons.greenTick} height={12} width={12} style={{
                                                objectFit: 'contain'
                                            }} /> <span className='ml-3'>Audio input is clear</span></div>
                                }

                            </div>
                            <div className='mt-2'>

                                {
                                    noiseDetection === 'Checking' ? <div className='d-flex align-items-center'> <Spinner color='secondary' className={'d-inline-block  '} /> <span className='mt-1 ml-3'>Checking ambience sound stability</span></div> :
                                        noiseDetection === true ?
                                            <div className='mt-3 d-flex align-items-baseline'> <Image src={icons.greenTick} height={12} width={12} style={{
                                                objectFit: 'contain'
                                            }} /> <span className='ml-3'>Ambience is quiet</span></div>

                                            : <div className='mt-3 d-flex align-items-center'> <Image src={icons.wrong} height={20} width={12} style={{
                                                objectFit: 'contain'
                                            }} /> <span className='ml-3'>Ambience is not quiet</span></div>
                                }

                            </div>
                            {
                                proceed && <div className='text-secondary'>
                                     <h2 className='mt-4 text-secondary '>Expected criteria's are met ! </h2>
                                    <div className='mt-3 d-flex align-items-baseline'> <Image src={icons.check} height={12} width={12} style={{
                                        objectFit: 'contain'
                                    }} />
                                        <span className='mb-0 ml-3  text-secondary '>Attend from a quiet and secluded space</span>
                                    </div>
                                    <div className='mt-3 d-flex align-items-baseline'> <Image src={icons.check} height={12} width={12} style={{
                                        objectFit: 'contain'
                                    }} />
                                        <span className='mb-0 ml-3  text-secondary '>Verify the stability of your internet connection</span>
                                    </div>
                                    <div className='mt-3 d-flex align-items-baseline'> <Image src={icons.check} height={12} width={12} style={{
                                        objectFit: 'contain'
                                    }} />
                                        <span className='mb-0 ml-3  text-secondary '>Keep the video function enabled throughout the session</span>
                                    </div>
                                </div>}

                            {!faceFound && <div className='mt-4 text-secondary'>
                                <div className='mt-3 d-flex align-items-baseline'> <Image src={icons.frame} height={12} width={12} style={{
                                    objectFit: 'contain'
                                }} />  <span className='mb-0 ml-2  text-secondary '>We can't detect your face, please show your face clearly</span>
                                </div>
                            </div>
                            }
                         {micCheck === true && <div className='mt-4 text-secondary'>
                                <div className='mt-3 d-flex align-items-baseline'> <Image src={icons.frame} height={12} width={12} style={{
                                    objectFit: 'contain'
                                }} />  <span className='mb-0 ml-2  text-secondary '>Please check your mic and try again</span>
                                </div>
                            </div>
                            }
                            {!noiseDetection && <div className='mt-4 text-secondary'>
                                <div className='mt-3 d-flex align-items-baseline'> <Image src={icons.frame} height={12} width={12} style={{
                                    objectFit: 'contain'
                                }} /><span className='mb-0 ml-2  text-secondary '>You are in noisy surrounding, please be there in silent room</span>
                                </div></div>}

                        </div>
                        <div className='position-absolute bottom-0 d-flex justify-content-center right-0 left-0'>
                            <div>

                                {
                                    faceFound === 'Checking' && noiseDetection === 'Checking' ? <></> :
                                        <div className={"btn-wrapper"}>{
                                            proceed ? <Button
                                            loading = {loading}
                                                block
                                                text={'Join now'} className={'m-0'} onClick={() => {
                                                    onClick()
                                                }}></Button> : <Button
                                                    block
                                                    text={'Try Again'} className={'m-0'} onClick={() => {
                                                        setNoiseDetection('Checking')
                                                        setFaceFound('Checking')
                                                        setMicCheck('Checking')
                                                        detectingHandler()
                                                    }}></Button>
                                        }
                                        </div>
                                }
                            </div>

                        </div>
                    </div>

                </div>

                }

            </div>
            {/* </Modal> */}


            {/** Microphone access modal */}
            <Modal
                isOpen={micPermissionModal.visible}
                onClose={() => {
                    micPermissionModal.hide();
                    //   startInterviewLoader.hide();
                }}
                title={"Microphone Access Required"}
            >
                <div>
                    <h3 className="text-gray-dark font-weight-500">
                        To continue, grant microphone access:
                    </h3>
                    <p className="mb-0">{"1. Check browser settings."}</p>
                    <p className="mb-0">
                        {"2. Enable microphone access in system settings. "}
                        <span
                            className="pointer text-primary font-weight-700"
                        // onClick={gotoPermissionSetting}
                        >{`(${getOperatingSystem()})`}</span>
                    </p>
                </div>
                <div className="d-flex float-right">
                    <Button
                        text={"OK"}
                        onClick={() => {
                            micPermissionModal.hide();
                            //   startInterviewLoader.hide();
                        }}
                    />
                </div>
            </Modal>
            {/**
       * Camera permission modal
       */}

            <Modal
                isOpen={camPermissionModal.visible}
                onClose={() => {
                    camPermissionModal.hide();
                    //   startInterviewLoader.hide();
                }}
                title={"Camera Permission"}
                subTitle={
                    "Please provide access to your web camera to start the interview"
                }
                buttonText="Close"
                onClick={() => {
                    camPermissionModal.hide();
                    //   startInterviewLoader.hide();
                }}
            />
        </>
    );
};

export default DetectFace;