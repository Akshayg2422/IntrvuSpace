import { Button, ViewMore, Image } from "@Components";
import { capitalizeFirstLetter, arrayOrderbyDate } from "@Utils";
import { JdItemProps } from "./interfaces";
import { icons } from '@Assets';
import './index.css';


function JdItem({
  item,
  onViewDetails,
  onViewMore
}: JdItemProps) {

  const { job_description: { position, experience, details }, is_view_more, interview_duration, schedules } = item;



  const completedSchedules = schedules && schedules.length > 0 ? arrayOrderbyDate(schedules, 'interview_end_time') : []
    .filter((each: any) => {
      const { is_started, is_complete } = each;
      return is_started && is_complete;
    })


  const pendingSchedules = schedules.find((each: any) => {
    const { is_complete } = each;
    return !is_complete;
  });

  return (

    <div className={'card-container'}>
      <div className={'section-container'}>
        <div>
          <div className="d-flex align-items-center">
            <span className={'screen-heading m-0 p-0'}>
              {capitalizeFirstLetter(position)}
            </span>
          </div>
          <div className={'experience'}>
            {experience}
          </div>
          <div>
            {pendingSchedules ?
              <>
              </>
              :
              <Image
                src={icons.check}
                height={15}
                width={15}
                style={{
                  objectFit: "contain",
                }}
              />
            }
            {/* <h5 className="col mb-0 font-weight-normal p-0 font-weight-bolder text-secondary">
              {is_complete
                ? "Completed "
                : "Created at "}{" "}
              <span className="font-weight-normal text-secondary">
                {"on " +
                  formatDateTime(created_at)}{" "}
              </span>
            </h5> */}
          </div>
        </div>
        <div >
          <div className={'view-details-btn'}>
            <Button
              outline
              block
              text={'View Details'}
              onClick={() => {
                if (onViewDetails) {
                  onViewDetails();
                }
              }}
            />
          </div>
          <div className={'d-flex align-items-center justify-content-center'}>
            <div className={'details-container'}>
              <span className={'details-title'}>{interview_duration} mins</span>
              <span className={'details-desc'}>{'Duration'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={'jd-container'}>
        <ViewMore isViewMore={is_view_more} text={details} onViewMore={onViewMore} />
      </div>
    </div >
  );
}

export { JdItem };
