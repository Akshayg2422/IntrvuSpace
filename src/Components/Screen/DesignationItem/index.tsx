import { icons } from "@Assets";
import { Button, Image, StatusIcon, ViewMore } from "@Components";
import { capitalizeFirstLetter } from "@Utils";
import { DesignationItemProps } from "./interfaces";
import './index.css';

function DesignationItem({
  item,
  onViewDetails,
  onViewMore
}: DesignationItemProps) {

  const { job_description: { position, experience, details }, candidate_details: { selected_candidates, total_candidates }, is_active, vacancies, interview_duration, is_view_more } = item

  return (

    <div className={'card-container'}>

      <div className={'section-container'}>
        <div>
          <div className={"d-flex align-items-center"}>
            <span className={'screen-heading m-0 p-0'}>
              {capitalizeFirstLetter(position)}
            </span>
            {
              selected_candidates > 0 &&
              <div className={'badge-schedule'} style={{
                marginLeft: "20px"
              }}>
                <span className={'badge-text'}>{`${selected_candidates} Selected`}</span>
              </div>
            }
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
              text={'View Details'}
              onClick={() => {
                if (onViewDetails) {
                  onViewDetails();
                }
              }}
            />
          </div>
          <div className={'d-flex align-items-center justify-content-center'}>
            <div className={'status-container'}>
              {is_active ? (
                <>
                  <StatusIcon />
                  <span className={'status-active'}>Active</span>
                </>

              ) : (
                <h5 className={'status-closed'}>
                  Closed
                </h5>
              )}
            </div>
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


    </div >
  );
}

export { DesignationItem };
