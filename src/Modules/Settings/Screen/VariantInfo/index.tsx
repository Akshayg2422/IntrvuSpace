import {
  MenuBar,
  ViewMore,
  showToast,
  Alert
} from "@Components";
import { useModal } from '@Hooks';
import { Candidates, } from '@Modules';
import { fetchCandidatesCorporate, getCorporateScheduleDetails, postCorporateScheduleActions } from '@Redux';
import { displayFormatDate, } from '@Utils';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";


function VariantInfo() {

  const dispatch = useDispatch()


  /**
   * screen constants
   */

  const MODIFY_OPTION = [
    { id: 1, name: "Close JD" },
    { id: 2, name: "Modify Deadlines" },
  ];

  const {
    selectedRole,
    corporateScheduleDetails,
    candidatesList,
    candidatesListNumOfPages,
    candidatesListCurrentPages,
  } = useSelector((state: any) => state.DashboardReducer);

  const { id } = selectedRole

  const { job_description, department, interview_duration, candidate_deadline, created_by, created_at, vacancies, is_closed, candidate_details } = corporateScheduleDetails || {};
  const { position, experience, details } = job_description || {};

  const loader = useModal(false);


  /**
   * view more details
   */

  const [viewMore, setViewMore] = useState(false)



  useEffect(() => {
    getCorporateScheduleDetailsHandler();
  }, []);



  const getCandidatesCorporate = (page_number: number) => {

    const params = {
      corporate_openings_details_id: id,
      // ...(searchCandidate && { q: searchCandidate }),
      // ...(statusNote.value.text === "Selected" && { is_approved: true }),
      // ...(statusNote.value.text === "Rejected" && { is_rejected: true }),
      // ...(statusNote.value.text === "Yet to Start" && {
      //   is_not_attended: true,
      // }),
      page_number,
    };

    dispatch(
      fetchCandidatesCorporate({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => { },
      })
    );
  };


  const getCorporateScheduleDetailsHandler = () => {
    const params = {
      corporate_openings_details_id: id,
    };
    loader.show()
    dispatch(
      getCorporateScheduleDetails({
        params,
        onSuccess: (response: any) => () => {
          loader.hide()
        },
        onError: (error: any) => () => {
          loader.hide()
        },
      })
    );
  };


  function onScheduleMenuHandler(action: any) {
    if (action.id === MODIFY_OPTION[0].id) {
      console.log('action');

      const params = { is_closed: true }
      corporateScheduleActionsHandler(params);

      // modifyDeadlineModal.show();
      // setScheduleDate(
      //   getDateFromServer(
      //     corporateScheduleDetails?.candidate_deadline
      //   )
      // );
      // setEndTime(
      //   getDisplayTime(
      //     corporateScheduleDetails?.candidate_deadline
      //   )
      // );
    } else if (action.name === "Close JD") {
    }
  }

  const corporateScheduleActionsHandler = (updatedParams: any) => {
    const params = {
      corporate_openings_details_id: corporateScheduleDetails?.id,
      ...updatedParams
      // ...(action === "Close JD" && ),
      // ...(action === "Modify Deadlines" && {
      //   deadline: moment(scheduleDate + "T" + endTime).format(
      //     "YYYY-MM-DDTHH:mm:ss"
      //   ),
      // }),
    };

    dispatch(
      postCorporateScheduleActions({
        params,
        onSuccess: (response: any) => () => {
          getCorporateScheduleDetailsHandler();
          showToast(response.message, "success");
          // getCandidatesCorporate(candidatesListCurrentPages);
          // modifyDeadlineModal.hide();
          // resetValues();
        },
        onError: (error: any) => () => {
          showToast(error.error_message, "error");
        },
      })
    );
  };


  return (
    <div className={'screen'}>
      <div className={'screen-variant-info'}>

        <div className={'variant-header'}>
          <div>
            <div className={'screen-heading'}>{position}</div>
            <div className={'experience'}>
              {experience}
            </div>
          </div>

          <div className={'vacancies-container'}>
            <div className={'screen-heading'}>{`${vacancies} Vacancies`}</div>
            {!is_closed &&
              <div className={'menu-container'}>
                <MenuBar menuData={MODIFY_OPTION} onClick={onScheduleMenuHandler} />
              </div>
            }
          </div>

        </div>


        <Candidates id={id} details={corporateScheduleDetails} />

        <div className={'jd-details-container'}>
          <div className={'screen-heading heading-space'}>{'Job Details'}</div>
          <div>
            {details && <ViewMore text={details} isViewMore={viewMore} onViewMore={setViewMore} />}
          </div>
        </div>

        <div className={'other-info-container'}>
          <div className={'screen-heading heading-space'}>{'Other Information'}</div>
          <div className={'card-container'}>

            <div className={'other-info-details-container'}>
              <div className={'info-container '}>
                <div className={'info-title'}>
                  {'Department'}
                </div>
                <div className={'info-content'}>
                  {department}
                </div>
              </div>
              <div className={'info-container '}>
                <div className={'info-title'}>
                  {'Interview Duration'}
                </div>
                <div className={'info-content'}>
                  {interview_duration + ' Mins'}
                </div>
              </div>
              <div className={'info-container'}>
                <div className={'info-title'}>
                  {'Candidate Deadline'}
                </div>
                <div className={'info-content'}>
                  {displayFormatDate(
                    candidate_deadline
                  )}
                </div>
              </div>
            </div>
            <div className={'other-info-details-container'}>
              <div className={'info-container '}>
                <div className={'info-title'}>
                  {'Created By'}
                </div>
                <div className={'info-content'}>
                  {created_by}
                </div>
              </div>
              <div className={'info-container'}>
                <div className={'info-title'}>
                  {'Candidate Deadline'}
                </div>
                <div className={'info-content'}>
                  {displayFormatDate(
                    created_at
                  )}
                </div>
              </div>
              <div className={'info-container'}>
              </div>
            </div>
          </div>
        </div>

      </div>


      <Alert title={'Close Jd'} subTitle={'Are you sure, want to close this JD?'} isOpen={true} onClose={() => { }} />

    </div >
  );
}

export { VariantInfo };
