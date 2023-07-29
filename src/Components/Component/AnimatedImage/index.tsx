import classNames from "classnames";
import "./AnimatedImageFrame.scss";
import { Col, Row } from "reactstrap";
import { AnimatedLoader } from "@Components";

const AnimatedImage = ({ name, shouldBlink, show }) => {
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
          {!show ? name : <div style={{ marginLeft: 35 }}> <AnimatedLoader /></div>}
        </div>
      </a>
    </div>
  )
};


export { AnimatedImage };
