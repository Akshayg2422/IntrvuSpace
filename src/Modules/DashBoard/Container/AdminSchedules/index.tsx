/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */

import { icons } from "@Assets";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Image,
  Input,
  InputHeading,
  MenuBar,
  Modal,
  Radio,
  Spinner,
  TextArea,
  showToast,
} from "@Components";
import { useInput, useLoader, useModal, useNavigation } from "@Hooks";
import {
  GenerateModal,
  UploadJdCard,
  Clipboard,
  PreparingYourInterview,
} from "@Modules";
import {
  canStartInterview,
  createNewJdSchedule,
  createSchedulesSuperAdmin,
  deleteInterview,
  getJdItemList,
  hideCreateForOthersJdModal,
  hideCreateJdModal,
  postJdVariant,
  resetInterview,
  selectedScheduleId,
  showCreateForOthersJdModal,
  showCreateJddModal,
  deleteJd,
} from "@Redux";
import { ROUTES } from "@Routes";
import {
  CREATE_FOR_OTHERS_RULES,
  FROM_JD_RULES,
  getValidateError,
  ifObjectExist,
  validate,
  CREATE_FOR_ADD_ANOTHER_RULES,
} from "@Utils";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const interviewDurations = [
  { id: "0", text: "Quick", subText: "(5 mins)", value: 5 },
  { id: "1", text: "Short", subText: "(10 mins)", value: 10 },
  { id: "2", text: "Medium", subText: "(15 mins)", value: 15 },
  { id: "3", text: "Long", subText: "(30 mins)", value: 30 },
];

const PLACE_HOLDER = {
  sector: "Software, Banking...",
  role: "Developer, Manager...",
  portal: "Naukri, LinkedIn...",
  jd: `Copy a Job Description from the Job portal(Naukri, LinkedIn...\n\n1.Visit the job portal of choice (e.g., Naukri.com) in your web browser.\n2.Search using keywords for a job listing that interests you.\n3.Click the job title to view the full description.\n4.Highlight, copy, and paste the text into your preferred application seamlessly.`,
};

function AdminSchedules() {
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const INTERVAL_TIME = 5000;
  const CHAR_LENGTH = 5000;
  const VIEW_MORE_LENGTH = 300;

  const SCHEDULE_MENU = [
    { id: 1, name: "View Interview Info" },
    { id: 2, name: "Reset Interview" },
    { id: 3, name: "Delete Interview" },
  ];
  const JD_MENU = [{ id: 0, name: "Delete" }];

  const ERROR_MESSAGE =
    "In beta version, you can upload only max of " +
    CHAR_LENGTH +
    " characters.";
  const { createJdModal, jdItem, createForOthersJdModal } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { goTo } = useNavigation();
  const position = useInput("");
  const experience = useInput("");
  const jd = useInput("");
  const sector = useInput("");
  const generateJdModal = useModal(false);
  const completedModal = useModal(false);
  const [scheduleId, setScheduleId] = useState(undefined);
  const jdScheduleModal = useModal(false);
  const [loading, setLoading] = useState(true);
  const [jdMore, setJdMore] = useState<any>([]);
  const [fresherChecked, setFresherChecked] = useState(false);
  const [notifyInterview, setNotifyInterview] = useState(false);
  const [notifyReport, setNotifyReport] = useState(false);
  const [jdDescriptionError, setJdDescriptionError] = useState<any>(undefined);
  const [selectedDuration, setSelectedDuration] = useState(
    interviewDurations[0]
  );
  const [selectedDurationForOthers, setSelectedDurationForOthers] = useState(
    interviewDurations[0]
  );
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput(undefined);
  const mobileNumber = useInput("");
  const sectorForOthers = useInput("");
  const experienceForOthers = useInput("");
  const positionForOthers = useInput("");
  const jdForOthers = useInput("");
  const noteForOthers = useInput("");

  const startInterviewLoader = useLoader(false);
  const createInterviewSuperAdminLoader = useLoader(false);

  /**
   * Add another start
   */

  const addAnotherFirstName = useInput("");
  const addAnotherLastName = useInput("");
  const addAnotherEmail = useInput(undefined);
  const addAnotherMobileNumber = useInput("");
  const addAnotherNote = useInput("");

  const [addAnotherNotifyInterview, setAddAnotherNotifyInterview] =
    useState(false);
  const [addAnotherNotifyReport, setAddAnotherNotifyReport] = useState(false);

  const addAnotherModal = useModal(false);
  const [selectedInterviewJd, setSelectedInterviewJd] = useState(undefined);
  const [notifyError, setNotifyError] = useState(false);

  /**
   * Add another end
   */

  const [copiedInterviewLink, setCopiedInterviewLink] = useState("");

  useEffect(() => {
    getKnowledgeGroupFromJdHandler();

    return () => {
      stopInterval();
    };
  }, []);

  const dispatch = useDispatch();

  const getKnowledgeGroupFromJdHandler = () => {
    const params = { from_jd: true };

    dispatch(
      getJdItemList({
        params,
        onSuccess: () => () => {
          setLoading(false);
        },
        onError: () => () => { },
      })
    );
  };

  function submitJdApiHandler() {
    const params = {
      sector_name: sector.value,
      position: position.value,
      interview_duration: selectedDuration.value,
      experience: fresherChecked ? "0" : experience.value,
      jd: jd.value,
    };

    const validation = validate(FROM_JD_RULES, params);

    if (ifObjectExist(validation)) {
      dispatch(hideCreateJdModal());
      generateJdModal.show();

      dispatch(
        postJdVariant({
          params,
          onSuccess: (res: any) => () => {
            const { details } = res;

            if (details?.schedule_id) {
              const canStartParams = { schedule_id: details?.schedule_id };
              setScheduleId(details?.schedule_id);

              intervalIdRef.current = setInterval(() => {
                dispatch(
                  canStartInterview({
                    params: canStartParams,
                    onSuccess: (res: any) => () => {
                      generateJdModal.hide();
                      completedModal.show();
                      getKnowledgeGroupFromJdHandler();
                      resetValues();
                      // showToast(res.status, 'success');

                      stopInterval();
                    },
                    onError: (error: any) => () => { },
                  })
                );
              }, INTERVAL_TIME);
            }
          },
          onError: (error) => () => {
            generateJdModal.hide();
            // addJdModal.show();
            dispatch(showCreateJddModal());
            showToast(error.error_message, "error");
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  }

  function resetValues() {
    position.set("");
    experience.set("");
    jd.set("");
    sector.set("");
  }

  function resetAddAnotherValues() {
    addAnotherFirstName.set("");
    addAnotherLastName.set("");
    addAnotherEmail.set("");
    addAnotherMobileNumber.set("");
    addAnotherNote.set("");
    setAddAnotherNotifyInterview(false);
    setAddAnotherNotifyReport(false);
    setNotifyError(false);
  }

  function createNewJdScheduleApiHandler() {
    if (selectedInterviewJd) {
      const params = {
        knowledge_group_variant_id: selectedInterviewJd,
        custom_first_name: addAnotherFirstName.value,
        custom_last_name: addAnotherLastName.value,
        custom_email: addAnotherEmail.value,
        custom_mobile_number: addAnotherMobileNumber.value,
        is_notify_interview: addAnotherNotifyInterview,
        is_notify_report: addAnotherNotifyReport,
        note: addAnotherNote.value,
      };

      const validation = validate(CREATE_FOR_ADD_ANOTHER_RULES, params);

      if (ifObjectExist(validation)) {
        addAnotherModal.hide();
        generateJdModal.show();
        dispatch(
          createNewJdSchedule({
            params,
            onSuccess: (res: any) => () => {
              const { details } = res;
              resetAddAnotherValues();

              if (details?.schedule_id) {
                const canStartParams = { schedule_id: details?.schedule_id };
                setScheduleId(details?.schedule_id);
                intervalIdRef.current = setInterval(() => {
                  dispatch(
                    canStartInterview({
                      params: canStartParams,
                      onSuccess: (res: any) => () => {
                        generateJdModal.hide();
                        completedModal.show();
                        getKnowledgeGroupFromJdHandler();
                        showToast(res.status, "success");
                        if (intervalIdRef.current) {
                          clearInterval(intervalIdRef.current);
                        }
                      },
                      onError: (error: any) => () => { },
                    })
                  );
                }, INTERVAL_TIME);
              }
            },
            onError: () => () => {
              generateJdModal.hide();
              addAnotherModal.show();
            },
          })
        );
      } else {
        showToast(getValidateError(validation));
      }
    }
  }

  function createForOthersApiHandler() {
    const params = {
      custom_first_name: firstName.value,
      custom_last_name: lastName.value,
      custom_email: email.value,
      custom_mobile_number: mobileNumber.value,
      sector_name: sectorForOthers.value,
      position: positionForOthers.value,
      is_notify_interview: notifyInterview,
      is_notify_report: notifyReport,
      experience: experienceForOthers.value,
      interview_duration: selectedDurationForOthers.value,
      jd: jdForOthers.value,
      note: noteForOthers.value,
    };

    const validation = validate(CREATE_FOR_OTHERS_RULES, params);

    if (ifObjectExist(validation)) {
      generateJdModal.show();
      dispatch(hideCreateForOthersJdModal());

      dispatch(
        createSchedulesSuperAdmin({
          params,
          onSuccess: (response: any) => () => {
            const { details } = response;
            if (details?.schedule_id) {
              const canStartParams = { schedule_id: details?.schedule_id };
              setScheduleId(details?.schedule_id);
              intervalIdRef.current = setInterval(() => {
                dispatch(
                  canStartInterview({
                    params: canStartParams,
                    onSuccess: (res: any) => () => {
                      generateJdModal.hide();
                      completedModal.show();
                      createForOthersResetValues();
                      getKnowledgeGroupFromJdHandler();

                      if (intervalIdRef.current) {
                        clearInterval(intervalIdRef.current);
                      }
                    },
                    onError: (error: any) => () => { },
                  })
                );
              }, INTERVAL_TIME);
            }
          },
          onError: (error) => () => {
            generateJdModal.hide();
            showToast(error.error_message, "error");
            dispatch(showCreateForOthersJdModal());
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  }

  function createForOthersResetValues() {
    firstName.set("");
    lastName.set("");
    email.set("");
    mobileNumber.set("");
    sectorForOthers.set("");
    positionForOthers.set("");
    experienceForOthers.set("");
    jdForOthers.set("");
    setNotifyInterview(false);
    setNotifyReport(false);
  }

  function proceedMenuClickHandler(selected: any, id: any) {
    if (selected?.id === SCHEDULE_MENU[0].id) {
      proceedResponse(id);
    } else if (selected?.id === SCHEDULE_MENU[1].id) {
      resetInterviewApiHandler(id);
    } else if (selected?.id === SCHEDULE_MENU[2].id) {
      deleteInterviewApiHandler(id);
    }
  }

  function resetInterviewApiHandler(sid: string) {
    const params = { sid };

    dispatch(
      resetInterview({
        params,
        onSuccess: () => () => {
          getKnowledgeGroupFromJdHandler();
        },
        onError: () => () => { },
      })
    );
  }

  function deleteInterviewApiHandler(sid: string) {
    const params = { sid };

    dispatch(
      deleteInterview({
        params,
        onSuccess: () => () => {
          getKnowledgeGroupFromJdHandler();
        },
        onError: () => () => { },
      })
    );
  }

  function proceedJDMenuClickHandler(selected: any, id: any) {
    if (selected?.id === JD_MENU[0].id) {
      deleteJdApiHandler(id);
    }
  }

  function deleteJdApiHandler(kvid: string) {
    const params = { kvid };

    dispatch(
      deleteJd({
        params,
        onSuccess: () => () => {
          getKnowledgeGroupFromJdHandler();
        },
        onError: () => () => { },
      })
    );
  }

  function proceedInterviewHandler(id: string) {
    if (id) {
      if (id !== "-1") {
        startInterviewLoader.hide();
        dispatch(selectedScheduleId(id));
        goTo(ROUTES["designation-module"].interview + "/" + id);
      } else {
        jdScheduleModal.show();
      }
    }
  }

  function proceedReport(id: string) {
    if (id) {
      goTo(ROUTES["designation-module"].report + "/" + id);
    }
  }

  function proceedResponse(id: string) {
    if (id) {
      goTo(ROUTES["designation-module"].response + "/" + id);
    }
  }

  const stopInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  window.addEventListener("popstate", function (event) {
    // Custom logic to handle the back button
    // You can implement your specific process here
    stopInterval();
  });

  return (
    <>
  
      {loading ? (
        <div className={"d-flex justify-content-center my-9"}>
          <Spinner />
        </div>
      ) : jdItem && jdItem.length > 0 ? (
        <div>
          {
            <div className={"mt-3"}>
              {jdItem &&
                jdItem.length > 0 &&
                jdItem.map((item: any, index: any) => {
                  const {
                    job_description: { details, experience },
                    schedules,
                    name,
                    id,
                    interview_duration,
                  } = item;

                  const more = jdMore[index]?.more;

                  return (
                    <Card className="mt--3 " key={id}>
                      <div className={"d-flex justify-content-between"}>
                        <div>
                          {name ? (
                            <span
                              style={{
                                fontSize: "21px",
                              }}
                              className="mb-0 text-primary font-weight-bolder"
                            >
                              {name.charAt(0).toUpperCase() + name.slice(1)}
                            </span>
                          ) : (
                            <></>
                          )}

                          {interview_duration && (
                            <div className="col">
                              <div className="row d-flex align-items-center mb-1">
                                <Image
                                  src={icons.clock}
                                  height={17}
                                  width={17}
                                  style={{
                                    objectFit: "contain",
                                  }}
                                />
                                <h5
                                  style={{
                                    fontSize: "14px",
                                  }}
                                  className="mb-0 text-primary font-weight-bolder ml-2"
                                >{`${interview_duration} mins`}</h5>
                              </div>
                            </div>
                          )}
                          <h5 className="mb-0 pointer">{experience}</h5>
                        </div>
                        <div className="row">
                          <div>
                            <Button
                              text={"Add Another"}
                              onClick={() => {
                                addAnotherModal.show();
                                setSelectedInterviewJd(id);
                              }}
                            />
                          </div>
                          {/** For large screen */}
                          <div
                            className={
                              "d-none d-lg-block d-md-block d-xl-block"
                            }
                          >
                            <MenuBar
                              menuData={JD_MENU}
                              onClick={(action) =>
                                proceedJDMenuClickHandler(action, id)
                              }
                            />
                          </div>
                        </div>
                        {/** For small screen */}
                        <div className={"d-block d-sm-none pl-3"}>
                          <MenuBar
                            menuData={JD_MENU}
                            onClick={(action) =>
                              proceedJDMenuClickHandler(action, id)
                            }
                          />
                        </div>
                      </div>
                      <div className="col mt-3">
                        <div className="row">
                          <div className="col ml-0">
                            {details.length < VIEW_MORE_LENGTH ? (
                              <div className="row">
                                <div className="text-details text-black">{`${details}`}</div>
                              </div>
                            ) : (
                              <>
                                {more ? (
                                  <div className="row">
                                    <div className="text-details text-black">
                                      {details
                                        .split("\n\n")
                                        .map((paragraph, index) => (
                                          <React.Fragment key={index}>
                                            {index > 0 && <br />}
                                            {paragraph}
                                          </React.Fragment>
                                        ))}
                                      <span
                                        className="h4 text-primary ml-3 pointer"
                                        onClick={() => {
                                          const updatedData: any = [...jdMore];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            more: false,
                                          };
                                          setJdMore(updatedData);
                                        }}
                                      >
                                        View Less
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="row">
                                    <div className="text-details text-black">
                                      {details.slice(0, VIEW_MORE_LENGTH) +
                                        " ..."}
                                      <span
                                        className="h4 text-primary ml-1 pointer"
                                        onClick={() => {
                                          const updatedData: any = [...jdMore];
                                          updatedData[index] = {
                                            ...updatedData[index],
                                            more: true,
                                          };
                                          setJdMore(updatedData);
                                        }}
                                      >
                                        View More
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col mt-3">
                        {schedules && schedules.length > 0 && (
                          <Divider className={"row"} space={"3"} />
                        )}
                        {schedules &&
                          schedules.length > 0 &&
                          schedules.map((each: any, index: number) => {
                            const {
                              is_complete,
                              is_report_complete,
                              id,
                              created_at,
                              custom_interviewee_details,
                              is_started,
                              interview_end_time,
                              note,
                              q,
                              custom_interview_link,
                            } = each;

                            const basic_info =
                              custom_interviewee_details?.basic_info;

                            const basicInfo =
                              basic_info && basic_info.first_name
                                ? basic_info
                                : null;
                            let demoDisplayName: any = undefined;
                            if (basicInfo)
                              demoDisplayName = basicInfo?.first_name;

                            const getDisplayTimeFromMoment = (
                              timestamp: any
                            ) => {
                              const currentTime = new Date().getTime();
                              const createdAt = new Date(timestamp).getTime();
                              const timeDifference = Math.floor(
                                (currentTime - createdAt) / (1000 * 60)
                              );

                              if (timeDifference < 60) {
                                return `${timeDifference} mins ago`;
                              } else if (timeDifference < 1440) {
                                const hours = Math.floor(timeDifference / 60);
                                return `${hours} ${hours === 1 ? "hour" : "hours"
                                  } ago`;
                              } else {
                                const days = Math.floor(timeDifference / 1440);
                                return `${days} ${days === 1 ? "day" : "days"
                                  } ago`;
                              }
                            };

                            const questions = `(Q -  ${q ? q : 0})`;

                            return (
                              <div>
                                <div className="row align-items-center justify-content-between">
                                  <div className="col m-0 p-0">
                                    <div className="d-flex align-items-center">
                                      <h5 className="m-0 p-0">
                                        {demoDisplayName
                                          ? demoDisplayName
                                            .charAt(0)
                                            .toUpperCase() +
                                          demoDisplayName.slice(1)
                                          : "Interview " + (index + 1)}
                                      </h5>
                                      <h5 className="m-0 p-0 ml-2">
                                        {questions}
                                      </h5>
                                    </div>
                                    {custom_interview_link ? (
                                      <Clipboard
                                        id={id}
                                        copedText={copiedInterviewLink}
                                        linkToCopy={custom_interview_link}
                                        tooltipText={"Copy Interview Link"}
                                        onCopy={setCopiedInterviewLink}
                                      />
                                    ) : null}
                                    {note ? (
                                      <small className="text-muted">
                                        {note}
                                      </small>
                                    ) : null}
                                  </div>
                                  <h5 className="mb-0 text-center d-none d-lg-block d-md-block d-xl-block">
                                    {is_complete
                                      ? `Completed: ${getDisplayTimeFromMoment(
                                        interview_end_time
                                      )}`
                                      : `Created at: ${getDisplayTimeFromMoment(
                                        created_at
                                      )}`}
                                  </h5>
                                  <div className="col m-0 p-0 d-flex justify-content-end">
                                    <div className="row mr-lg-3 mr-sm-0 mr-0">
                                      {is_complete && is_report_complete && (
                                        <div>
                                          <Button
                                            text={"View Report"}
                                            onClick={() => {
                                              proceedReport(id);
                                            }}
                                          />
                                        </div>
                                      )}
                                      {is_complete && !is_report_complete && (
                                        <div>
                                          <span className="name mb-0 text-sm">
                                            Generating Report ...
                                          </span>
                                        </div>
                                      )}

                                      {!is_complete && (
                                        <div>
                                          <Button
                                            loading={
                                              startInterviewLoader.loader
                                            }
                                            className={" border border-primary"}
                                            text={
                                              is_started
                                                ? "Resume Interview"
                                                : "Start Interview"
                                            }
                                            onClick={() => {
                                              proceedInterviewHandler(id);
                                            }}
                                          />
                                        </div>
                                      )}
                                      <div className={""}>
                                        <MenuBar
                                          menuData={SCHEDULE_MENU}
                                          onClick={(action) =>
                                            proceedMenuClickHandler(action, id)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {/** for small screen */}
                                  <h5 className="mb-0 text-center d-block d-sm-none">
                                    {is_complete
                                      ? `Completed: ${getDisplayTimeFromMoment(
                                        interview_end_time
                                      )}`
                                      : `Created at: ${getDisplayTimeFromMoment(
                                        created_at
                                      )}`}
                                  </h5>
                                </div>
                                {index !== schedules.length - 1 && (
                                  <Divider className={"row"} space={"3"} />
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </Card>
                  );
                })}
            </div>
          }
        </div>
      ) : (
        <UploadJdCard />
      )}

      <Modal
        title={"Create Interview"}
        isOpen={createJdModal}
        onClose={() => {
          dispatch(hideCreateJdModal());
        }}
      >
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              isMandatory
              heading={"Sector"}
              placeHolder={PLACE_HOLDER.sector}
              value={sector.value}
              onChange={sector.onChange}
            />
          </div>
          <div className={"col-sm-6"}>
            <Input
              isMandatory
              heading={"Role"}
              placeHolder={PLACE_HOLDER.role}
              value={position.value}
              onChange={position.onChange}
            />
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-sm-6"}>
            {fresherChecked ? (
              <div className="ml-2">
                <Input
                  isMandatory
                  heading={"Years of experience"}
                  type={"text"}
                  placeHolder={"Fresher"}
                  value={"Fresher"}
                  disabled
                />
              </div>
            ) : (
              <div>
                <Input
                  isMandatory
                  heading={"Years of experience"}
                  type={"number"}
                  placeHolder={"Experience"}
                  value={experience.value}
                  onChange={experience.onChange}
                />
              </div>
            )}
            <span className={"position-absolute left-9 pl-5 top-0"}>
              <Checkbox
                id={"fresher"}
                className={"text-primary"}
                text={"Fresher"}
                defaultChecked={fresherChecked}
                onCheckChange={(checked) => {
                  setFresherChecked(checked);
                }}
              />
            </span>
          </div>

          <div className={"col-sm-6 mt-1"}>
            <InputHeading
              Class={"mb-0"}
              heading={"Interview Duration"}
              isMandatory
            />
            <Radio
              selected={selectedDuration}
              selectItem={selectedDuration}
              data={interviewDurations}
              onRadioChange={(selected) => {
                if (selected) {
                  setSelectedDuration(selected);
                }
              }}
            />
          </div>
        </div>

        <TextArea
          isMandatory
          error={jdDescriptionError}
          placeholder={PLACE_HOLDER.jd}
          heading="Job Description"
          value={jd.value.slice(0, CHAR_LENGTH)}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length > CHAR_LENGTH) {
              setJdDescriptionError(ERROR_MESSAGE);
            } else {
              setJdDescriptionError(undefined);
            }
            jd.set(value);
          }}
        />

        <div className="text-center">
          <Button
            block
            size="md"
            text={"Submit"}
            onClick={submitJdApiHandler}
          />
        </div>
      </Modal>

      <Modal isOpen={generateJdModal.visible} onClose={generateJdModal.hide}>
        <PreparingYourInterview />
      </Modal>

      <Modal isOpen={completedModal.visible} onClose={completedModal.hide}>
        <div className="text-center m-0 p-0">
          <div className="display-1 text-black m-0 p-0">
            Your Interview is Ready!
          </div>
        </div>
        <div className="text-center mb-5 mt-3">
          <small className="text-black text-sm">
            Click below to start Interview
          </small>
          <div className="row justify-content-center pt-1">
            <div className="col-4">
              <Button
                loading={startInterviewLoader.loader}
                block
                size="md"
                text={"Start Now"}
                onClick={() => {
                  if (scheduleId) {
                    proceedInterviewHandler(scheduleId);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={jdScheduleModal.visible} onClose={jdScheduleModal.hide}>
        <div className="mt--5 pb-4">
          <div className="text-center ">
            <div className="display-4 text-black">
              {"Interview Preparation is in progress,"}
            </div>
            <div className="display-4 text-black">
              {"it will take couple of minutes,"}
            </div>
            <div className="display-4 text-black">
              {"you will receive schedule confirmation over mail."}
            </div>
          </div>
          <div className="text-center py-3">
            <div className="row justify-content-center pt-1">
              <div className="col-4">
                <Button
                  block
                  size="md"
                  text={"Close"}
                  onClick={() => {
                    jdScheduleModal.hide();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title={"Create Interview for Others"}
        isOpen={createForOthersJdModal}
        onClose={() => {
          dispatch(hideCreateForOthersJdModal());
        }}
      >
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              isMandatory
              heading={"First Name"}
              placeHolder={" First Name"}
              value={firstName.value}
              onChange={firstName.onChange}
            />
          </div>
          <div className={"col-sm-6 mt-2"}>
            <Input
              heading={"Last Name"}
              placeHolder={"Last Name"}
              value={lastName.value}
              onChange={lastName.onChange}
            />
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              heading={"Email"}
              placeHolder={"Email Id"}
              value={email.value}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setNotifyInterview(false);
                  setNotifyReport(false);
                }
                email.onChange(e);
              }}
            />
          </div>
          <div className={"col-sm-6"}>
            <Input
              heading={"Mobile Number"}
              maxLength={10}
              type={"number"}
              placeHolder={"Mobile Number"}
              value={mobileNumber.value}
              onChange={mobileNumber.onChange}
            />
          </div>
        </div>

        <TextArea
          height={"100px"}
          heading={"Note"}
          value={noteForOthers.value}
          onChange={noteForOthers.onChange}
        />

        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              isMandatory
              heading={"Sector"}
              placeHolder={"Sector"}
              value={sectorForOthers.value}
              onChange={sectorForOthers.onChange}
            />
          </div>
          <div className={"col-sm-6"}>
            <Input
              isMandatory
              heading={"Role"}
              placeHolder={"Role"}
              value={positionForOthers.value}
              onChange={positionForOthers.onChange}
            />
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              isMandatory
              type={"number"}
              heading={"Experience"}
              placeHolder={"Experience"}
              value={experienceForOthers.value}
              onChange={experienceForOthers.onChange}
            />
          </div>

          <div className={"col-sm-6 mt-1"}>
            <InputHeading
              Class={"mb-0"}
              heading={"Interview Duration"}
              isMandatory
            />
            <Radio
              selected={selectedDurationForOthers}
              selectItem={selectedDurationForOthers}
              data={interviewDurations}
              onRadioChange={(selected) => {
                if (selected) {
                  setSelectedDurationForOthers(selected);
                }
              }}
            />
          </div>
        </div>

        <TextArea
          isMandatory
          error={jdDescriptionError}
          placeholder={PLACE_HOLDER.jd}
          heading="JD Details"
          value={jdForOthers.value.slice(0, CHAR_LENGTH)}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length > CHAR_LENGTH) {
              setJdDescriptionError(ERROR_MESSAGE);
            } else {
              setJdDescriptionError(undefined);
            }
            jdForOthers.set(value);
          }}
        />

        <div className={"d-flex"}>
          <Checkbox
            className={"text-primary flex-row"}
            text={"Notify interview"}
            id={"notifyInterview"}
            defaultChecked={notifyInterview}
            onCheckChange={(checked) => {
              if (email.value) {
                setNotifyInterview(checked);
                setNotifyError(false);
              } else {
                setNotifyInterview(false);
                setNotifyError(true);
              }
            }}
          />
          <div className="ml-4"></div>
          <Checkbox
            className={"text-primary"}
            text={"Notify Report"}
            id={"notifyReport"}
            defaultChecked={notifyReport}
            onCheckChange={(checked) => {
              if (email.value) {
                setNotifyReport(checked);
                setNotifyError(false);
              } else {
                setNotifyReport(false);
                setNotifyError(true);
              }
            }}
          />
        </div>
        {notifyError ? (
          <small className="text-red mt-2">
            Please fill above email field to enable notification.
          </small>
        ) : null}
        <div className="mt-5">
          <Button
            block
            size="md"
            text={"Submit"}
            onClick={createForOthersApiHandler}
          />
        </div>
      </Modal>

      {/**
       * Add another form
       */}
      <Modal
        title={"Create Interview for Others"}
        isOpen={addAnotherModal.visible}
        onClose={addAnotherModal.hide}
      >
        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              isMandatory
              heading={"First Name"}
              placeHolder={" First Name"}
              value={addAnotherFirstName.value}
              onChange={addAnotherFirstName.onChange}
            />
          </div>
          <div className={"col-6 mt-2"}>
            <Input
              heading={"Last Name"}
              placeHolder={"Last Name"}
              value={addAnotherLastName.value}
              onChange={addAnotherLastName.onChange}
            />
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              heading={"Email"}
              placeHolder={"Email Id"}
              value={addAnotherEmail.value}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setAddAnotherNotifyInterview(false);
                  setAddAnotherNotifyReport(false);
                }
                addAnotherEmail.onChange(e);
              }}
            />
          </div>
          <div className={"col-6"}>
            <Input
              heading={"Mobile Number"}
              maxLength={10}
              type={"number"}
              placeHolder={"Mobile Number"}
              value={addAnotherMobileNumber.value}
              onChange={addAnotherMobileNumber.onChange}
            />
          </div>
        </div>

        <TextArea
          height={"100px"}
          heading={"Note"}
          value={addAnotherNote.value}
          onChange={addAnotherNote.onChange}
        />

        <div className={"d-flex m-0 p-0"}>
          <Checkbox
            className={"text-primary flex-row"}
            text={"Notify interview"}
            id={"addAnotherNotifyInterview"}
            defaultChecked={addAnotherNotifyInterview}
            onCheckChange={(checked) => {
              if (addAnotherEmail.value) {
                setAddAnotherNotifyInterview(checked);
                setNotifyError(false);
              } else {
                setAddAnotherNotifyInterview(false);
                setNotifyError(true);
              }
            }}
          />
          <div className="ml-3"></div>
          <Checkbox
            className={"text-primary"}
            text={"Notify Report"}
            id={"addAnotherNotifyReport"}
            defaultChecked={addAnotherNotifyReport}
            onCheckChange={(checked) => {
              if (addAnotherEmail.value) {
                setAddAnotherNotifyReport(checked);
                setNotifyError(false);
              } else {
                setAddAnotherNotifyReport(false);
                setNotifyError(true);
              }
            }}
          />
        </div>
        {notifyError ? (
          <small className="text-red mt-2">
            Please fill above email field to enable notification
          </small>
        ) : null}

        <div className="mt-5">
          <Button
            block
            size="md"
            text={"Submit"}
            onClick={createNewJdScheduleApiHandler}
          />
        </div>
      </Modal>
    </>
  );
}

export { AdminSchedules };
