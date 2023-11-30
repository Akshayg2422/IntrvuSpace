import { Modal } from "@Components";
import { getPhoto } from "@Utils";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { WatchInterviewModalProps } from "./interface";

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

  //useEffect to render play and pause button

  useEffect(() => {
    if (recording_url) {
      const recordingUrlArr = [...recording_url];
      const updatedRecordingUrlArr: any = recordingUrlArr.map((item, index) => {
        return { url: item, isPlay: index === 0 };
      });
      setRecordingUrlArray(updatedRecordingUrlArr);
    }
  }, [recording_url, playVideoUrlIndex]);

  // function to handle pause

  function onPauseHandler() {
    const updatedUrlArr: any = recordingUrlArray.map((item: any, index) => {
      return { ...item, isPlay: false };
    });
    setRecordingUrlArray(updatedUrlArr);
  }

  // function to handle play

  function onPlayHandler() {
    const updatedUrlArr: any = recordingUrlArray.map(
      (item: any, index: number) => {
        return { ...item, isPlay: index === playVideoUrlIndex };
      }
    );
    setRecordingUrlArray(updatedUrlArr);
  }

  // function to handle image on click using useRef

  const onImageClickHandler = async () => {
    const updatedUrlArr = [...recordingUrlArray];
    updatedUrlArr[playVideoUrlIndex].isPlay =
      !updatedUrlArr[playVideoUrlIndex].isPlay;
    setRecordingUrlArray(updatedUrlArr);

    const videoElement = videoRef.current;
    if (videoElement) {
      if (updatedUrlArr[playVideoUrlIndex].isPlay) {
        videoElement.play().catch((error: any) => {
          console.log(`Video play failed`, error);
        });
      } else {
        try {
          videoElement.pause();
        } catch (error: any) {
          console.log(`Video pause failed`, error);
        }
      }
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
        title={`Watch ${name}'s Interview ${recording_url && recording_url.length > 1
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
                  controlsList="nodownload noplaybackrate"
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
                  const { url, isPlay } = item || {};
                  return (
                    <div>
                      <div
                        className={` ${index === playVideoUrlIndex
                          ? "selected-video-card"
                          : "individual-video-card"
                          }`}
                        onClick={() => {
                          setPlayVideoUrlIndex(index);
                        }}
                      >
                        <i
                          key={index}
                          className={`bi bi-${isPlay ? "pause" : "play"
                            }-circle-fill pointer text-primary fa-3x`}
                          onClick={onImageClickHandler}
                        ></i>

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
