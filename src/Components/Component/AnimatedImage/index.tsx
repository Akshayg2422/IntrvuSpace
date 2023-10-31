import { AnimatedLoader } from "@Components";
import classNames from "classnames";
import "./AnimatedImageFrame.scss";
import { VideoStream } from "@Modules";

const AnimatedImage = ({ name, shouldBlink, show, showWebCam = false, isMuted = false, variant = 'lg' }) => {
  const imageClasses = classNames(!isMuted ? variant === 'sm' ? "animated-image-small" : "animated-image" : "", { blink: shouldBlink });


  return (
    <div className={`${imageClasses}`} >
      <div className="text-white position-absolute"
        style={{
          zIndex: '999'
        }}
      >
        {!show ?
          <div>
            <VideoStream isRecording={showWebCam} />
            {!showWebCam &&
              <div className="d-flex align-items-center justify-content-center">
                <h1 className="text-white font-weight-700" style={{
                  fontSize: variant === "sm" ? "40px" : "70px"
                }}>{name}
                </h1>
              </div>
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
