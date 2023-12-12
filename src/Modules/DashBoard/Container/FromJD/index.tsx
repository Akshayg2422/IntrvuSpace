/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  DropDown,
  Input,
  InputHeading,
  Modal,
  PageNation,
  ResumeUploader,
  Spinner,
  TextArea,
  showToast
} from "@Components";

import {
  useDropDown,
  useInput,
  useKeyPress,
  useLoader,
  useModal,
  useNavigation
} from "@Hooks";
import { JdItem, PreparingYourInterview, UploadJdCard } from '@Modules';
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
  getValidateError,
  ifObjectExist,
  paginationHandler,
  validate
} from "@Utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";



const PLACE_HOLDER = {
  sector: "Software, Banking...",
  role: "Developer, Manager...",
  portal: "Naukri, LinkedIn...",
  jd: `Copy a Job Description from the Job portal(Naukri, LinkedIn...\n\n1.Visit the job portal of choice (e.g., Naukri.com) in your web browser.\n2.Search using keywords for a job listing that interests you.\n3.Click the job title to view the full description.\n4.Highlight, copy, and paste the text into your preferred application seamlessly.`,
};

const INTERVAL_TIME = 5000;

function FromJD() {


  const CHAR_LENGTH = 5000;
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ERROR_MESSAGE =
    "In beta version, you can upload only max of " +
    CHAR_LENGTH +
    " characters.";

  const { createJdModal, jdItem, jdItemNumOfPages, jdItemCurrentPages } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { goTo } = useNavigation();


  /**
   * loading
   */
  const loading = useLoader(false);



  /**
   *  create interview form
   */

  const position = useInput("");
  const experience = useDropDown(EXPERIENCE_LIST[0]);
  const jd = useInput("");
  const [duration, setDuration] = useState<any>(
    INTERVIEW_DURATIONS[0]
  );
  const sector = useInput("");
  const [jdDescriptionError, setJdDescriptionError] = useState<any>(undefined);


  const generateJdModal = useModal(false);
  const [scheduleId, setScheduleId] = useState(undefined);
  const jdScheduleModal = useModal(false);
  const startInterviewLoader = useLoader(false);


  const [isQuestionGenerated, setIsQuestionGenerated] = useState(false);

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



  /**
   * can start interview
   */


  const handleCanStartInterview = (params: any) => {

    dispatch(
      canStartInterview({
        params,
        onSuccess: (res: any) => () => {
          setIsQuestionGenerated(true);
          getKnowledgeGroupFromJdHandler(jdItemCurrentPages);
          resetValues();
          showToast(res.status, "success");

          // Clear the interval only after a successful response
          stopInterval();

        },
        onError: (error: any) => () => {
          setIsQuestionGenerated(false);
        },
      })
    );

  };


  /**
 * Api for create new interview
 */

  function submitJdApiHandler() {
    const params = {
      sector_name: sector.value,
      position: position.value,
      interview_duration: duration?.value,
      experience: experience?.value?.id,
      jd: jd.value,
    };

    const validation = validate(FROM_JD_RULES, params);


    setIsQuestionGenerated(false);



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

              /**
               * first Time call api after on success
               */


              handleCanStartInterview(canStartParams);


              intervalIdRef.current = setInterval(() => {
                handleCanStartInterview(canStartParams)
              }, INTERVAL_TIME);


            }
          },
          onError: (error: any) => () => {
            generateJdModal.hide();
            dispatch(showCreateJddModal());
            showToast(error.error_message, "error");
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  }

  /**
   * Api for TryAnother interview
   */

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

            /**
             * first Time call api after on success
             */

            handleCanStartInterview(canStartParams);

            intervalIdRef.current = setInterval(() => {
              handleCanStartInterview(canStartParams)
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


  function proceedInterviewModalHandler() {
    if (scheduleId) {
      proceedInterviewHandler(scheduleId);
    }
  }


  function resetValues() {
    position.set("");
    experience.set(EXPERIENCE_LIST[0]);
    jd.set("");
    sector.set("");
    setDuration(INTERVIEW_DURATIONS[0]);
  }

  console.log("isQuestionGenerated", isQuestionGenerated);
  return (
    <>
      {
        loading.loader && <div className={'loader-container'}><Spinner /></div>
      }
      {!loading.loader && jdItem?.length <= 0 && <UploadJdCard />}

      {
        !loading.loader && jdItem?.length > 0 &&
        <div className={'screen-container-other'}>
          {
            jdItem.map((item: any, index: number) => {
              return (
                <div className={index !== 0 ? 'jd-container-top' : ''}>
                  <JdItem
                    item={item}
                    onViewMore={(status) => viewMoreDetailsHandler(status, index)}
                    onTryAnotherClick={createNewJdScheduleApiHandler}
                    onProceedClick={proceedInterviewHandler}
                    onViewReport={proceedReport}
                  />
                </div>
              );
            })
          }
          {jdItemNumOfPages > 1 && (
            <div className="mt-3">
              <PageNation
                currentPage={jdItemCurrentPages}
                noOfPage={jdItemNumOfPages}
                isPagination={jdItemNumOfPages}
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
          )}


        </div>
      }


      <Modal
        isOpen={createJdModal}
        title={'Create Interview'}
        subTitle={'Input job details, specifying qualifications, requirements, interview duration'}
        buttonText={'Create Interview'}
        onClose={() => {
          resetValues()
          dispatch(hideCreateJdModal());
        }}
        onClick={submitJdApiHandler}
      >

        <div className={'row'}>
          <div className={'col-sm-6'}>
            <Input
              heading={"Position"}
              placeHolder={PLACE_HOLDER.role}
              value={position.value}
              onChange={position.onChange}
            />
          </div>

          <div className={'col-sm-6'}>
            <DropDown
              heading={"Experience"}
              id={"experience"}
              data={EXPERIENCE_LIST}
              selected={experience?.value}
              onChange={experience.onChange}
            />
          </div>
        </div>

        <TextArea
          error={jdDescriptionError}
          placeholder={PLACE_HOLDER.jd}
          heading={'Job Description'}
          value={jd.value.slice(0, CHAR_LENGTH)}
          onChange={(e: any) => {
            let value = e.target.value;
            if (value.length > CHAR_LENGTH) {
              setJdDescriptionError(ERROR_MESSAGE);
            } else {
              setJdDescriptionError(undefined);
            }
            jd.set(value);
          }}
        />

        <div className={'duration-container'}>
          <InputHeading heading={'Duration'} />
          <div className={'duration-content-container'}>
            {
              INTERVIEW_DURATIONS.map((item: any, index: number) => {
                const { id, subText } = item
                return (
                  <div className={index === 0 ? 'each-duration' : 'each-duration each-duration-space'}>
                    <Button
                      block
                      outline
                      className={`${duration?.id === id ? 'btn-outline-primary-active' : 'btn-outline-primary-inactive'}`}
                      text={subText}
                      onClick={() => {
                        setDuration(item)
                      }}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className={'row group-container'}>
          <div className={"col-sm-6"}>
            <Input
              heading={'Sector'}
              placeHolder={PLACE_HOLDER.sector}
              value={sector.value}
              onChange={sector.onChange}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={generateJdModal.visible}
        title={'Preparing your Interview...'}
        subTitle={'It will take a couple of minutes. You can wait and join using the link that will be sent to your email once the interview is ready.'}
        onClose={generateJdModal.hide}
        buttonText={'Start Interview'}
        onClick={isQuestionGenerated ? proceedInterviewModalHandler : undefined}>
        <PreparingYourInterview isCompleted={isQuestionGenerated} />
      </Modal>

      <Modal
        title={'Interview Preparation is in progress'}
        subTitle={`Interview Preparation is in progress it will take couple of minutes, you will receive schedule confirmation over mail.`}
        isOpen={jdScheduleModal.visible}
        onClose={jdScheduleModal.hide}
        buttonText={'Close'}
        onClick={jdScheduleModal.hide}
      >
      </Modal>
    </>
  );
}

export { FromJD };
