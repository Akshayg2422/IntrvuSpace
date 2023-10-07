import { AnimatedLoader } from "@Components";
import { color } from "@Themes";
import classNames from "classnames";
import "./AnimatedImageFrame.scss";

const AnimatedImage = ({ name, shouldBlink, show, variant = 'name', showWebCam = false, isMuted = false }) => {
  const imageClasses = classNames(!isMuted ? "animated-image" : "", { blink: shouldBlink });


  return (

    <div className={`${imageClasses}`} >
      <div className="text-white position-absolute"
        style={{
          zIndex: '999'
        }}
      >
        {!show ?
          <div className="d-flex align-items-center justify-content-center">
            <h1 className="text-white font-weight-700" style={{
              fontSize: "70px"
            }}>{name}
            </h1>
          </div> :
          <div className="col text-center">
            <AnimatedLoader />
          </div>
        }
      </div>
    </div>

  )
};


export { AnimatedImage };
