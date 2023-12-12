import {
  Alert,
  CommonTable,
  DateTimePicker,
  FileViewer,
  Input,
  MenuBar,
  Modal,
  ScreenHeading,
  Spinner,
  ViewMore,
  showToast
} from "@Components";
import { useInput, useLoader, useModal } from "@Hooks";
import { OpeningCandidates } from "@Modules";
import {
  getCorporateScheduleDetails,
  getJdSection,
  postCorporateScheduleActions
} from "@Redux";
import {
  CREATE_CORPORATE_VACANCIES_RULES,
  capitalizeFirstLetter,
  displayFormatDate,
  getDisplayTime,
  getValidateError,
  ifObjectExist,
  validate,
} from "@Utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";



function OpeningDetails() {
  const dispatch = useDispatch();

  /**
   * screen constants
   */

  const MODIFY_OPTION = [
    { id: 1, name: "Close JD" },
    { id: 2, name: "Modify Deadlines" },
    { id: 3, name: 'Modify Vacancies' },
    { id: 4, name: 'View Section' }


  ];

  const { selectedRole, corporateScheduleDetails, refreshCorporateSchedules } =
    useSelector((state: any) => state.DashboardReducer);


  const { jdSection } = useSelector((state: any) => state.AdminReducer);


  const { id } = selectedRole || {};

  const {
    job_description,
    department,
    interview_duration,
    candidate_deadline,
    created_by,
    created_at,
    vacancies,
    is_closed,
    knowledge_group_variant_id
  } = corporateScheduleDetails || {};
  const { position, experience, details } = job_description || {};
  // const { name,description} = jdSection||{}



  const loader = useLoader(false);
  const vacanciesCount = useInput(vacancies)

  // console.log(corporateScheduleDetails, "corporateScheduleDetails======///")

  /**
   * view more details
   */
  const [viewMore, setViewMore] = useState(false);

  /**
   * close modal state
   */

  const closeJdModal = useModal(false);

  const scheduleActionLoader = useLoader(false);

  /**
   * modify deadline
   */

  const modifyDeadlineModal = useModal(false);
  const modifyVacancyModal = useModal(false)

  const modifyvViewsectionModal = useModal(false)
  const [scheduleEndDate, setScheduleEndDate] = useState<any>("");
  const [scheduleEndTime, setScheduleEndTime] = useState<any>("");

  useEffect(() => {
    getCorporateScheduleDetailsHandler();
  }, [refreshCorporateSchedules]);


  const getCorporateScheduleDetailsHandler = () => {
    const params = {
      corporate_openings_details_id: id,
    };


    loader.show();

    dispatch(
      getCorporateScheduleDetails({
        params,
        onSuccess: (response: any) => () => {
          loader.hide();
        },
        onError: (error: any) => () => {
          loader.hide();
        },
      })
    );
  };

  const getJdSectionHandler = () => {
    const params = {
      knowledge_group_variant_id: knowledge_group_variant_id

    };
    loader.show();
    dispatch(
      getJdSection({
        params,
        onSuccess: (response: any) => () => {
          console.log(JSON.stringify(response), 'response')
          loader.hide();
        },
        onError: (error: any) => () => {
          loader.hide();
        },
      })
    );
  };

  const normalizedTableData = (jdSection: any) => {
    return jdSection?.map((el: any) => {
      const { id, name, description, weightage } = el

      return {
        name: capitalizeFirstLetter(name),
        description: capitalizeFirstLetter(description),
        Weightage: weightage
      };
    })

  };


  function onScheduleMenuHandler(action: any) {
    if (action.id === MODIFY_OPTION[0].id) {
      closeJdModal.show();
    } else if (action.id === MODIFY_OPTION[1].id) {
      modifyDeadlineHandler();
    }
    else if (action.id === MODIFY_OPTION[2].id) {
      vacanciesCount.set(vacancies)
      modifyVacancyModal.show()
    }
    else if (action.id === MODIFY_OPTION[3].id) {
      getJdSectionHandler();
      modifyvViewsectionModal.show()

    }

  }

  function proceedCloseJdApiHandler() {
    const params = { is_closed: true };
    corporateScheduleActionsHandler(params);
  }

  const corporateScheduleActionsHandler = (updatedParams: any) => {
    const params = {
      corporate_openings_details_id: corporateScheduleDetails?.id,
      ...updatedParams,
    };

    scheduleActionLoader.show();

    dispatch(
      postCorporateScheduleActions({
        params,
        onSuccess: (response: any) => () => {
          const { message } = response
          scheduleActionLoader.hide();
          modifyDeadlineModal.hide();
          closeJdModal.hide();
          modifyVacancyModal.hide()
          getCorporateScheduleDetailsHandler();
          showToast(message, "success");
        },
        onError: (error: any) => () => {
          const { error_message } = error
          scheduleActionLoader.hide();
          showToast(error_message, "error");
        },
      })
    );
  };

  const modifyDeadlineHandler = () => {
    const displayTime = moment(
      getDisplayTime(candidate_deadline),
      "HH:mm:ss"
    ).format("hh:mm A");
    setScheduleEndDate(displayFormatDate(candidate_deadline, "date"));
    setScheduleEndTime(displayTime);
    modifyDeadlineModal.show();
  };




  const modifyVacancyHandler = () => {
    const params = {
      vacancies: vacanciesCount?.value > 0 ? vacanciesCount?.value : '',
    };
    const validation = validate(CREATE_CORPORATE_VACANCIES_RULES, params);

    if (ifObjectExist(validation)) {
      corporateScheduleActionsHandler(params);
    }
    else {
      showToast(getValidateError(validation));
    }
  }


  function proceedModifyDeadlineApiHandler() {
    const convertedTime = moment(scheduleEndTime, "hh:mm A").format("HH:mm:ss");
    const formattedDate = moment(scheduleEndDate, "MMM DD YYYY").format(
      "YYYY-MM-DD"
    );

    const date = moment(formattedDate + "T" + convertedTime).format(
      "YYYY-MM-DDTHH:mm:ss"
    );

    const params = { deadline: date };

    corporateScheduleActionsHandler(params);
  }


  return (
    <>
      <div className={"screen-padding"}>
  
        {
          loader.loader &&
          <div className={'loader-container'}>
            <Spinner />
          </div>
        }

        {
          corporateScheduleDetails &&
          <div>
            <ScreenHeading
              text={capitalizeFirstLetter(position)}
              subtitle={capitalizeFirstLetter(experience)}
            >
              <div className={"vacancies-container d-flex justify-content-end"}>
                <div className={"screen-heading"}>{`${vacancies}  ${vacancies > 1 ? "Vacancies" : "Vacancy"
                  }`}</div>
                {!is_closed && (
                  <div className={"menu-container"}>
                    <MenuBar
                      menuData={MODIFY_OPTION}
                      onClick={onScheduleMenuHandler}
                    />
                  </div>
                )}
              </div>
            </ScreenHeading>

            <OpeningCandidates id={id} details={corporateScheduleDetails} />

            <div className={"jd-details-container"}>
              <div className={"screen-heading heading-space"}>
                {"Job Details"}
              </div>
              <div>
                {details && (
                  <ViewMore
                    text={details}
                    isViewMore={viewMore}
                    onViewMore={setViewMore}
                  />
                )}
              </div>
            </div>

            <div className={"other-info-container"}>
              <div className={"screen-heading heading-space"}>
                {"Other Information"}
              </div>
              <div className={"card-container"}>
                <div className={"other-info-details-container"}>
                  <div className={"info-container "}>
                    <div className={"info-title"}>{"Department"}</div>
                    <div className={"info-content"}>{department}</div>
                  </div>
                  <div className={"info-container "}>
                    <div className={"info-title"}>{"Interview Duration"}</div>
                    <div className={"info-content"}>
                      {interview_duration + " Mins"}
                    </div>
                  </div>
                  <div className={"info-container"}>
                    <div className={"info-title"}>{"Candidate Deadline"}</div>
                    <div className={"info-content"}>
                      {displayFormatDate(candidate_deadline)}
                    </div>
                  </div>
                </div>
                <div className={"other-info-details-container"}>
                  <div className={"info-container "}>
                    <div className={"info-title"}>{"Created By"}</div>
                    <div className={"info-content"}>{created_by}</div>
                  </div>
                  <div className={"info-container"}>
                    <div className={"info-title"}>{"Created At"}</div>
                    <div className={"info-content"}>
                      {displayFormatDate(created_at)}
                    </div>
                  </div>
                  <div className={"info-container"}></div>
                </div>
              </div>
            </div>
          </div>
        }
      </div >

      {/**
       * close js modal
       */}
      < Alert
        loading={scheduleActionLoader.loader}
        title={"Close JD"}
        subTitle={"Are you sure, want to close this JD?"}
        isOpen={closeJdModal.visible}
        onClose={closeJdModal.hide}
        primaryOnClick={proceedCloseJdApiHandler}
        secondaryOnClick={closeJdModal.hide}
      />

      <Modal
        loading={scheduleActionLoader.loader}
        title={"Modify Deadline"}
        isOpen={modifyDeadlineModal.visible}
        onClose={modifyDeadlineModal.hide}
        buttonText={"Submit"}
        onClick={proceedModifyDeadlineApiHandler}
      >
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <DateTimePicker
              noSpace
              disableFuture={true}
              heading={"Deadline Date"}
              placeholder={"Deadline Date"}
              value={scheduleEndDate}
              onChange={setScheduleEndDate}
            />
          </div>
          <div className="col-sm-6">
            <DateTimePicker
              noSpace
              type={"time"}
              dateFormat={"HH:mm:ss"}
              heading={"Deadline Time"}
              placeholder={"Deadline Time"}
              value={scheduleEndTime}
              onChange={setScheduleEndTime}
            />
          </div>
        </div>
      </Modal>


      <Modal
        loading={scheduleActionLoader.loader}
        title={"Modify Vacancies"}
        isOpen={modifyVacancyModal.visible}
        onClose={modifyVacancyModal.hide}
        buttonText={"Submit"}
        onClick={modifyVacancyHandler}
      >
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              heading={"Vacancies"}
              type={"number"}
              placeHolder={"0"}
              value={vacanciesCount.value}
              onChange={vacanciesCount.onChange}
              maxLength={4}
            />
          </div>
        </div>

      </Modal>

      <Modal
        loading={scheduleActionLoader.loader}
        title={"Sections"}
        isOpen={modifyvViewsectionModal.visible}
        onClose={modifyvViewsectionModal.hide}
      >
          {
          loader.loader ?
          <div className={'loader-container'}>
            <Spinner />
          </div>
          :
          <CommonTable
          displayDataSet={normalizedTableData(jdSection)}
          tableDataSet={jdSection}
        />
        }
       


      </Modal>

    </>
  );
}

export { OpeningDetails };
