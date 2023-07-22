import React from 'react';
import Webcam  from 'react-webcam';

interface WebcamComponentProps {
  onStartRecording: (video: string) => void;
}

const WebCamRecorder: React.FC<WebcamComponentProps> = ({
  onStartRecording
}) => {
  const webcamRef = React.useRef<any>(null);
  const mediaRecorderRef = React.useRef<any>(null);
  const chunksRef = React.useRef<Blob[]>([]);

//   const handleStartCaptureClick = React.useCallback(() => {

//     mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
//         mimeType: "video/webm"
//     });
//     mediaRecorderRef.current.addEventListener(
//         "dataavailable",
//         handleDataAvailable
//     );
//     mediaRecorderRef.current.start();
// }, [webcamRef, mediaRecorderRef]);


  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  const handleStop = () => {
    const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(videoBlob);
    const reader = new FileReader();
    reader.onload = () => {
      const base64Video = reader.result as string;
      onStartRecording(base64Video);
    };
    reader.readAsDataURL(videoBlob);
  };

  return (
    <>
      <Webcam style={{height:'40%',width:'40%'}} audio={false} ref={webcamRef}  screenshotFormat="image/jpeg" />
    </>
  );
};

export  {WebCamRecorder}
