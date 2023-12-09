import {
  Button,
  StatusIcon,
  ViewMore,
  WatchInterviewButtonIcon,
  WatchInterviewModal,
} from "@Components";
import { useModal } from "@Hooks";
import { watchInterviewVideoUrl } from "@Redux";
import {
  arrayOrderbyDate,
  capitalizeFirstLetter,
  formatDateTime,
  getDisplayTimeAgoFromMoment,
} from "@Utils";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { JdItemProps } from "./interfaces";

function JdItem({
  item,
  onViewMore,
  onTryAnotherClick,
  onProceedClick,
  onViewReport,
}: JdItemProps) {
  const { interviewUrl } = useSelector((state: any) => state.DashboardReducer);

  const dispatch = useDispatch();

  const openWatchInterviewModal = useModal(false);

  const {
    id,
    job_description: { position, experience, details },
    is_view_more,
    interview_duration,
    schedules,
  } = item;

  const filteredSchedules = schedules.filter((each: any) => {
    const { is_started, is_complete } = each;
    return is_started && is_complete;
  });

  const completedSchedules = arrayOrderbyDate(
    filteredSchedules,
    "interview_end_time",
    true
  );

  const pendingSchedules = schedules.find((each: any) => {
    const { is_complete } = each;
    return !is_complete;
  });

  return (
    <>
      <div className={"card-container"}>
        <div className={"section-container"}>
          <div>
            <div className="d-flex align-items-end">
              <span className={"screen-heading m-0 p-0"}>
                {capitalizeFirstLetter(position)}
              </span>
              <div className={"experience-home"}>{experience}</div>
            </div>

            <div>
              {pendingSchedules ? (
                <div className={"created-at-des"}>
                  {`Created at ${getDisplayTimeAgoFromMoment(
                    pendingSchedules?.created_at
                  )}`}
                </div>
              ) : (
                <>
                  {completedSchedules && completedSchedules.length > 0 && (
                    <div className={"completed-date-container"}>
                      <StatusIcon />
                      <div className={"completed-text-container"}>
                        <span className={"details-desc font-weight-700"}>
                          {"Completed on "}
                        </span>
                        <span className={"details-desc"}>
                          {formatDateTime(
                            completedSchedules[0]["interview_end_time"]
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            <div className={"view-details-btn"}>
              {pendingSchedules ? (
                <Button
                  block
                  text={
                    pendingSchedules.is_started
                      ? "Resume Interview"
                      : "Start Interview"
                  }
                  onClick={() => {
                    if (onProceedClick) {
                      onProceedClick(pendingSchedules?.id);
                    }
                  }}
                />
              ) : (
                <Button
                  block
                  outline
                  text={"Try Another"}
                  onClick={() => {
                    if (onTryAnotherClick) onTryAnotherClick(id);
                  }}
                />
              )}
            </div>
            <div className={"d-flex align-items-center justify-content-center"}>
              <div className={"details-container"}>
                <span className={"details-title"}>
                  {interview_duration} mins
                </span>
                <span className={"details-desc"}>{"Duration"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={"jd-container"}>
          <ViewMore
            isViewMore={is_view_more}
            text={details}
            onViewMore={onViewMore}
          />
        </div>
        {completedSchedules && completedSchedules.length > 0 && (
          <div className={"complete-schedule-container"}>
            <div className={"completed-item-container"}>
              <div className={"completed-item-heading"}></div>
              <div className={"completed-item-content"}>
                <div className={"skill-empty"}>{""}</div>
                <div className={"skill-value font-weight-bold"}>
                  {"Skill Matrix"}
                </div>
                <div className={"skill-value font-weight-bold"}>
                  {"Communication"}
                </div>
                <div className={"skill-value font-weight-bold"}>
                  {"Aptitude"}
                </div>
                <div className={"skill-value"}>
                  <div className={"report-btn-container"}>{""}</div>
                </div>
                <div className={"skill-empty"}>{""}</div>
              </div>
            </div>
            {completedSchedules.map((item: any, index: number) => {
              console.log("item", item);

              const {
                id,
                report_analytics,
                is_report_complete,
                is_complete,
                interview_end_time,
                recording_url,
                interviewee_email,
                interviewee_name,
                is_video_recording_manditory,
              } = item;

              const { skill_matrix, other_analytics } = report_analytics || {};
              return (
                <>
                  <div className={"completed-item-container"}>
                    <div className={"completed-item-heading"}>
                      <span className={"point-heading"}>
                        {"Interview " + (index + 1)}
                      </span>
                      <div className={"completed-at"}>
                        {`Completed at ${getDisplayTimeAgoFromMoment(
                          interview_end_time
                        )}`}
                      </div>
                    </div>
                    <div className={"completed-item-content"}>
                      <div className={"skill-empty"}>{""}</div>
                      <div className={"skill-value"}>{skill_matrix}</div>
                      <div className={"skill-value"}>
                        {other_analytics?.communication}
                      </div>
                      <div className={"skill-value"}>
                        {other_analytics?.aptitude}
                      </div>
                      <div className={"skill-value"}>
                        {is_report_complete && (
                          <div className={"report-btn-container"}>
                            <Button
                              block
                              outline
                              text={"View Report"}
                              onClick={() => {
                                if (onViewReport) {
                                  onViewReport(id);
                                }
                              }}
                            />
                          </div>
                        )}
                        {is_complete && !is_report_complete && (
                          <div>
                            <span className="name text-sm">
                              Generating Report ...
                            </span>
                          </div>
                        )}
                      </div>
                      <div
                        className={
                          "skill-empty d-flex align-items-center justify-content-center"
                        }
                      >
                        {recording_url && recording_url.length > 0 && (
                          <WatchInterviewButtonIcon
                            id={"1000"}
                            onClick={() => {
                              openWatchInterviewModal.show();
                              dispatch(
                                watchInterviewVideoUrl({
                                  recording_url,
                                  interview_duration,
                                  interviewee_name,
                                })
                              );
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {completedSchedules.length !== index + 1 && (
                    <div className={"completed-item-content-border"}></div>
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>

      {/** watch Interview */}

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
    </>
  );
}

export { JdItem };
