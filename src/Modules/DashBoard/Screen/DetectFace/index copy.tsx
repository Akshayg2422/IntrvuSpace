import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, DrawingUtils, FaceLandmarker } from '@mediapipe/tasks-vision';
import { useModal, useNavigation, useLoader } from '@Hooks';
import { Button, Image, Modal, Spinner } from '@Components';
import { icons } from '@Assets';

function DetectFace2({ onClick, setCallDetectFace }) {
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
   
    const detectFaceModal = useModal(false)
    const videoStreamRef = useRef<any>()
    const audioStreamRef = useRef<any>(null)
    const audioStreamRunningRef = useRef<any>()
    const clearTimeOutRef = useRef<any>()
    const { goBack } = useNavigation();
    const [proceed, setProceed] = useState(false)

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


    useEffect(() => {
        
        detectFaceModal.show()
        enableCam()
        
    }, [])

    // Enable the live webcam view and start detection.

    function enableCam() {
        // getUsermedia parameters.
        const constraints = {
            video: true
        };

        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            videoStreamRef.current = stream
            video = videoRef?.current
            canvasElement = document?.getElementById(
                "output_canvas"
            );
            canvasCtx = canvasElement?.getContext("2d");
            drawingUtils = new DrawingUtils(canvasCtx);
            video.srcObject = stream;
            if(stream){
                createFaceLandmarker();
            }
        });
    }

     function detectingHandler () {
        if (webcamRunningRef.current) {
            startAudioDetect()
            timeoutFunc()
        }

        webcamRunningRef.current = true

        if (!faceLandmarker) {
            console.log("Wait! faceLandmarker not loaded yet.");
            return;
        }
        else{
         startAudioDetect()
            timeoutFunc()
            // video.addEventListener("loadeddata", predictWebcam);
            predictWebcam()
        }

     }

   

    let lastVideoTime = -1;
    let results: any = undefined;

    async function predictWebcam() {

console.log('hello');

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
                    { color: "#641df2", lineWidth: 1 }
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

        const gradient = ctx.createLinearGradient(0, 0, 600, 0);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(0.125, "red");
        gradient.addColorStop(0.25, "orange");
        gradient.addColorStop(0.375, "yellow");
        gradient.addColorStop(0.5, "green");
        gradient.addColorStop(0.625, "blue");
        gradient.addColorStop(0.75, "indigo");
        gradient.addColorStop(0.875, "violet");
        gradient.addColorStop(1, "black");


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
            array.push(Math.round(add / bufferLength))
            // console.log(add / bufferLength, 'addd');

            if (audioStreamRunningRef.current) {
                requestAnimationFrame(draw);
            }
        };

        draw();
    };



    function timeoutFunc() {
        console.log('functionCalled', 5);

        clearTimeOutRef.current = setTimeout(() => {
            let count = 0
            let average: any;
            if (array.length > 0) {
                const sum = array.reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
                average = sum / array.length;

            }
            // console.log(array, "average");

            if (faceDetected.current) {
                setFaceFound(true)
                count = count + 1
            }
            else {
                // webcamRunningRef.current = false
                setFaceFound(false)
                // audioContext.current.close();

            }
            if (average < 20) {
                setNoiseDetection(true)
                count = count + 1
                console.log("average", average, 2)
                array = []
            }
            else if (average == 0) {
                console.log("average", faceFound, 3)
                setNoiseDetection(0)
                audioContext.current.close();
                array = []
            }
            else {
                console.log("average", faceFound, 3)
                setNoiseDetection(false)
                audioContext.current.close();
                array = []
            }
            if(count === 2){
                setProceed(true)
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
        console.log(audioContext.current, 'js');

        if (noiseDetection) {
            audioContext.current.close();
        }
        if (audioStreamRef.current) {
            console.log(audioStreamRef.current, "audioStreamRef");

            const tracks = audioStreamRef.current.getTracks();
            tracks.forEach((track) => track.stop());
        }
        console.log(audioStreamRef.current, "audioStreamRef");
    }
    return (
        <>

            <Modal isOpen={detectFaceModal.visible}
                onClose={() => {
                    detectFaceModal.hide()
                    setFaceFound(false)
                    setNoiseDetection(false)

                    setNoiseDetection('Checking')
                    setFaceFound('Checking')
                    clearTimeout(clearTimeOutRef.current)
                    stopStream()
                    setCallDetectFace(false)
                    goBack()
                }}
                title={'Validating face and noise'}
                size='xl'>
                <div className='d-flex text-secondary'>
                    <div className='col-8' style={{ position: 'relative', width: "600px", height: "450px" }}>
                        <video id="webcam" className='ml-5' ref={videoRef} autoPlay playsInline disablePictureInPicture height={450} width={600} style={{ position: 'absolute', left: '0px', top: '0px', bottom: "0px", right: '0px', }}></video>
                        <canvas className="ml-lg-5" id="output_canvas" height={450} width={600} style={{ position: 'absolute', left: '0px', top: '0px', bottom: "0px", right: '0px', }}></canvas>
                        <canvas ref={canvasRef} className='ml-5' width={600} height={100} style={{ position: 'absolute', left: '0px', bottom: "0px", right: '0px' }} />
                    </div>
                    <div className=' col-4 position-relative'>
                      

                        <div className='ml-3'>
                            <h2 className='text-secondary'>Validating</h2>
                            <div className='mt-4'>
                                {
                                    faceFound === 'Checking' ? <Spinner className={'d-inline-block'} /> : faceFound === true ?
                                        <Image src={icons.check} height={12} width={12} style={{
                                            objectFit: 'contain'
                                        }} />
                                        : <Image src={icons.frame} height={20} width={12} style={{
                                            objectFit: 'contain'
                                        }} />
                                }
                                <span className='ml-2 '>Face</span>
                            </div>
                            <div className='mt-3'>

                                {
                                    noiseDetection === 'Checking' ? <Spinner className={'d-inline-block'} /> :
                                        noiseDetection === 0 ?
                                            <Image src={icons.frame} height={12} width={12} style={{
                                                objectFit: 'contain'
                                            }} />

                                            : <Image src={icons.check} height={20} width={12} style={{
                                                objectFit: 'contain'
                                            }} />
                                }
                                <span className='ml-2'>Mic</span>
                            </div>
                            <div className='mt-3'>

                                {
                                    noiseDetection === 'Checking' ? <Spinner className={'d-inline-block'} /> :
                                        noiseDetection === true ?
                                            <Image src={icons.check} height={12} width={12} style={{
                                                objectFit: 'contain'
                                            }} />

                                            : <Image src={icons.frame} height={20} width={12} style={{
                                                objectFit: 'contain'
                                            }} />
                                }
                                <span className='ml-2'>Noise</span>
                            </div>
                            {
                                proceed ? <div className='mt-4'> <h4 >Thanks for waiting you can start your interview now</h4></div> : 
                                !faceFound && !noiseDetection ? <div className='mt-4'><h4>We can't detect your face, please show your face clearly</h4><h4 className='mt-4'>You are in noisy surrounding, please be there in silence room</h4></div>
                                 : !faceFound ? <div className='mt-4'> <h4>We can't detect your face, please show your face clearly</h4></div> 
                                 : !noiseDetection ? <div className='mt-4'> <h4>You are in noisy surrounding, please be there in silence room</h4></div> : <div></div>
                            }
                        </div>
                        <div className='position-absolute bottom-0 right-8'>
                            {
                                faceFound === 'Checking' && noiseDetection === 'Checking' ? <h5 className='text-secondary'>Checking...</h5> : faceFound && noiseDetection ? <Button text={'Continue'} className={'m-0'} onClick={() => {
                                    detectFaceModal.hide()
                                    webcamRunningRef.current = false
                                    audioStreamRunningRef.current = false
                                    setNoiseDetection('Checking')
                                    setFaceFound('Checking')
                                    audioContext.current.close();
                                    onClick()
                                }}></Button> : <Button text={'Try Again'} className={'m-0'} onClick={() => {
                                    setNoiseDetection('Checking')
                                    setFaceFound('Checking')
                                    detectingHandler()
                                }}></Button>
                            }

                        </div>
                    </div>

                </div>

            </Modal>
        </>
    );
};

export default DetectFace2;