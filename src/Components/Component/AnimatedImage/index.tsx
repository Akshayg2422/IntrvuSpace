import { useMemo } from 'react'
import { AnimatedLoader } from "@Components";
import classNames from "classnames";
import "./AnimatedImageFrame.scss";
import { VideoStream } from "@Modules";

const AnimatedImage = ({ name, shouldBlink, show, showWebCam = false, isMuted = false, variant = 'lg', device = "web", isWebCamOff = false }) => {
  const imageClasses = classNames(!isMuted ? variant === 'sm' ? "animated-image-small" : "animated-image" : "", { blink: shouldBlink });

  // const videoStreamComponent = useMemo(() => <VideoStream isRecording={showWebCam} />, []);

  console.log(showWebCam + '==showWebCam');

  return (
    <div className={`${imageClasses}`} >
      <div className="text-white position-absolute"
        style={{
          zIndex: '999'
        }}
      >
        {!show ?
          <div>
            {(device === 'web' && showWebCam && !isWebCamOff) && <VideoStream isRecording={showWebCam} />}
            {!showWebCam || isWebCamOff ?
              <div className="d-flex align-items-center justify-content-center">
                <h1 className="text-white font-weight-700" style={{
                  fontSize: variant === "sm" ? "40px" : "70px"
                }}>{name}
                </h1>
              </div> : <></>
            }

          </div> :
          <div className="col text-center">
            <AnimatedLoader variant={variant} />
          </div>
        }
      </div>
    </div>

  )
};


export { AnimatedImage };
