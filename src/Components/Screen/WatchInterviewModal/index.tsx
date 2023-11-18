import { Image, Modal } from "@Components";
import { WatchInterviewModalProps } from "./interface";
import { useState } from "react";
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

  const { recording_url } = urlData || {};

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (onClose) {
            setPlayVideoUrlIndex(0);
            onClose();
          }
        }}
        title={`Watch ${name}'s Interview ${
          recording_url && recording_url.length > 1 ? ` - Part ${playVideoUrlIndex + 1}` : ""
        }`}
        subTitle={`(${subTitle} minutes)`}
        size="xl"
      >
        <>
          <div className="d-flex">
            <div className="col-lg-8">
              {recording_url && recording_url.length > 0 && (
                <video
                  key={playVideoUrlIndex}
                  controls
                  className="d-flex col pt--3"
                >
                  <source
                    src={getPhoto(recording_url[playVideoUrlIndex])}
                    type={"video/webm"}
                  />
                </video>
              )}
            </div>
            <div className="col-lg-4 video-list-container">
              {recording_url &&
                recording_url.length > 0 &&
                recording_url.map((_, index: number) => {
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
                          src={
                            index === playVideoUrlIndex
                              ? icons.pause
                              : icons.play
                          }
                          style={{
                            cursor: "pointer",
                            height: 60,
                          }}
                        />

                        <div className="part-text">{`Part ${index + 1}`}</div>
                      </div>
                      {index < recording_url.length - 1 && (
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
