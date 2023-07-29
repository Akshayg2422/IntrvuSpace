import classNames from "classnames";
import "./AnimatedImageFrame.scss";
import { Col, Row } from "reactstrap";

const AnimatedImage = ({ name, shouldBlink }) => {
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
          {name}
        </div>
      </a>
    </div>
  )
};


export { AnimatedImage };
