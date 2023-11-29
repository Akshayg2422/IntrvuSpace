import { Image, Modal, StatusIcon, showToast } from "@Components";
import { WATCH_VIDEO_PERMISSION_CONTEXT, getBrowserInfo } from "@Utils";
import { UncontrolledTooltip } from "reactstrap";
import { WatchInterviewButtonIconProps } from "./interface";
import { useModal } from "@Hooks";

const WatchInterviewButtonIcon = ({
  onClick,
  id,
}: WatchInterviewButtonIconProps) => {
  const openWatchInterviewNotSupportedModal = useModal(false);

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
            if (onClick) {
              if (getBrowserInfo().browserName !== "Mozilla Firefox" && getBrowserInfo().browserName !== "Safari") {
                onClick();
              } else {
                openWatchInterviewNotSupportedModal.show();
              }
            }
          }}
        ></i>
      </div>

      {/**
       * watch interview not supported Modal
       */}

      <Modal
        isOpen={openWatchInterviewNotSupportedModal.visible}
        onClose={() => {
          openWatchInterviewNotSupportedModal.hide();
        }}
        title={"Browser Permission Denied"}
        buttonText="Close"
        onClick={() => {
          openWatchInterviewNotSupportedModal.hide();
        }}
      >
        <div className="mt--4">
          {WATCH_VIDEO_PERMISSION_CONTEXT.map((item) => {
            const { id, text, h } = item;

            return (
              <div key={id}>
                <div className="d-flex align-items-center ">
                  <StatusIcon variant={'frame'} />
                  <div className="ml-2">{text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export { WatchInterviewButtonIcon };