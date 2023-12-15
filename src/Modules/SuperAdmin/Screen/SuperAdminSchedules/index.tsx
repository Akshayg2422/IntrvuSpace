/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Checkbox,
  Input,
  InputHeading,
  Modal,
  NoDataFound,
  PageNation,
  Radio,
  Spinner,
  TextArea,
  showToast,
  DropDown,
  Duration
} from "@Components";


import { useInput, useLoader, useModal, useNavigation, useDropDown } from "@Hooks";

import {
  PreparingYourInterview,
  SuperAdminNavbarWrapper,
  SuperAdminScheduleItem
} from "@Modules";

import {
  canStartInterview,
  createNewJdSchedule,
  createSchedulesSuperAdmin,
  deleteInterview,
  deleteJd,
  getJdItemList,
  postJdVariant,
  resetInterview,
  selectedScheduleId,
  showCreateForOthersJdModal,
  showCreateJddModal,
  updateJdItem
} from "@Redux";

import { ROUTES } from "@Routes";

import {
  CREATE_FOR_ADD_ANOTHER_RULES,
  CREATE_FOR_OTHERS_RULES,
  FROM_JD_RULES,
  getValidateError,
  ifObjectExist,
  paginationHandler,
  validate,
  EXPERIENCE_LIST,
  INTERVIEW_DURATIONS,
  CREATE_FOR_OTHERS_SUPER_ADMIN_RULES
} from "@Utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';

const interviewDurations = [
  { id: "0", text: "Quick", subText: "(5 mins)", value: 5, noSpace: false },
  { id: "1", text: "Short", subText: "(10 mins)", value: 10, noSpace: false },
  { id: "2", text: "Medium", subText: "(15 mins)", value: 15, noSpace: false },
  { id: "3", text: "Long", subText: "(30 mins)", value: 30, noSpace: true },
];

const PLACE_HOLDER = {
  sector: "Software, Banking...",
  role: "Developer, Manager...",
  portal: "Naukri, LinkedIn...",
  jd: `Copy a Job Description from the Job portal(Naukri, LinkedIn...\n\n1.Visit the job portal of choice (e.g., Naukri.com) in your web browser.\n2.Search using keywords for a job listing that interests you.\n3.Click the job title to view the full description.\n4.Highlight, copy, and paste the text into your preferred application seamlessly.`,
};

function SuperAdminSchedules() {


  const loader = useLoader(false);

  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const INTERVAL_TIME = 5000;
  const CHAR_LENGTH = 5000;

  const ERROR_MESSAGE =
    "In beta version, you can upload only max of " +
    CHAR_LENGTH +
    " characters.";

  const { jdItem, jdItemNumOfPages, jdItemCurrentPages } = useSelector(
    (state: any) => state.DashboardReducer
  );


  const createInterviewModal = useModal(false);
  const createInterviewForOthers = useModal(false);



  /**
   * create interview
   */

  const { goTo } = useNavigation();
  const position = useInput("");
  const experience = useDropDown(EXPERIENCE_LIST[0]);
  const jd = useInput("");
  const sector = useInput("");
  const [duration, setDuration] = useState<any>(INTERVIEW_DURATIONS[0]);


  const generateJdModal = useModal(false);
  const completedModal = useModal(false);

  const [scheduleId, setScheduleId] = useState(undefined);
  const jdScheduleModal = useModal(false);

  const [notifyInterview, setNotifyInterview] = useState(false);
  const [notifyReport, setNotifyReport] = useState(false);
  const [jdDescriptionError, setJdDescriptionError] = useState<any>(undefined);


  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput(undefined);
  const mobileNumber = useInput("");
  const sectorForOthers = useInput("");
  const experienceForOthers = useDropDown(EXPERIENCE_LIST[0]);
  const positionForOthers = useInput("");
  const jdForOthers = useInput("");
  const noteForOthers = useInput("");

  const [selectedDurationForOthers, setSelectedDurationForOthers] = useState<any>(INTERVIEW_DURATIONS[0])
  const startInterviewLoader = useLoader(false);


  /**
   * Add another start
   */

  const addAnotherFirstName = useInput("");
  const addAnotherLastName = useInput("");
  const addAnotherEmail = useInput('');
  const addAnotherMobileNumber = useInput("");
  const addAnotherNote = useInput("");

  const [addAnotherNotifyInterview, setAddAnotherNotifyInterview] =
    useState(false);
  const [addAnotherNotifyReport, setAddAnotherNotifyReport] = useState(false);

  const addAnotherModal = useModal(false);
  const [selectedInterviewJd, setSelectedInterviewJd] = useState(undefined);
  const [notifyError, setNotifyError] = useState(false);




  useEffect(() => {
    getKnowledgeGroupFromJdHandler(jdItemCurrentPages);

    return () => {
      stopInterval();
    };
  }, []);

  const dispatch = useDispatch();

  const getKnowledgeGroupFromJdHandler = (page_number: any) => {


    const params = {
      from_jd: true,
      page_number
    };

    loader.show();

    dispatch(
      getJdItemList({
        params,
        onSuccess: () => () => {
          loader.hide();
        },
        onError: () => () => {
          loader.hide();
        },
      })
    );
  };

  function submitJdApiHandler() {
    const params = {
      sector_name: sector.value,
      position: position.value,
      interview_duration: duration?.value,
      experience: parseInt(experience.value?.id),
      jd: jd.value,
    };

    const validation = validate(FROM_JD_RULES, params);

    if (ifObjectExist(validation)) {
      createInterviewModal.hide();
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
                      getKnowledgeGroupFromJdHandler(jdItemCurrentPages);
                      resetValues();
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
    experience.set(EXPERIENCE_LIST[0]);
    jd.set("");
    sector.set("");
    setDuration(INTERVIEW_DURATIONS[0])
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
console.log(params,"pppppp")
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
                        getKnowledgeGroupFromJdHandler(jdItemCurrentPages);
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
      experience: parseInt(experienceForOthers.value?.id),
      interview_duration: selectedDurationForOthers.value,
      jd: jdForOthers.value,
      note: noteForOthers.value,
    };

    const validation = validate(firstName?.value?CREATE_FOR_OTHERS_SUPER_ADMIN_RULES:CREATE_FOR_OTHERS_RULES, params);

    if (ifObjectExist(validation)) {
      generateJdModal.show();
      createInterviewForOthers.hide();

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
                      getKnowledgeGroupFromJdHandler(jdItemCurrentPages);

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
    experienceForOthers.set(EXPERIENCE_LIST[0]);
    jdForOthers.set("");
    setNotifyInterview(false);
    setNotifyReport(false);
    setNotifyError(false);
    setSelectedDurationForOthers(INTERVIEW_DURATIONS[0])
    noteForOthers.set("")
  }

  function viewMoreDetailsHandler(status: boolean, index: number) {
    const updateData = [...jdItem]
    updateData[index] = { ...updateData[index], is_view_more: status }
    dispatch(updateJdItem(updateData))
  }

  function proceedMenuClickHandler(key: any, id: any) {
    if (key === 'VI') {
      proceedResponse(id);
    } else if (key === 'RI') {
      resetInterviewApiHandler(id);
    } else if (key === 'DI') {
      deleteInterviewApiHandler(id);
    } else if (key === 'DE') {
      deleteJdApiHandler(id);
    }
  }

  function resetInterviewApiHandler(sid: string) {
    const params = { sid };

    dispatch(
      resetInterview({
        params,
        onSuccess: () => () => {
          getKnowledgeGroupFromJdHandler(jdItemCurrentPages);
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
          getKnowledgeGroupFromJdHandler(jdItemCurrentPages);
        },
        onError: () => () => { },
      })
    );
  }

  function deleteJdApiHandler(kvid: string) {
    const params = { kvid };

    dispatch(
      deleteJd({
        params,
        onSuccess: () => () => {
          getKnowledgeGroupFromJdHandler(jdItemCurrentPages);
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
      goTo(ROUTES['super-admin']["interview-info"] + "/" + id);
    }
  }

  const stopInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  window.addEventListener("popstate", function (event) {
    stopInterval();
  });



  const proceedCreateInterview = () => {
    createInterviewModal.show();
  };
  const proceedCreateInterviewForOthers = () => {
    createInterviewForOthers.show();
  };



  const NAV_LIST = [
    { id: 0, text: 'Create for Others', callback: proceedCreateInterviewForOthers },
    { id: 1, text: 'Create Interview', callback: proceedCreateInterview },
  ];


  return (
    <>
      <div>
        <SuperAdminNavbarWrapper actions={NAV_LIST} />

        {
          loader.loader &&
          <div className={"loader-container"}>
            <Spinner />
          </div>
        }

        {
          jdItem && jdItem?.length > 0 && (
            <div className={"screen-container"}>
              {
                jdItem && jdItem.length > 0 &&
                jdItem.map((item: any, index: any) => {
                  return (
                    <div
                      className={`super-admin-schedule-container${index === 0 ? "-top" : ""}`}
                    >
                      <SuperAdminScheduleItem
                        item={item}
                        onViewMore={(status) => {
                          viewMoreDetailsHandler(status, index)
                        }}
                        onTryAnother={() => {
                          addAnotherModal.show();
                          setSelectedInterviewJd(item?.id);
                        }}
                        proceedInterviewClick={proceedInterviewHandler}
                        reportOnClick={proceedReport}
                        otherMenuHandler={proceedMenuClickHandler}
                      />
                    </div>
                  )
                })}

              <div className="mt-3">
                <PageNation
                  currentPage={jdItemCurrentPages}
                  noOfPage={jdItemNumOfPages}
                  isPagination={jdItemNumOfPages > 1}
                  paginationNumberClick={(currentPage) => {
                    getKnowledgeGroupFromJdHandler(
                      paginationHandler("current", currentPage)
                    );
                  }}
                  previousClick={() => {
                    getKnowledgeGroupFromJdHandler(
                      paginationHandler("prev", jdItemCurrentPages)
                    );
                  }}
                  nextClick={() => {
                    getKnowledgeGroupFromJdHandler(
                      paginationHandler("next", jdItemCurrentPages)
                    );
                  }}
                />
              </div>
            </div>
          )
        }


        {
          !loader.loader && jdItem?.length <= 0 &&
          <div className={"d-flex align-items-center justify-content-center"}>
            <NoDataFound text={"No Data Found"} />
          </div>
        }

      </div >

      <Modal
        title={"Create Interview"}
        isOpen={createInterviewModal.visible}
        onClose={()=>{createInterviewModal.hide()
          resetValues()
        }}
        onClick={submitJdApiHandler}
      >
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              heading={"Position"}
              placeHolder={PLACE_HOLDER.role}
              value={position.value}
              onChange={position.onChange}
            />
          </div>


          <div className={"col-sm-6"}>
            <DropDown
              id={"experience"}
              heading={"Experience"}
              data={EXPERIENCE_LIST}
              selected={experience.value}
              onChange={experience.onChange}
            />
          </div>

        </div>

        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              noSpace
              heading={"Sector"}
              placeHolder={PLACE_HOLDER.sector}
              value={sector.value}
              onChange={sector.onChange}
            />
          </div>
        </div>

        <Duration selected={duration} onSelected={setDuration} />

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
      </Modal>

      <Modal
        title={'Preparing your Interview...'}
        subTitle={'It will take a couple of minutes. You can wait and join using the link that will be sent to your email once the interview is ready.'}
        isOpen={generateJdModal.visible} onClose={generateJdModal.hide}>
        <PreparingYourInterview />
      </Modal>

      <Modal
        isOpen={completedModal.visible}
        onClose={completedModal.hide}
      >
        <div className="text-center m-0 p-0">
          <div className="display-1 text-black m-0 p-0">
            Your Interview is Ready!
          </div>
        </div>
        <div className="text-center mt-3">
          <small className="text-black text-sm">
            Click below to start Interview
          </small>
          <div className="row justify-content-center pt-1">
            <div className="btn-wrapper">
              <Button
                loading={startInterviewLoader.loader}
                block
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

      <Modal
        isOpen={jdScheduleModal.visible}
        onClose={jdScheduleModal.hide}
        buttonText={'Close'}
        onClick={jdScheduleModal.hide}
      >
        <div className="text-center">
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
      </Modal>

      <Modal
        title={"Create Interview for Others"}
        isOpen={createInterviewForOthers.visible}
        onClose={()=>{createInterviewForOthers.hide()

          createForOthersResetValues()
        }}
        
        onClick={createForOthersApiHandler}
      >
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              heading={"First Name"}
              placeHolder={" First Name"}
              value={firstName.value}
              onChange={firstName.onChange}
            />
          </div>
          <div className={"col-sm-6"}>
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
              placeHolder={"Email"}
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
              heading={"Position"}
              placeHolder={"React, Java,.."}
              value={positionForOthers.value}
              onChange={positionForOthers.onChange}
            />
          </div>
          <div className={"col-sm-6"}>
            <Input
              heading={"Sector"}
              placeHolder={"Sector"}
              value={sectorForOthers.value}
              onChange={sectorForOthers.onChange}
            />
          </div>

        </div>

        <div className={"row"}>
          <div className={"col-sm-6"}>
            <DropDown
              noSpace
              id={"experience"}
              heading={"Experience"}
              data={EXPERIENCE_LIST}
              selected={experienceForOthers.value}
              onChange={experienceForOthers.onChange}
            />
          </div>

        </div>
        <Duration selected={selectedDurationForOthers} onSelected={setSelectedDurationForOthers} />

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
      </Modal>

      <Modal
        title={"Create Interview for Others"}
        isOpen={addAnotherModal.visible}
        onClose={()=>{
          addAnotherModal.hide()
          resetAddAnotherValues()
        }}
        buttonText={'Submit'}
        onClick={createNewJdScheduleApiHandler}
      >
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              heading={"First Name"}
              placeHolder={" First Name"}
              value={addAnotherFirstName.value}
              onChange={addAnotherFirstName.onChange}
            />
          </div>
          <div className={"col-sm-6"}>
            <Input
              heading={"Last Name"}
              placeHolder={"Last Name"}
              value={addAnotherLastName.value}
              onChange={addAnotherLastName.onChange}
            />
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              heading={"Email"}
              placeHolder={"Email"}
              value={addAnotherEmail.value}
              onChange={(e: any) => {
                const value = e.target.value;
                if (value === "") {
                  setAddAnotherNotifyInterview(false);
                  setAddAnotherNotifyReport(false);
                }
                addAnotherEmail.onChange(e);
              }}
            />
          </div>
          <div className={"col-sm-6"}>
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
          height={"150px"}
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
        {notifyError ?
          (
            <small className="text-red mt-2">
              Please fill above email field to enable notification
            </small>
          ) : null
        }
      </Modal>
    </>
  );
}

export { SuperAdminSchedules };
