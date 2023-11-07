/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import { icons } from "@Assets";
import {
  Button,
  Card,
  Divider,
  DropDown,
  Input,
  InputHeading,
  Modal,
  Spinner,
  TextArea,
  showToast
} from "@Components";
import {
  useDropDown,
  useInput,
  useLoader,
  useModal,
  useNavigation,
} from "@Hooks";
import { PreparingYourInterview, UploadJdCard, JdItem } from "@Modules";
import {
  canStartInterview,
  createNewJdSchedule,
  getJdItemList,
  hideCreateJdModal,
  postJdVariant,
  selectedScheduleId,
  showCreateJddModal,
  updateJdItem
} from "@Redux";
import { ROUTES } from "@Routes";
import {
  EXPERIENCE_LIST,
  FROM_JD_RULES,
  INTERVIEW_DURATIONS,
  formatDateTime,
  getValidateError,
  ifObjectExist,
  validate,
} from "@Utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

const interviewDurations: any = [
  { id: 1, text: "Quick", subText: "5 mins", value: 5, isActive: false },
  { id: 3, text: "Medium", subText: "15 mins", value: 15, isActive: false },
  { id: 4, text: "Long", subText: "30 mins", value: 30, isActive: false },
];

const PLACE_HOLDER = {
  sector: "Software, Banking...",
  role: "Developer, Manager...",
  portal: "Naukri, LinkedIn...",
  jd: `Copy a Job Description from the Job portal(Naukri, LinkedIn...\n\n1.Visit the job portal of choice (e.g., Naukri.com) in your web browser.\n2.Search using keywords for a job listing that interests you.\n3.Click the job title to view the full description.\n4.Highlight, copy, and paste the text into your preferred application seamlessly.`,
};

const INTERVAL_TIME = 5000;

function FromJD() {
  const CHAR_LENGTH = 5000;
  const VIEW_MORE_LENGTH = 300;
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ERROR_MESSAGE =
    "In beta version, you can upload only max of " +
    CHAR_LENGTH +
    " characters.";

  const { createJdModal, jdItem } = useSelector(
    (state: any) => state.DashboardReducer
  );

  /**
   * loading
   */
  const loading = useLoader(false);


  const { goTo } = useNavigation();
  const position = useInput("");
  const experience = useDropDown(EXPERIENCE_LIST[0]);
  const jd = useInput("");
  const sector = useInput("");
  const generateJdModal = useModal(false);
  const completedModal = useModal(false);
  const [scheduleId, setScheduleId] = useState(undefined);
  const jdScheduleModal = useModal(false);
  const [jdMore, setJdMore] = useState<any>([]);
  const [fresherChecked, setFresherChecked] = useState(false);

  const [jdDescriptionError, setJdDescriptionError] = useState<any>(undefined);
  const [selectedDuration, setSelectedDuration] = useState<any>(
    INTERVIEW_DURATIONS[0]
  );


  const startInterviewLoader = useLoader(false);

  const handleDurationClick = (interviewDurations) => {
    setSelectedDuration(interviewDurations);
  };

  const [isQuestionGenerated, setIsQuestionGenerated] = useState(false);

  useEffect(() => {
    getKnowledgeGroupFromJdHandler();

    return () => {
      stopInterval();
    };
  }, []);

  const dispatch = useDispatch();

  const getKnowledgeGroupFromJdHandler = () => {
    const params = { from_jd: true };
    loading.show();
    dispatch(
      getJdItemList({
        params,
        onSuccess: () => () => {
          loading.hide();
        },
        onError: () => () => {
          loading.hide();
        },
      })
    );
  };

  function submitJdApiHandler() {
    const params = {
      sector_name: sector.value,
      position: position.value,
      interview_duration: selectedDuration?.value,
      experience: experience?.value?.id,
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
                      setIsQuestionGenerated(true);
                      // generateJdModal.hide();
                      // completedModal.show();
                      getKnowledgeGroupFromJdHandler();
                      resetValues();
                      // showToast(res.status, 'success');
                      if (intervalIdRef.current) {
                        clearInterval(intervalIdRef.current);
                      }
                    },
                    onError: (error: any) => () => {
                      setIsQuestionGenerated(false);
                    },
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
    setSelectedDuration(INTERVIEW_DURATIONS[0]);
  }

  function createNewJdScheduleApiHandler(id: string) {
    const params = {
      knowledge_group_variant_id: id,
    };

    generateJdModal.show();

    dispatch(
      createNewJdSchedule({
        params,
        onSuccess: (res: any) => () => {
          const { details } = res;

          if (details?.schedule_id) {
            const canStartParams = { schedule_id: details?.schedule_id };
            setScheduleId(details?.schedule_id);
            const intervalId = setInterval(() => {
              dispatch(
                canStartInterview({
                  params: canStartParams,
                  onSuccess: (res: any) => () => {
                    setIsQuestionGenerated(true);
                    getKnowledgeGroupFromJdHandler();
                    resetValues();
                    showToast(res.status, "success");
                    clearInterval(intervalId);
                  },
                  onError: (error: any) => () => {
                    setIsQuestionGenerated(false);
                  },
                })
              );
            }, INTERVAL_TIME);
          }
        },
        onError: () => () => {
          generateJdModal.hide();
        },
      })
    );
  }

  function proceedInterviewHandler(id: string) {
    if (id) {
      if (id !== "-1") {
        // const canStartParams = { schedule_id: id }
        startInterviewLoader.hide();
        dispatch(selectedScheduleId(id));
        goTo(ROUTES["designation-module"].interview + "/" + id);

        // startInterviewLoader.show();
        // const intervalId = setInterval(() => {
        //     dispatch(canStartInterview({
        //         params: canStartParams,
        //         onSuccess: (res: any) => () => {
        //             startInterviewLoader.hide();
        //             goTo(ROUTES['designation-module'].interview + "/" + id)
        //             clearInterval(intervalId);
        //         },
        //         onError: (error: any) => () => {
        //             console.log(error);
        //         }
        //     }))
        // }, INTERVAL_TIME);
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

  const stopInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };


  function viewMoreDetailsHandler(status: boolean, index: number) {
    const updateData = [...jdItem]
    updateData[index] = { ...updateData[index], is_view_more: status }
    dispatch(updateJdItem(updateData))
  }


  return (
    <>
      {
        loading.loader && <div className={'loader-container'}><Spinner /></div>
      }
      {!loading.loader && jdItem.length <= 0 && <UploadJdCard />}
      {
        !loading.loader && jdItem.length > 0 &&
        <div className={'screen-container'}>

          {
            jdItem.map((item: any, index: number) => {
              return (
                <div className={index !== 0 ? 'jd-container-top' : ''}>
                  <JdItem item={item} onViewMore={(status) => viewMoreDetailsHandler(status, index)} />
                </div>
              );
            })
          }
        </div>
      }

    </>
  );
}

export { FromJD };
