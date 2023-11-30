import { icons } from "@Assets";
import {
  Alert,
  Button,
  CommonTable,
  DropDown,
  Image,
  Input,
  MenuBar,
  Modal,
  NoDataFound,
  Spinner,
  StatusIcon,
  WatchInterviewModal,
  showToast,
} from "@Components";
import {
  useDropDown,
  useInput,
  useKeyPress,
  useLoader,
  useModal,
  useNavigation,
} from "@Hooks";
import { BulkUpload } from "@Modules";
import {
  bulkUploadCandidates,
  createSchedule,
  fetchCandidatesCorporate,
  postManualApprovalOnCandidate,
  refreshCorporateSchedule,
  watchInterviewVideoUrl,
} from "@Redux";
import { ROUTES } from "@Routes";
import {
  VALIDATE_ADD_NEW_CANDIDATES_RULES,
  capitalizeFirstLetter,
  copyToClipboard,
  getBrowserInfo,
  getPhoto,
  getValidateError,
  ifObjectExist,
  paginationHandler,
  validate,
  WATCH_VIDEO_PERMISSION_CONTEXT,
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { OpeningCandidatesProps } from "./interfaces";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function OpeningCandidates({ id, details }: OpeningCandidatesProps) {
  const { goTo } = useNavigation();
  const enterPress = useKeyPress("Enter");

  const CANDIDATE_MENU_OPTIONS = [
    { id: 1, name: "Approve Manually" },
    { id: 2, name: "Reject Manually" },
    { id: 3, name: "Remove Candidate" }

  ];

  const CANDIDATE_MENU_OPTIONS_COMPLETED = [
    { id: 6, name: "Watch Interview" },

  ];

  const CANDIDATE_MENU_OPTIONS_NOT_START = [
    { id: 4, name: "Block Interview" },
    { id: 5, name: "Copy Interview Link" },

  ];



  function getCandidateMenu(isCompleted: boolean, is_skipped: boolean, recording_url: any) {
    return [
      ...CANDIDATE_MENU_OPTIONS,
      ...(isCompleted && recording_url.length === 0 ? [] : isCompleted ? CANDIDATE_MENU_OPTIONS_COMPLETED : CANDIDATE_MENU_OPTIONS_NOT_START)
      // ...(isCompleted ?(is_skipped?[]: CANDIDATE_MENU_OPTIONS_COMPLETED ):(is_skipped?[]:CANDIDATE_MENU_OPTIONS_NOT_START))
    ] as never[];
  }


  const USER_STATUS_FILTER = [
    { id: "ALL", text: "All" },
    { id: "SLD", text: "Selected" },
    { id: "RJD", text: "Rejected" },
    { id: "YTS", text: "Yet to Start" },
  ];

  const getIcon = (key: number) => {
    const iconsMap = {
      1: <StatusIcon />,
      2: <StatusIcon variant={'frame'} />,
      3: <StatusIcon variant={'checkBlack'} />
    };
    return iconsMap[key];
  };

  const [candidateCountDetails, setCandidateCountDetails] = useState<any>(0);

  const openWatchInterviewNotSupportedModal = useModal(false);

  const dispatch = useDispatch();

  const { candidate_details = {}, vacancies = 0 } = details || {};
  const {
    total_candidates = 0,
    yet_to_attend_candidates = 0,
    selected_candidates = 0,
    rejected_candidates = 0,
  } = candidate_details;

  const isJdClosed = details?.is_closed;

  const {
    openingCandidates,
    openingCandidatesCount,
    openingCandidatesNumOfPages,
    openingCandidatesCurrentPages,
    interviewUrl,
  } = useSelector((state: any) => state.DashboardReducer);

  const { dashboardDetails } = useSelector((state: any) => state.AuthReducer);
  const { is_department_admin } = dashboardDetails?.rights || {}


  useEffect(() => {
    if (openingCandidatesCount > candidateCountDetails) {
      setCandidateCountDetails(openingCandidatesCount);
    }
  }, [openingCandidatesCount]);

  const loader = useLoader(false);

  /**
   * add candidate state
   */

  const addCandidateModal = useModal(false);
  const addCandidateLoader = useLoader(false);

  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const mobileNumber = useInput("");

  const candidateStatus = useDropDown(USER_STATUS_FILTER[0]);
  const searchCandidate = useInput("");

  const [selectedCandidates, setSelectedCandidates] = useState(undefined);

  /**
   * remove candidate
   */

  const removeCandidateModal = useModal(false);
  const closeCandidateModal = useModal(false);

  /**
   * bulk upload state
   */

  const bulkUploadModal = useModal(false);
  const bulkUploadLoader = useLoader(false);

  /**
   * candidate search onEnter
   */

  const [isCandidateSearch, setIsCandidateSearch] = useState(false);

  /**
   *  watch interview
   */

  const openWatchInterviewModal = useModal(false);

  function openBulkUploadHandler() {
    bulkUploadModal.show();
  }

  useEffect(() => {
    getCandidatesCorporate(openingCandidatesCurrentPages);
  }, [candidateStatus?.value?.id]);

  useEffect(() => {
    if (isCandidateSearch && enterPress) {
      getCandidatesCorporate(openingCandidatesCurrentPages);
    }
  }, [enterPress]);

  const getCandidatesCorporate = (page_number: number) => {
    const params = {
      corporate_openings_details_id: id,
      ...(searchCandidate?.value && { q: searchCandidate?.value }),
      ...(candidateStatus.value.id === USER_STATUS_FILTER[1].id && {
        is_approved: true,
      }),
      ...(candidateStatus.value.id === USER_STATUS_FILTER[2].id && {
        is_rejected: true,
      }),
      ...(candidateStatus.value.id === USER_STATUS_FILTER[3].id && {
        is_not_attended: true,
      }),
      page_number,
    };

    loader.show();

    dispatch(
      fetchCandidatesCorporate({
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

  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((item: any) => {
        const {
          candidate_score,
          interviewee_name,
          interviewee_mobile_number,
          interviewee_email,
          status_note,
          status_note_colour,
          is_report_completed,
          status_icon_type,
          is_closed,
          is_complete,
          is_skipped,
          interviewee_photo,
          recording_url
        } = item;

        const status = getIcon(status_icon_type);
        return {

          "": (
            <div className={"d-flex align-items-center"}>
              {status_icon_type ? (
                status
              ) : null}
              {candidate_score ? (
                <div className={"screen-heading ml-2"}>{candidate_score}</div>
              ) : candidate_score === 0 ? <div className={"screen-heading ml-2"}>{candidate_score}</div> : null}
            </div>
          ),

          name: (
            <div className={"d-flex align-items-center"}>
              <div>
                {interviewee_photo ?
                  <PhotoProvider>
                    <div className={"pointer"}>
                      <PhotoView src={getPhoto(interviewee_photo)}>
                        <Image
                          src={getPhoto(interviewee_photo)}
                          height={50}
                          width={50}
                          style={{
                            objectFit: 'cover',
                            overflow: 'hidden',
                            padding: '1px',
                            borderRadius: '30px',
                            width: "45px",
                            height: "45px",
                          }}
                        />
                      </PhotoView>
                    </div>
                  </PhotoProvider>
                  :
                  <div style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "30px",
                    backgroundColor: "#fbfcfa",
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}>
                    <Image
                      src={icons.profile}
                      height={20}
                      width={20}
                      style={{
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                }
              </div>
              <div className={"th-bold ml-3"}>
                {capitalizeFirstLetter(interviewee_name)}
              </div>
            </div>
          ),

          Mobile: (
            <div className={"th-regular"}>{interviewee_mobile_number}</div>
          ),

          Email: <div className={"th-regular"}>{interviewee_email}</div>,

          Status: (
            <div className={`text-${status_note_colour} font-weight-400`}>
              {status_note}
            </div>
          ),
          " ": (
            <div className={"d-flex align-items-center"}>
              {is_report_completed && (
                <div className={"th-button"}>
                  <Button
                    block
                    outline
                    text={"Report"}
                    onClick={() => {
                      gotoReportScreen(item);
                    }}
                  />
                </div>
              )}
            </div>
          ),
          ...(!isJdClosed && {
            "  ": (
              <div className={"d-flex align-items-center"}>
                {!is_closed && (
                  <div className={"th-menu-container"}>
                    <MenuBar
                      menuData={getCandidateMenu(is_complete, is_skipped, recording_url)}
                      onClick={(action) => onCandidateMenuHandler(action, item)}
                    />
                  </div>
                )}
              </div>
            ),
          }),
        };
      });
  };

  function generateNewCandidateHandler() {
    const params = {
      corporate_openings_details_id: id,
      first_name: firstName.value,
      last_name: lastName.value,
      mobile_number: mobileNumber.value,
      email: email.value,
    };

    const validation = validate(VALIDATE_ADD_NEW_CANDIDATES_RULES, params);

    if (ifObjectExist(validation)) {
      addCandidateLoader.show();
      dispatch(
        createSchedule({
          params,
          onSuccess: (response: any) => () => {
            resetValues();
            dispatch(refreshCorporateSchedule());
            showToast("Candidate added successfully", "success");
            addCandidateLoader.hide();
            addCandidateModal.hide();
            getCandidatesCorporate(openingCandidatesCurrentPages);
          },
          onError: (error: any) => () => {
            showToast(error.error_message, "error");
            addCandidateLoader.hide();
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  }

  /**
   * candidate menu Handler
   */

  function onCandidateMenuHandler(action: any, item: any) {
    const {
      id,
      recording_url,
      interview_duration,
      interviewee_name,
      interviewee_email,
      interview_link,
    } = item;


    setSelectedCandidates(id);

    if (action.id === CANDIDATE_MENU_OPTIONS[0].id) {
      const params = { is_manually_approved: true };
      postManualApprovalOnCandidateApiHandler(params, id);
    } else if (action.id === CANDIDATE_MENU_OPTIONS[1].id) {
      const params = { is_manually_rejected: true };
      postManualApprovalOnCandidateApiHandler(params, id);
    } else if (action.id === CANDIDATE_MENU_OPTIONS[2].id) {
      removeCandidateModal.show();
    } else if (action.id === CANDIDATE_MENU_OPTIONS_NOT_START[0].id) {
      closeCandidateModal.show();
    } else if (action.id === CANDIDATE_MENU_OPTIONS_NOT_START[1].id) {
      copyToClipboard(interview_link);
      showToast("Interview link copied", "success");
    } else if (action.id === CANDIDATE_MENU_OPTIONS_COMPLETED[0].id) {
      if (recording_url && recording_url.length > 0 && interview_duration) {
        dispatch(
          watchInterviewVideoUrl({
            recording_url,
            interview_duration,
            interviewee_name,
            interviewee_email,
          })
        );
        if (
          getBrowserInfo().browserName !== "Mozilla Firefox" &&
          getBrowserInfo().browserName !== "Safari"
        ) {
          openWatchInterviewModal.show();
        } else {
          openWatchInterviewNotSupportedModal.show();
        }
      } else {
        showToast("Interview video unavailable", "info");
      }
    }
  }

  const postManualApprovalOnCandidateApiHandler = (
    updatedParams: any,
    id?: any
  ) => {
    const params = {
      corporate_schedule_id: id ? id : selectedCandidates,
      ...updatedParams,
    };

    dispatch(
      postManualApprovalOnCandidate({
        params,
        onSuccess: (response: any) => () => {
          showToast(response.message, "success");
          getCandidatesCorporate(openingCandidatesCurrentPages);
          dispatch(refreshCorporateSchedule());

          try {
            closeCandidateModal.hide();
            removeCandidateModal.hide();
            setSelectedCandidates(undefined);
          } catch (e) { }
        },
        onError: (error: any) => () => {
          showToast(error.error_message, "error");
        },
      })
    );
  };

  function removeCandidateApiHandler() {
    const params = { is_removed: true };
    postManualApprovalOnCandidateApiHandler(params);
  }

  function closeCandidateApiHandler() {
    const params = { is_closed: true };
    postManualApprovalOnCandidateApiHandler(params);
  }

  const gotoReportScreen = (item: any) => {
    const { schedule_id } = item;
    goTo(ROUTES["designation-module"].report + "/" + schedule_id);
  };

  function resetValues() {
    addCandidateModal.hide();

    firstName.set("");
    lastName.set("");
    email.set("");
    mobileNumber.set("");
  }

  /**
   * bulk upload
   */

  // bulk upload candidates

  function bulkUploadCandidatesHandler(file: any) {
    const params = {
      corporate_openings_details_id: details?.id,
      csv_file: file,
    };

    bulkUploadLoader.show();

    dispatch(
      bulkUploadCandidates({
        params,
        onSuccess: (response: any) => () => {
          showToast(response.message, "success");
          bulkUploadLoader.hide();
          dispatch(refreshCorporateSchedule());
          bulkUploadModal.hide();
          getCandidatesCorporate(openingCandidatesCurrentPages);
        },
        onError: (error: any) => () => {
          showToast(error.error_message, "error");
          bulkUploadLoader.hide();
        },
      })
    );
  }

  return (
    <>
      {
        openingCandidatesCount <= 0 && !is_department_admin && !isJdClosed && (
          <div className={"empty-candidates-container"}>
            <div className={"text-heading"}>
              {"Start adding your Candidates Now !"}
            </div>
            <div className={"empty-candidates-des-container"}>
              <div className={"text-des"}>
                {
                  "Start adding the candidates with their email and phone number. intrvu SPACE instantly schedules interviews and sends the interview"
                }
              </div>
              <div className={"text-des"}>
                {
                  "invite link over email and message with the deadlines before which they can join anytime of their preference"
                }
              </div>
            </div>
            {/* {!is_department_admin && !isJdClosed && ( */}
            <div className={"empty-candidates-btn-container"}>
              <div className={"empty-btn-container"}>
                <Button
                  block
                  text={"Add Manually"}
                  onClick={addCandidateModal.show}
                />
              </div>
              <div className={"empty-btn-container bulk-btn-container"}>
                <Button
                  block
                  text={"Bulk Import"}
                  onClick={openBulkUploadHandler}
                />
              </div>
            </div>
            {/* )} */}
          </div>
        )}

      {
        candidateCountDetails > 0 && (
          <div>
            <div className={"candidate-dashboard-container"}>
              <div
                className={
                  "dashboard-card-container dashboard-card-spacing  dashboard-card-left-spacing"
                }
              >
                <div className={"dashboard-title"}>{"Total Candidates"}</div>
                <div className={"text-heading"}>{total_candidates}</div>
              </div>
              <div className={"dashboard-card-container dashboard-card-spacing"}>
                <div className={"dashboard-title"}>{"Selected Candidates"}</div>
                <div>
                  <span
                    className={`text-heading ${selected_candidates > 0 && "text-primary"
                      }`}
                  >
                    {selected_candidates}
                  </span>
                  <span className={"selected-sub-text"}>{`/${vacancies}`}</span>
                </div>
              </div>
              <div className={"dashboard-card-container dashboard-card-spacing "}>
                <div className={"dashboard-title"}>{"Rejected Candidates"}</div>
                <div className={"text-heading"}>{rejected_candidates}</div>
              </div>
              <div
                className={
                  "dashboard-card-container dashboard-card-spacing dashboard-card-right-spacing"
                }
              >
                <div className={"dashboard-title"}>{"Yet to Start "}</div>
                <div className={"text-heading"}>{yet_to_attend_candidates}</div>
              </div>
            </div>

            <div className={"card-container"}>
              <div className={"table-heading "}>
                <span className={"screen-heading"}>{"Candidates"}</span>
                {selected_candidates > 0 && (
                  <div
                    className={"badge-schedule"}
                    style={{
                      marginLeft: "20px",
                    }}
                  >
                    <span
                      className={"badge-text"}
                    >{`${selected_candidates} Selected`}</span>
                  </div>
                )}
              </div>

              <div className={"table-search-container"}>
                <div className={"col-sm-4 input-container"}>
                  <Input
                    noSpace
                    type={"text"}
                    placeHolder={"Name, Email, ..."}
                    value={searchCandidate?.value}
                    onChange={searchCandidate?.onChange}
                    onFocus={() => setIsCandidateSearch(true)}
                    onBlur={() => setIsCandidateSearch(false)}
                  />
                </div>

                <div className={"col-sm-3 input-container"}>
                  <DropDown
                    noSpace
                    id={"status"}
                    data={USER_STATUS_FILTER}
                    selected={candidateStatus.value}
                    onChange={candidateStatus.onChange}
                  />
                </div>

                {!isJdClosed && (
                  <div className={"add-candidate-container"}>
                    <div className={"add-button-container"}>
                      {!is_department_admin && <Button
                        block
                        text={"Add"}
                        onClick={addCandidateModal.show}
                      />
                      }
                    </div>
                    <div className={"add-button-container"}>
                      {!is_department_admin && <Button
                        block
                        outline
                        text={"Bulk Import"}
                        onClick={openBulkUploadHandler}
                      />
                      }
                    </div>
                  </div>
                )}
              </div>

              {!loader.loader ? (
                <div
                  className={'table-container'}
                  style={{
                    ...(openingCandidates?.length === 1 && { height: "280px" })
                  }}>

                  {openingCandidates?.length > 0 ? (
                    <CommonTable
                      isPagination={openingCandidatesNumOfPages > 1}
                      tableDataSet={openingCandidates}
                      displayDataSet={normalizedTableData(openingCandidates)}
                      noOfPage={openingCandidatesNumOfPages}
                      currentPage={openingCandidatesCurrentPages}
                      paginationNumberClick={(currentPage) => {
                        getCandidatesCorporate(
                          paginationHandler("current", currentPage)
                        );
                      }}
                      previousClick={() => {
                        getCandidatesCorporate(
                          paginationHandler("prev", openingCandidatesCurrentPages)
                        );
                      }}
                      nextClick={() => {
                        getCandidatesCorporate(
                          paginationHandler("next", openingCandidatesCurrentPages)
                        );
                      }}
                    />
                  ) : (
                    <div className={"no-data-found"}>
                      <NoDataFound />
                    </div>
                  )}
                </div>
              ) : (
                <div className={"loader-containers"}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        )}

      {/**
       * add candidate Modal
       */}
      <Modal
        loading={addCandidateLoader.loader}
        title={"Add Candidate"}
        isOpen={addCandidateModal.visible}
        onClose={resetValues}
        onClick={generateNewCandidateHandler}
      >
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              heading={"First Name"}
              placeholder={"First Name"}
              value={firstName.value}
              onChange={firstName.onChange}
            />
          </div>
          <div className={"col-sm-6"}>
            <Input
              heading={"Last Name"}
              placeholder={"Last Name"}
              value={lastName.value}
              onChange={lastName.onChange}
            />
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-sm-6"}>
            <Input
              maxLength={10}
              heading={"Mobile Number"}
              placeholder={"Mobile Number"}
              type={"number"}
              value={mobileNumber.value}
              onChange={mobileNumber.onChange}
            />
          </div>
          <div className={"col-sm-6"}>
            <Input
              heading={"Email"}
              placeholder={"Email"}
              value={email.value}
              onChange={email.onChange}
            />
          </div>
        </div>
      </Modal>

      {/**
       * remove candidate alert
       */}

      <Alert
        isOpen={removeCandidateModal.visible}
        title={"Remove Candidate"}
        subTitle={"Are you sure, want to remove this candidate?"}
        onClose={() => {
          removeCandidateModal.hide();
        }}
        primaryOnClick={removeCandidateApiHandler}
        secondaryOnClick={removeCandidateModal.hide}
      />

      <Alert
        isOpen={closeCandidateModal.visible}
        title={"Block Candidate's Interview"}
        subTitle={"Are you sure, want to block this candidate's interview?"}
        onClose={() => {
          closeCandidateModal.hide();
        }}
        primaryOnClick={closeCandidateApiHandler}
        secondaryOnClick={closeCandidateModal.hide}
      />

      <BulkUpload
        loading={addCandidateLoader.loader}
        tempFile={details?.bulk_upload_template}
        isOpen={bulkUploadModal.visible}
        onClose={bulkUploadModal.hide}
        onUpload={bulkUploadCandidatesHandler}
      />

      {/**
       * Watch Inteview
       */}

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

      {/**
       * watch interview not supported Modal
       */}

      <Modal
        isOpen={openWatchInterviewNotSupportedModal.visible}
        onClose={() => {
          openWatchInterviewNotSupportedModal.hide();
        }}
        title={"Browser Permission Denied"}
        buttonText="Close"
        onClick={() => {
          openWatchInterviewNotSupportedModal.hide();
        }}
      >
        <div className="mt--4">
          {WATCH_VIDEO_PERMISSION_CONTEXT.map((item) => {
            const { id, text, h } = item;

            return (
              <div key={id}>
                <div className="d-flex align-items-center ">
                  <StatusIcon variant={'frame'} />
                  <div className="ml-2">{text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

export { OpeningCandidates };
