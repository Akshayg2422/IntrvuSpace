import { Button, CommonTable, MenuBar, ViewMore, showToast, WatchInterviewModal, Modal, StatusIcon, Image } from "@Components";
import { watchInterviewVideoUrl } from '@Redux';
import { capitalizeFirstLetter, copyToClipboard, getBrowserInfo, WATCH_VIDEO_PERMISSION_CONTEXT, getPhoto } from "@Utils";
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { ScheduleLiteItemProps } from "./interfaces";
import { useModal } from '@Hooks'
import { icons } from '@Assets'

function SuperAdminScheduleItem({
  item,
  onTryAnother,
  onViewMore,
  reportOnClick,
  otherMenuHandler,
  proceedInterviewClick
}: ScheduleLiteItemProps) {

  const dispatch = useDispatch();

  const JD_MENU = [{ id: 'DE', name: "Delete" }];


  const {
    interviewUrl,
  } = useSelector((state: any) => state.DashboardReducer);

  const { id, job_description: { position, experience, details }, interview_duration, is_view_more, schedules } = item

  const openWatchInterviewNotSupportedModal = useModal(false);
  const openWatchInterviewModal = useModal(false);


  const SCHEDULE_MENU = [
    { id: "VI", name: "View Interview Info" },
    { id: "RI", name: "Reset Interview" },
    { id: "DI", name: "Delete Interview" },
  ];

  const getMenu = (is_completed: boolean) => [
    ...SCHEDULE_MENU,
    ...(!is_completed ? [{ id: 'CP', name: "Copy Interview Link" }] : []),
    ...(is_completed ? [{ id: 'WI', name: "Watch Interview" }] : []),
  ];



  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((item: any, index: number) => {
        const {
          id,
          interviewee_name,
          interviewee_mobile_number,
          interviewee_email,
          is_report_complete,
          interviewee_photo,
          is_complete,
          is_started,
          custom_interviewee_details
        } = item;


        const basic_info = custom_interviewee_details?.basic_info;

        const basicInfo = basic_info && basic_info.first_name ? basic_info : null;

        let demoDisplayName: any = undefined;

        if (basicInfo)
          demoDisplayName = basicInfo?.first_name;

        return {

          name: (
            <div className={"d-flex align-items-center"}>
              <div>
                {interviewee_photo ?
                  <Image
                    className={'profile-container'}
                    src={getPhoto(interviewee_photo)}
                  />
                  :
                  <div className={'profile-placeholder-container'}>
                    <Image
                      src={icons.profile}
                      height={20}
                      width={20}
                      style={{
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                }
              </div>
              <div className={"th-bold ml-3"}>
                {capitalizeFirstLetter(demoDisplayName || interviewee_name)}
              </div>
            </div>
          ),
          Mobile: (
            <div className={"th-regular"}>{interviewee_mobile_number}</div>
          ),
          Email: <div className={"th-regular"}>{interviewee_email}</div>,
          " ": (
            <div className={"d-flex align-items-center"}>
              {
                is_report_complete && (
                  <div className={"btn-wrapper"}>
                    <Button
                      block
                      outline
                      text={"Report"}
                      onClick={() => {
                        reportOnClick(id);
                      }}
                    />
                  </div>
                )}
              {is_complete && !is_report_complete && (
                <div className="d-flex align-items-center">
                  <span className="name mb-0 text-sm">
                    Generating Report ...
                  </span>
                </div>
              )}
              {!is_complete && (
                <div className={"btn-wrapper"}>
                  <Button
                    block
                    className={
                      " border border-primary rounded-sm"
                    }
                    text={
                      is_started
                        ? "Resume Interview"
                        : "Start Interview"
                    }
                    onClick={() => {
                      if (proceedInterviewClick) {
                        proceedInterviewClick(id)
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ),
          "  ": (
            <div className={"d-flex align-items-center"}>
              <div className={"th-menu-container"}>
                <MenuBar
                  menuData={getMenu(is_report_complete)}
                  onClick={(action) => { menuOnClickHandler(action, item) }}
                />
              </div>
            </div>
          ),
        };
      });
  };


  function menuOnClickHandler(action: any, item: any) {

    const { id, interview_link, recording_url, interviewee_name, interviewee_email } = item


    if (action.id === 'CP') {
      copyToClipboard(interview_link);
      showToast('Interview link copied', 'success');
    } else if (action.id === 'WI') {
      if (recording_url && recording_url.length > 0 && interview_duration) {
        dispatch(
          watchInterviewVideoUrl({
            recording_url,
            interview_duration,
            interviewee_name,
            interviewee_email,
          })
        );

        if (
          getBrowserInfo().browserName !== "Mozilla Firefox" &&
          getBrowserInfo().browserName !== "Safari"
        ) {
          openWatchInterviewModal.show();
        } else {
          openWatchInterviewNotSupportedModal.show();
        }
      } else {
        showToast('Interview video unavailable', 'info');
      }
    } else {
      if (otherMenuHandler) {
        otherMenuHandler(action.id, id)
      }
    }

  }


  return (

    <>
      <div className={'card-container'}>
        <div className={'section-container'}>
          <div>
            <div className={"d-flex align-items-center"}>
              <span className={'screen-heading m-0 p-0'}>
                {capitalizeFirstLetter(position)}
              </span>
            </div>
            <div className={'experience'}>
              {experience}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className={'btn-wrapper'}>
              <Button
                outline
                block
                text={'Add Another'}
                onClick={() => {
                  if (onTryAnother) {
                    onTryAnother();
                  }
                }}
              />
            </div>
            <div className="ml-3">
              <MenuBar
                menuData={JD_MENU}
                onClick={(action) => {
                  if (otherMenuHandler)
                    otherMenuHandler(action.id, id)
                }}
              />
            </div>
          </div>
        </div>

        <div className={'d-flex align-items-center details-wrapper'}>
          <div className={'details-container'}>
            <span className={'details-title'}>{interview_duration} min</span>
            <span className={'details-desc'}>{'Duration'}</span>
          </div>
        </div>

        <div className={'jd-container'}>
          <ViewMore
            isViewMore={is_view_more}
            text={details}
            onViewMore={onViewMore}
          />
        </div>

        <div className={'schedule-item-container overflow-auto py-3'}>
          {
            schedules &&
            schedules.length > 0 &&
            <CommonTable
              tableDataSet={schedules}
              displayDataSet={normalizedTableData(schedules)}
            />
          }
        </div >

      </div >
      <WatchInterviewModal
        isOpen={openWatchInterviewModal.visible}
        onClose={() => {
          openWatchInterviewModal.hide();
          dispatch(watchInterviewVideoUrl(undefined));
        }}
        name={interviewUrl?.interviewee_name?.trim()}
        subTitle={interviewUrl?.interview_duration}
        urlData={interviewUrl}
      />

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
            const { id, text } = item;
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
}

export { SuperAdminScheduleItem };
