import { Image, Modal } from "@Components";
import { WatchInterviewModalProps } from "./interface";
import { useState } from "react";
import { icons } from "@Assets";
import { SERVER } from "@Services";
import "./index.css";
import { url } from "inspector";

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
          setPlayVideoUrlIndex(0);
          if (onClose) {
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
              {recording_url && (
                <video
                  key={playVideoUrlIndex}
                  controls
                  className="d-flex col pt--3"
                >
                  <source
                    src={SERVER + recording_url[playVideoUrlIndex]?.slice(1)}
                    type={"video/webm"}
                  />
                </video>
              )}
            </div>
            <div className="col-lg-4 overflow-auto overflow-hide h-30vh">
              {recording_url &&
                recording_url.length > 0 &&
                recording_url.reverse().map((_, index: number) => {
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
                            height: index === playVideoUrlIndex ? 60 : 60,
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
