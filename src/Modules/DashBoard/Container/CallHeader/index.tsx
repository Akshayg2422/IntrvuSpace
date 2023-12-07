import React, { useState, useEffect } from "react";
import { CallHeaderProps } from "./interfaces";
import { Button, Image, Modal, MenuBar, Alert } from "@Components";
import { icons } from "@Assets";
import { color } from "@Themes";
import { useModal } from "@Hooks";
import { useSelector } from "react-redux";

function CallHeader({
  webcam,
  mic,
  onMicChange,
  onWebCamChange,
  onEndClick,
  onEndInterViewClick,
}: CallHeaderProps) {
  const { scheduleInfo } = useSelector((state: any) => state.DashboardReducer);

  const { is_video_recording_manditory, time_spent } = scheduleInfo;

  let timeSpent: any;

  const totalSeconds = Math.floor(time_spent / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  timeSpent = { hours, minutes, seconds };

  const CALL_MENU = [{ id: 0, name: "End Interview" }];

  const [time, setTime] = useState(timeSpent);
  const endInterviewModal = useModal(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + Math.floor(seconds / 60);
        const hours = prevTime.hours + Math.floor(minutes / 60);
        return {
          hours: hours,
          minutes: minutes % 60,
          seconds: seconds % 60,
        };
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function formatTime(value) {
    return value < 10 ? `0${value}` : value;
  }

  const formattedTime =
    time.hours > 0
      ? `${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(
          time.seconds
        )}`
      : `${formatTime(time.minutes)}:${formatTime(time.seconds)}`;

  function proceedMenuClickHandler(selected: any) {
    if (selected?.id === CALL_MENU[0].id) {
      endInterviewModal.show();
    }
  }

  return (
    <>
      <div
        className="align-items-center d-flex px-3"
        style={{
          backgroundColor: color.callFooter,
          height: "70px",
        }}
      >
        <div className="col-auto mb-0">
          <span className="btn-inner--icon">
            <i className="fas fa-circle text-red" />
          </span>
          <span
            className="nav-link-inner--text ml-2"
            style={{ color: "#c4c4c4" }}
          >
            {formattedTime ? formattedTime : "00:00"}
          </span>
        </div>
        <div className="col d-flex justify-content-end align-items-center">
          <div className="row align-items-center">
            <div className="text-center mr-3 pointer" onClick={onMicChange}>
              <Image
                src={mic ? icons.microPhone : icons.microPhoneMute}
                height={mic ? 22 : 24}
                width={mic ? 22 : 24}
              />
            </div>
            <div className="text-center mr-4 pointer" onClick={onWebCamChange}>
              <Image
                src={webcam ? icons.videoCam : icons.videoCamMute}
                height={25}
                width={25}
              />
            </div>
            <div>
              <Button
                color={"warning"}
                variant={"icon-rounded"}
                icon={icons.phone}
                height={22}
                width={22}
                onClick={onEndClick}
              />
            </div>
            <div className="">
              <MenuBar
                menuData={CALL_MENU}
                onClick={proceedMenuClickHandler}
                direction={`${is_video_recording_manditory ? "up" : "down"}`}
              />
            </div>
          </div>
        </div>
      </div>

      <Alert
        title={"End Interview"}
        isOpen={endInterviewModal.visible}
        onClose={endInterviewModal.hide}
        subTitle={
          "Are you sure, want to end this interview? Once you end, you cannot rejoin."
        }
        primaryOnClick={onEndInterViewClick}
        secondaryOnClick={endInterviewModal.hide}
      />
    </>
  );
}

export { CallHeader };
