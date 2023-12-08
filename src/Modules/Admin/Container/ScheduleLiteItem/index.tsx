import { Button, CommonTable, MenuBar, ViewMore, showToast, WatchInterviewModal, Modal, StatusIcon, Image } from "@Components";
import { watchInterviewVideoUrl } from '@Redux';
import { capitalizeFirstLetter, copyToClipboard, getBrowserInfo, WATCH_VIDEO_PERMISSION_CONTEXT, getPhoto } from "@Utils";
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { ScheduleLiteItemProps } from "./interfaces";
import { useModal } from '@Hooks'
import { icons } from '@Assets'

function ScheduleLiteItem({
  item,
  onTryAnother,
  onViewMore,
  reportOnClick
}: ScheduleLiteItemProps) {

  const dispatch = useDispatch();

  const {
    interviewUrl,
  } = useSelector((state: any) => state.DashboardReducer);

  const { job_description: { position, experience, details }, candidate_details: { total_candidates }, vacancies, interview_duration, is_view_more, schedules } = item

  const openWatchInterviewNotSupportedModal = useModal(false);
  const openWatchInterviewModal = useModal(false);


  const getMenu = (is_completed: boolean) => [
    ...(!is_completed ? [{ id: 'CP', name: "Copy Interview Link" }] : []),
    ...(is_completed ? [{ id: 'WI', name: "Watch Interview" }] : []),
  ];

  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((item: any) => {
        const {
          id,
          interviewee_name,
          interviewee_mobile_number,
          interviewee_email,
          is_report_complete,
          interviewee_photo
        } = item;

        return {

          name: (
            <div className={"d-flex align-items-center"}>
              <div>
                {interviewee_photo ?
                  <Image
                    src={getPhoto(interviewee_photo)}
                    height={50}
                    width={50}
                    style={{
                      objectFit: 'cover',
                      overflow: 'hidden',
                      padding: '1px',
                      borderRadius: '30px',
                      width: "45px",
                      height: "45px",
                    }}
                  />
                  :
                  <div style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "30px",
                    backgroundColor: "#FAFBFF",
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',

                  }}>
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
                {capitalizeFirstLetter(interviewee_name)}
              </div>
            </div>
          ),
          Mobile: (
            <div className={"th-regular"}>{interviewee_mobile_number}</div>
          ),
          Email: <div className={"th-regular"}>{interviewee_email}</div>,
          " ": (
            <div className={"d-flex align-items-center"}>
              {is_report_complete && (
                <div className={"th-button"}>
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

    const { interview_link, recording_url, interviewee_name, interviewee_email } = item


    if (action.id === 'CP') {
      copyToClipboard(interview_link);
      showToast("Interview link copied", "success");
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
        showToast("Interview video unavailable", "info");
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
              {/* {
                selected_candidates > 0 &&
                <div className={'badge-schedule'} style={{
                  marginLeft: "20px"
                }}>
                  <span className={'badge-text'}>{`${selected_candidates} Selected`}</span>
                </div>
              } */}
            </div>
            <div className={'experience'}>
              {experience}
            </div>
          </div>
          <div>
            <div className={'view-details-btn'}>
              <Button
                outline
                block
                text={'Add Candidate'}
                onClick={() => {
                  if (onTryAnother) {
                    onTryAnother();
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className={'d-flex align-items-center details-wrapper'}>
          <div className={'details-container'}>
            <span className={'details-title'}>{vacancies}</span>
            <span className={'details-desc'}>{'Vacancies'}</span>
          </div>
          <div className={'details-container details-container-space'}>
            <span className={'details-title'}>{total_candidates}</span>
            <span className={'details-desc'}>{'Candidates added'}</span>
          </div>
          <div className={'details-container details-container-space'}>
            <span className={'details-title'}>{interview_duration} min</span>
            <span className={'details-desc'}>{'Duration'}</span>
          </div>
        </div>

        <div className={'jd-container'}>
          <ViewMore text={details} onViewMore={onViewMore} isViewMore={is_view_more} />
        </div>

        <div className={'schedule-item-container'}>

          {schedules &&
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
}

export { ScheduleLiteItem };
