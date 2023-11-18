import { showToast } from "@Components";
import { getBrowserInfo } from "@Utils";
import { UncontrolledTooltip } from "reactstrap";
import { WatchInterviewButtonIconProps } from "./interface";

const WatchInterviewButtonIcon = ({onClick, id}: WatchInterviewButtonIconProps) => {
  return (
    <>
      <UncontrolledTooltip delay={0} placement="top" target={`tooltip${id}`}>
        {"Watch Interview"}
      </UncontrolledTooltip>
      <div className="d-flex align-items-center mr-3">
        <i
          id={`tooltip${id}`}
          className="bi bi-eye-fill text-primary fa-lg pointer"
          onClick={() => {
            if(onClick){
            if (getBrowserInfo().browserName !== "Mozilla Firefox") {
                onClick()
            } else {
              showToast(
                "Watch Interview is not supported in this browser",
                "info"
              );
            }
        }
          }}
        ></i>
      </div>
    </>
  );
};

export { WatchInterviewButtonIcon };
