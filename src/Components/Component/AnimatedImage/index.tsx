import classNames from "classnames";
import "./AnimatedImageFrame.scss";
import { Col, Row } from "reactstrap";
import { AnimatedLoader, WebCamRecorder } from "@Components";

const AnimatedImage = ({ name, shouldBlink, show, variant = 'name', showWebCam = false }) => {
  const imageClasses = classNames("animated-image", { blink: shouldBlink });

  return (

    <div className="card-profile-image">
      <a className={`avatar rounded-circle ${imageClasses}`}
        style={{
          backgroundColor: '#42f542'
        }}
      >
        <div className="name-overlay text-white position-absolute "
          style={{
            zIndex: '999'
          }}
        >
          {!show ?
            <div>
              {showWebCam ?
                <WebCamRecorder /> :
                <h1 className="text-white" style={{
                  fontSize: "70px"
                }}>{name}</h1>
              }
            </div> :
            <div style={{ marginLeft: 35 }}>
              <AnimatedLoader /></div>}
        </div>
      </a>
    </div>
  )
};


export { AnimatedImage };
