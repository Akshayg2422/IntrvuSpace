import { Image, Modal } from "@Components";
import { WatchInterviewModalProps } from "./interface";
import { useEffect, useRef, useState } from "react";
import { icons } from "@Assets";
import { getPhoto } from "@Utils";
import "./index.css";

const WatchInterviewModal = ({
  isOpen,
  onClose,
  name,
  subTitle,
  urlData,
}: WatchInterviewModalProps) => {
  const [playVideoUrlIndex, setPlayVideoUrlIndex] = useState(0);
  const [recordingUrlArray, setRecordingUrlArray] = useState<any>([]);

  const { recording_url } = urlData || {};
  const videoRef = useRef<any>();

  useEffect(() => {
    if (recording_url) {
      const recordingUrlArr = [...recording_url];
      const updatedRecordingUrlArr: any = recordingUrlArr.map((item, index) => {
        return { url: item, isPaused: false };
      });
      setRecordingUrlArray(updatedRecordingUrlArr);
    }
  }, [recording_url, playVideoUrlIndex]);

  function onPauseHandler() {
    const updatedUrlArr: any = [...recordingUrlArray];
    const updatedUrlArr1: any = updatedUrlArr.map((item: any, index) => {
      if (index === playVideoUrlIndex) {
        return { ...item, isPaused: true };
      } else {
        return { ...item, isPaused: false };
      }
    });
    setRecordingUrlArray(updatedUrlArr1);
  }

  function onPlayHandler() {
    const updatedUrlArr: any = [...recordingUrlArray];
    const updatedUrlArr1: any = updatedUrlArr.map(
      (item: any, index: number) => {
        if (index === playVideoUrlIndex) {
          return { ...item, isPaused: false };
        } else {
          return { ...item, isPaused: item?.isPaused };
        }
      }
    );
    setRecordingUrlArray(updatedUrlArr1);
  }

  const onImageClickHandler = () => {
    const updatedUrlArr = [...recordingUrlArray];
    updatedUrlArr[playVideoUrlIndex].isPaused = !updatedUrlArr[playVideoUrlIndex].isPaused;
    setRecordingUrlArray(updatedUrlArr);
  
    const videoElement = videoRef.current; // Access the underlying video element
  
    if (updatedUrlArr[playVideoUrlIndex].isPaused) {
      videoElement.pause(); // Pause the video
    } else {
      videoElement.play(); // Play the video
    }
  };


  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (onClose) {
            setPlayVideoUrlIndex(0);
            onClose();
            setRecordingUrlArray([]);
          }
        }}
        title={`Watch ${name}'s Interview ${
          recording_url && recording_url.length > 1
            ? ` - Part ${playVideoUrlIndex + 1}`
            : ""
        }`}
        subTitle={`(${subTitle} minutes)`}
        size="xl"
      >
        <>
          <div className="d-flex flex-lg-row flex-column">
            <div className="col-lg-8">
              {recordingUrlArray && recordingUrlArray.length > 0 && (
                <video
                  ref={videoRef}
                  key={playVideoUrlIndex}
                  controls
                  className="d-flex col pt--3"
                  autoPlay
                  onPause={onPauseHandler}
                  onPlay={onPlayHandler}
                >
                  <source
                    src={getPhoto(recordingUrlArray[playVideoUrlIndex]?.url)}
                    type={"video/webm"}
                  />
                </video>
              )}
            </div>
            <div className="col-lg-4 video-list-container mt-lg-0 mt-5">
              {recordingUrlArray &&
                recordingUrlArray.length > 0 &&
                recordingUrlArray.map((item, index: number) => {
                  const { url, isPaused } = item || {};
                  return (
                    <div>
                      <div
                        className={` ${
                          index === playVideoUrlIndex
                            ? "selected-video-card"
                            : "individual-video-card"
                        }`}
                        onClick={() => {
                          setPlayVideoUrlIndex(index);
                        }}
                      >
                        <Image
                          key={index}
                          src={isPaused ? icons.pause : icons.play}
                          style={{
                            cursor: "pointer",
                            height: 60,
                          }}
                          onClick={onImageClickHandler}
                        />

                        <div className="part-text">{`Part ${index + 1}`}</div>
                      </div>
                      {index < recordingUrlArray.length - 1 && (
                        <div className={"video-content-border"} />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export { WatchInterviewModal };
