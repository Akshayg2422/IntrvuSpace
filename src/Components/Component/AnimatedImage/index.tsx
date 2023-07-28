import classNames from "classnames";
import "./AnimatedImageFrame.scss";
import { Col, Row } from "reactstrap";

const AnimatedImage = ({ name, shouldBlink }) => {
  const imageClasses = classNames("animated-image", { blink: shouldBlink });

  return (

    <div className="card-profile-image">
      <a className={`avatar rounded-circle ${imageClasses}`}>
        <div className="name-overlay">
          {name}
        </div>
      </a>
    </div>
    //   <div className="card-profile-image">
    //     <a  className={`avatar rounded-circle ${imageClasses}`}>
    //       <div className="name-overlay">
    //         {name}
    //       </div>
    //     </a>
    // </div>

  )
};


export { AnimatedImage };
