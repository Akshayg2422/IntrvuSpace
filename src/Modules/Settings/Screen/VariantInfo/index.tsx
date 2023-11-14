import {
  Alert,
  DateTimePicker,
  MenuBar,
  Modal,
  ViewMore,
  showToast
} from "@Components";
import { useLoader, useModal } from '@Hooks';
import { Candidates, BulkUpload } from '@Modules';
import { getCorporateScheduleDetails, postCorporateScheduleActions } from '@Redux';
import { capitalizeFirstLetter, displayFormatDate, getDateFromServer, getDisplayTime } from '@Utils';
import moment from "moment";
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
    refreshCorporateSchedules
  } = useSelector((state: any) => state.DashboardReducer);

  const { id } = selectedRole || {}

  const { job_description, department, interview_duration, candidate_deadline, created_by, created_at, vacancies, is_closed, candidate_details } = corporateScheduleDetails || {};
  const { position, experience, details } = job_description || {};

  const loader = useModal(false);



  /**
   * view more details
   */
  const [viewMore, setViewMore] = useState(false)


  /**
   * close modal state
   */

  const closeJdModal = useModal(false)


  const scheduleActionLoader = useLoader(false);

  /**
 * modify deadline
 */

  const modifyDeadlineModal = useModal(false)
  const [scheduleEndDate, setScheduleEndDate] = useState<any>("");
  const [scheduleEndTime, setScheduleEndTime] = useState<any>("");
  const [displayDeadlineDate, setDisplayDeadlineDate] = useState("");





  useEffect(() => {
    getCorporateScheduleDetailsHandler();
  }, [refreshCorporateSchedules]);


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
      closeJdModal.show();
    } else if (action.id === MODIFY_OPTION[1].id) {
      modifyDeadlineHandler();
    }
  }


  function proceedCloseJdApiHandler() {
    const params = { is_closed: true }
    corporateScheduleActionsHandler(params);
  }

  const corporateScheduleActionsHandler = (updatedParams: any) => {
    const params = {
      corporate_openings_details_id: corporateScheduleDetails?.id,
      ...updatedParams
    };

    scheduleActionLoader.show();

    dispatch(
      postCorporateScheduleActions({
        params,
        onSuccess: (response: any) => () => {
          scheduleActionLoader.hide();
          modifyDeadlineModal.hide();
          closeJdModal.hide();
          getCorporateScheduleDetailsHandler();
          showToast(response.message, "success");
        },
        onError: (error: any) => () => {
          scheduleActionLoader.hide();
          showToast(error.error_message, "error");
        },
      })
    );

  };

  const modifyDeadlineHandler = () => {

    const displayTime = moment(getDisplayTime(candidate_deadline), 'HH:mm:ss').format('hh:mm A');
    setScheduleEndDate(
      getDateFromServer(candidate_deadline)
    );
    setDisplayDeadlineDate(
      getDateFromServer(corporateScheduleDetails?.candidate_deadline)
    );

    modifyDeadlineModal.show();
  };

  function proceedModifyDeadlineApiHandler() {

    const convertedTime = moment(scheduleEndTime, 'hh:mm A').format('HH:mm:ss')
    const date = moment(scheduleEndDate + "T" + convertedTime).format(
      "YYYY-MM-DDTHH:mm:ss");

    const params = { deadline: date }

    corporateScheduleActionsHandler(params);

  }








  return (
    <>
      <div className={'screen-padding'}>
        <div>
          <div className={'variant-header'}>
            <div>
              <div className={'screen-heading'}>{capitalizeFirstLetter(position)}</div>
              <div className={'experience'}>
                {capitalizeFirstLetter(experience)}
              </div>
            </div>

            <div className={'vacancies-container'}>
              <div className={'screen-heading'}>{`${vacancies}  ${vacancies > 1 ? 'Vacancies' : 'Vacancy'}`}</div>
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
      </div >

      {
        /**
         * close js modal
         */
      }
      <Alert
        loading={scheduleActionLoader.loader}
        title={'Close JD'}
        subTitle={'Are you sure, want to close this JD?'}
        isOpen={closeJdModal.visible}
        onClose={closeJdModal.hide}
        primaryOnClick={proceedCloseJdApiHandler}
        secondaryOnClick={closeJdModal.hide}
      />

      <Modal
        loading={scheduleActionLoader.loader}
        title={'Modify Deadline'}
        isOpen={modifyDeadlineModal.visible}
        onClose={modifyDeadlineModal.hide}
        buttonText={'Submit'}
        onClick={proceedModifyDeadlineApiHandler}
      >
        <div className={'row'}>
          <div className={'col-sm-6'}>
            <DateTimePicker
              noSpace
              disableFuture={true}
              heading={'Deadline Date'}
              placeholder={'Deadline Date'}
              value={displayFormatDate(displayDeadlineDate)?.split(",")[0]}
              onChange={(e)=> {
                setScheduleEndDate(e)
                setDisplayDeadlineDate(e);
              }}
            />
          </div>
          <div className="col-sm-6">
            <DateTimePicker
              noSpace
              type={'time'}
              dateFormat={'HH:mm:ss'}
              heading={'Deadline Time'}
              placeholder={'Deadline Time'}
              value={scheduleEndTime}
              onChange={setScheduleEndTime}
            />
          </div>
        </div>
      </Modal>

    </>
  );
}

export { VariantInfo };
