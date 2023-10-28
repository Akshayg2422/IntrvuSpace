import { icons } from "@Assets";
import {
  Back,
  Breadcrumbs,
  Button,
  Card,
  CommonTable,
  DateTimePicker,
  Divider,
  Input,
  Modal,
  NoDataFound,
  showToast,
  Image,
  DropzoneFilePicker,
  Spinner,
  Badge,
  MenuBar,
  NoRecordsFound,
} from "@Components";
import {
  useInput,
  useKeyPress,
  useLoader,
  useModal,
  useNavigation,
  useWindowDimensions,
} from "@Hooks";
import { AnalyzingAnimation, GenerateModal, PreparingYourInterview } from "@Modules";
import {
  bulkUploadCandidates,
  createSchedule,
  fetchCandidatesCorporate,
  generateForm,
  getCorporateScheduleDetails,
  postManualApprovalOnCandidate,
  selectedScheduleId,
} from "@Redux";
import { ROUTES } from "@Routes";
import {
  VALIDATE_ADD_NEW_CANDIDATES_RULES,
  capitalizeFirstLetter,
  convertToUpperCase,
  displayFormatDate,
  downloadFile,
  filteredName,
  formatDateTime,
  getDisplayTimeDateMonthYearTime,
  getMomentObjFromServer,
  getValidateError,
  ifObjectExist,
  paginationHandler,
  showMore,
  validate,
} from "@Utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import "./index.css";

const OPTIONS = [
  { id: 1, name: "Approve Manually" },
  { id: 2, name: "Reject manually" },
  //   { id: 3, name: "Watch Interview" },
];

function VariantInfo() {
  const { goBack } = useNavigation();
  const enterPress = useKeyPress("Enter");
  const { selectedRole, corporateScheduleDetails, candidatesList, candidatesListNumOfPages, candidatesListCurrentPages } =
    useSelector((state: any) => state.DashboardReducer);
  console.log(corporateScheduleDetails, "corporateScheduleDetails-------->");


  const { goTo } = useNavigation();
  const addNewCandidateModal = useModal(false);
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const mobileNumber = useInput("");
  const loader = useLoader(false);
  const bulkUploadLoader = useLoader(false);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("12-02-2021");
  const [showFullContent, setShowFullContent] = useState(false);
  const bulkUploadModal = useModal(false);
  const [candidateBulkUploadData, setCandidateBulkUploadData] = useState("");
  const [searchCandidate, setSearchCandidate] = useState("");
  const [isCandidatesExist, setIsCandidatesExist] = useState<boolean>(false);
  const preparingInterviewModal = useModal(false);

  useEffect(() => {
    getCorporateScheduleDetailsHandler();
    getCandidatesCorporate(candidatesListCurrentPages);
  }, []);

  useEffect(() => {
    if (isCandidatesExist) {
      getCandidatesCorporate(candidatesListCurrentPages);
    }
  }, [enterPress]);

  console.log("candidatesListCurrentPages===>", candidatesListCurrentPages)

  const Refresh = () => {
    const refresh = () => window.location.reload();

    return <button onClick={refresh}>Refresh</button>;
  };

  const getCorporateScheduleDetailsHandler = () => {
    const params = {
      corporate_openings_details_id: selectedRole?.id,
    };
    dispatch(
      getCorporateScheduleDetails({
        params,
        onSuccess: (response: any) => () => { },
        onError: (error: any) => () => { },
      })
    );
  };

  const getCandidatesCorporate = (page_number: number) => {
    const params = {
      corporate_openings_details_id: selectedRole?.id,
      ...(searchCandidate && { q: searchCandidate }),
      page_number
    };
    dispatch(
      fetchCandidatesCorporate({
        params,
        onSuccess: (response: any) => () => {
          // console.log("response candidtae===>", response);
        },
        onError: (error: any) => () => { },
      })
    );
  };

  function generateNewCandidateHandler() {
    const params = {
      corporate_openings_details_id: selectedRole?.id,
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      mobile_number: mobileNumber.value,
    };

    const validation = validate(VALIDATE_ADD_NEW_CANDIDATES_RULES, params);

    if (ifObjectExist(validation)) {
      preparingInterviewModal.show();
      addNewCandidateModal.hide();
      loader.show();
      dispatch(
        createSchedule({
          params,
          onSuccess: (response: any) => () => {
            resetValues();
            showToast("Candidate added successfully", "success");
            loader.hide();
            preparingInterviewModal.hide();
            getCorporateScheduleDetailsHandler();
          },
          onError: (error: any) => () => {
            showToast(error.error_message, "error");
            preparingInterviewModal.hide();
            loader.hide();
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  }

  function resetValues() {
    firstName.set("");
    lastName.set("");
    email.set("");
    mobileNumber.set("");
  }

  const { id, position, experience, details } =
    corporateScheduleDetails?.job_description || {};

  const { schedules } = corporateScheduleDetails || {};

  // console.log(schedules, "schedulessssssssssss");

  const getIconColor = (iconType: any) => {
    switch (iconType) {
      case 1:
        return icons.check;

      case 2:
        return icons.frame;

      case 3:
        return icons.checkBlack;

      default:
        return "";
    }
  };

  const normalizedTableData = (data: any) => {
    console.log("candddiii==>", data);
    if (data && data?.corporate_candidate_details?.data.length > 0)
      return data?.corporate_candidate_details?.data.map((el: any) => {
        return {
          "   ": <Image src={getIconColor(el?.status_icon_type)} height={20} />,
          "": (
            <div
              className={`font-weight-800 text-secondary`}
              style={{ fontSize: 26 }}
            >
              {el?.candidate_score}
            </div>
          ),
          name: (
            <div className="text-secondary tableText font-weight-800">
              {el?.interviewee_name}
            </div>
          ),

          Mobile: (
            <div className="text-secondary font-weight-500">
              {el?.interviewee_mobile_number}
            </div>
          ),

          Email: (
            <div className="m-0 text-secondary font-weight-500">
              {el?.interviewee_email}
            </div>
          ),

          "status Note": (
            <div className={`text-${el?.status_note_colour} font-weight-400`}>
              {el?.status_note}
            </div>
          ),
          "    ": <div className={""}>{handleNextStep(el)}</div>,
          " ": (
            <div className="">
              <Button
                text={"Report"}
                size="md"
                className={"btn btn-outline-primary rounded-sm mr--3 px-0 "}
                style={{
                  borderColor: "#d8dade",
                  fontSize: "15px",
                  width: "110px",
                }}
              />
            </div>
          ),
          "  ": (
            <div>
              <MenuBar
                menuData={OPTIONS}
                onClick={(action) => {
                  manualApprovalsOnCandidate(action, el);
                }}
                toggleIcon={icons.more}
              />
            </div>
          ),
        };
      });
  };

  const handleNextStep = (item: any) => {
    const { id, is_complete, is_started } = item;
    if (is_complete === true) {
      return (
        <Button
          text={"Report"}
          size="md"
          className={"btn btn-outline-primary rounded-sm mr--3 px-0 "}
          style={{
            borderColor: "#d8dade",
            fontSize: "15px",
            width: "110px",
          }}
          onClick={() => {
            goTo(ROUTES["designation-module"].report + "/" + id);
          }}
        />
      );
    }
  };

  function bulkUploadCandidatesHandler() {
    const params = {
      corporate_openings_details_id: corporateScheduleDetails?.id,
      csv_file: candidateBulkUploadData,
    };
    bulkUploadLoader.show();
    bulkUploadModal.hide();
    dispatch(
      bulkUploadCandidates({
        params,
        onSuccess: (response: any) => () => {
          showToast(response.message, "success");
          bulkUploadLoader.hide();
          getCorporateScheduleDetailsHandler();
          getCandidatesCorporate(candidatesListCurrentPages);
        },
        onError: (error: any) => () => {
          showToast(error.error_message, "error");
          bulkUploadLoader.hide();
        },
      })
    );
  }

  // download csv file
  const downloadCSVTemplate = () => {
    downloadFile(corporateScheduleDetails?.bulk_upload_template);
  };

  // manual approval on candidate

  const manualApprovalsOnCandidate = (action: any, el: any) => {
    const params = {
      corporate_schedule_id: el?.id,
      ...(action.id === 1 && { is_manually_approved: true }),
      ...(action.id === 2 && { is_manually_rejected: true }),
    };

    dispatch(
      postManualApprovalOnCandidate({
        params,
        onSuccess: (response: any) => () => {
          showToast(response.message, "success");
          getCandidatesCorporate(candidatesListCurrentPages);
          getCorporateScheduleDetailsHandler();
        },
        onError: (error: any) => () => {
          showToast(error.error_message, "error");
        },
      })
    );
  };

  console.log("candidatte list--->", candidatesList);
  

  return (
    <>
      <div>
        <div className={"m-lg-6 m-4"}>
          <div className="row justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <div>
                  <Image
                    onClick={() => goBack()}
                    style={{ cursor: "pointer" }}
                    src={icons.back}
                    height={15}
                  />
                </div>
                <div className="pl-3">
                  <span className="headingText text-secondary">
                    {convertToUpperCase(
                      corporateScheduleDetails?.job_description?.position
                    )}
                  </span>
                </div>
              </div>
              <div className="pl-4">
                <span className="text-secondary">
                  {corporateScheduleDetails?.job_description?.experience}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="pl-3 pl-sm-0">
                <span className="headingText text-secondary">
                  {`${corporateScheduleDetails?.vacancies ?? ""} ${corporateScheduleDetails?.vacancies > 1
                    ? "Vacancies"
                    : "0 Vacancy"
                    }`}
                </span>
              </div>
              <div className="pl-3">
                <Image src={icons.more} height={22} />
              </div>
            </div>
          </div>

          {candidatesList &&
            candidatesList?.corporate_candidate_details &&
            candidatesList?.corporate_candidate_details?.data.length === 0 &&
            !isCandidatesExist ? (
            <div className="mt-5 text-center">
              <div>
                <span className="titleText text-secondary">
                  {"Start adding your Candidates Now !"}
                </span>
              </div>
              <div className="pt-2 px-xl-3 px-0">
                <span className="text-default" style={{ fontSize: 16 }}>
                  {
                    "Start adding the candidates with their email and phone number. intrvu SPACE instantly schedules interviews and sends the interview invite link over email and message with the deadlines before which they can join anytime of their preference"
                  }
                </span>
              </div>
              <div className="row mt-5 justify-content-center">
                <Button
                  text={"Add Manually"}
                  size="lg"
                  style={{ borderRadius: 4, paddingLeft: 70, paddingRight: 70 }}
                  onClick={addNewCandidateModal.show}
                />
                <div className="mt-5 mt-sm-0 mr-3 mr-sm-0 pl-2 pl-sm-2">
                  <DropzoneFilePicker
                    bulkButtonSize={"lg"}
                    title={"Upload Candidates"}
                    onSelect={(data) => {
                      let eventPickers = [data]
                        ?.toString()
                        .replace(/^data:(.*,)?/, "");
                      setCandidateBulkUploadData(eventPickers);
                    }}
                    onSubmitClick={() => {
                      bulkUploadCandidatesHandler();
                    }}
                    onTemplateClick={() => downloadCSVTemplate()}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-6 row">
                <div className="col-md-6 col-xl-3">
                  <Card
                    style={{
                      borderWidth: 1.5,
                      borderColor: "#e8edff",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="pl-0">
                      <div>
                        <span className="selectionText text-secondary">
                          {"Total Candidates"}
                        </span>
                      </div>

                      <div className="">
                        <span className="titleText text-secondary">
                          {
                            corporateScheduleDetails?.candidate_details
                              ?.total_candidates
                          }
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="col-md-6 col-xl-3">
                  <Card
                    style={{
                      borderWidth: 1.5,
                      borderColor: "#e8edff",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="">
                      <div>
                        <span className="selectionText text-secondary">
                          {"Selected Candidates"}
                        </span>
                      </div>

                      <div>
                        <span className="titleText text-primary">
                          {
                            corporateScheduleDetails?.candidate_details
                              ?.selected_candidates
                          }
                        </span>
                        {corporateScheduleDetails?.vacancies && (
                          <span className="selectionText text-secondary">
                            {"/"}
                            {corporateScheduleDetails?.vacancies}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="col-md-6 col-xl-3">
                  <Card
                    style={{
                      borderWidth: 1.5,
                      borderColor: "#e8edff",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="">
                      <div>
                        <span className="selectionText text-secondary">
                          {"Rejected Candidates"}
                        </span>
                      </div>

                      <div>
                        <span className="titleText text-secondary">
                          {
                            corporateScheduleDetails?.candidate_details
                              ?.rejected_candidates
                          }
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="col-md-6 col-xl-3">
                  <Card
                    style={{
                      borderWidth: 1.5,
                      borderColor: "#e8edff",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="">
                      <div>
                        <span className="selectionText text-secondary">
                          {"Yet to Start"}
                        </span>
                      </div>

                      <div>
                        <span className="titleText text-secondary">
                          {
                            corporateScheduleDetails?.candidate_details
                              ?.yet_to_attend_candidates
                          }
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="mt-5">
                <Card
                  style={{
                    borderWidth: 1.5,
                    borderColor: "#e8edff",
                    backgroundColor: "transparent",
                  }}
                >
                  <div>
                    <div className="p-sm-3 p-0">
                      <div className="d-flex flex-sm-row flex-column">
                        <div className="">
                          <span className="headingText text-secondary">
                            {"Candidates"}
                          </span>
                        </div>
                        <div>
                          <Badge
                            className="text-primary text-lowercase mt-1 font-weight-800 ml-sm-4"
                            style={{
                              backgroundColor: "#ebe4ff",
                              borderRadius: 40,
                              fontSize: 16,
                              borderWidth: 0,
                            }}
                            text={
                              corporateScheduleDetails?.candidate_details
                                ?.selected_candidates
                                ? `${corporateScheduleDetails?.candidate_details?.selected_candidates} selected`
                                : ""
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="px-2 row justify-content-between"
                        style={{ marginTop: 35 }}
                      >
                        <div className="col-sm-5">
                          <Input
                            placeHolder={"Name, Email Phone..."}
                            onChange={(e) => {
                              setSearchCandidate(e.target.value);
                            }}
                            value={searchCandidate}
                            onFocus={() => {
                              setIsCandidatesExist(true);
                            }}
                            onBlur={() => {
                              setIsCandidatesExist(false);
                            }}
                          />
                        </div>

                        <div className="row pr-md-5 pr-0 pl-sm-0 pl-4">
                          <div className="pl-sm-0">
                            <DropzoneFilePicker
                              bulkButtonSize={"lg"}
                              title={"Upload Candidates"}
                              onSelect={(data) => {
                                let eventPickers = [data]
                                  ?.toString()
                                  .replace(/^data:(.*,)?/, "");
                                setCandidateBulkUploadData(eventPickers);
                              }}
                              onSubmitClick={() => {
                                bulkUploadCandidatesHandler();
                              }}
                              onTemplateClick={downloadCSVTemplate}
                              bulkButtonStyle={{
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingTop: 12,
                                paddingBottom: 12,
                              }}
                              outline
                            />
                          </div>
                          <div>
                            <Button
                              className="ml-sm-0 ml-2 ml-md-4"
                              text={"Add"}
                              size="lg"
                              style={{
                                borderRadius: 4,
                                paddingLeft: 45,
                                paddingRight: 45,
                                marginBottom: 30,
                                paddingTop: 11,
                                paddingBottom: 11,
                              }}
                              onClick={addNewCandidateModal.show}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {candidatesList?.corporate_candidate_details &&
                      candidatesList?.corporate_candidate_details?.data.length > 0 ? (
                      <div className={"row px-0 mx--4"}>
                        <div
                          className={
                            "col-sm-12 px-0 overflow-auto scroll-hidden"
                          }
                        >
                          <CommonTable
                            isPagination
                            tableDataSet={candidatesList?.corporate_candidate_details}
                            displayDataSet={normalizedTableData(candidatesList)}
                            noOfPage={candidatesListNumOfPages}
                            currentPage={candidatesListCurrentPages}
                            paginationNumberClick={(currentPage) => { getCandidatesCorporate(paginationHandler("current", currentPage)) }}
                            previousClick={() => { getCandidatesCorporate(paginationHandler("prev", candidatesListCurrentPages)) }}
                            nextClick={() => { getCandidatesCorporate(paginationHandler("next", candidatesListCurrentPages)) }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={
                          "d-flex  justify-content-center align-items-center mx-auto my-9 "
                        }
                      >
                        {" "}
                        <NoRecordsFound />
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </>
          )}

          <div className="mt-6">
            <div>
              <span className="headingText text-secondary">
                {"Job Details"}
              </span>
            </div>
            <div className="pt-3">
              <span>{corporateScheduleDetails?.job_description?.details}</span>
            </div>
          </div>

          <div className="mt-6">
            <div>
              <span className="headingText text-secondary">
                {"Other Information"}
              </span>
            </div>
            <div className="pt-3">
              <Card
                style={{
                  borderWidth: 1.5,
                  borderColor: "#e8edff",
                  backgroundColor: "transparent",
                }}
              >
                <div className="row p-lg-5 p-2">
                  <div className="col-sm-4">
                    <div className="text-secondary">
                      <span>Department</span>
                    </div>
                    <div className="text-secondary">
                      <span
                        className="font-weight-bolder"
                        style={{ fontSize: 18 }}
                      >
                        {corporateScheduleDetails?.department}
                      </span>
                    </div>
                  </div>

                  <div className="col-sm-4 pt-4 pt-sm-0">
                    <div className="text-secondary">
                      <span>Interview Duration</span>
                    </div>
                    <div className="text-secondary">
                      <span
                        className="font-weight-bolder"
                        style={{ fontSize: 18 }}
                      >
                        {`${corporateScheduleDetails?.interview_duration || 0
                          } minutes`}
                      </span>
                    </div>
                  </div>

                  <div className="col-sm-4 pt-4 pt-sm-0">
                    <div className="text-secondary">
                      <span>Candidate Deadline</span>
                    </div>
                    <div className="text-secondary">
                      <span
                        className="font-weight-bolder"
                        style={{ fontSize: 18 }}
                      >
                        {displayFormatDate(
                          corporateScheduleDetails?.candidate_deadline
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="col-sm-4 mt-sm-5 pt-4 pt-sm-0">
                    <div className="text-secondary">
                      <span>Created By</span>
                    </div>
                    <div className="text-secondary">
                      <span
                        className="font-weight-bolder"
                        style={{ fontSize: 18 }}
                      >
                        {corporateScheduleDetails?.created_by}
                      </span>
                    </div>
                  </div>

                  <div className="col-sm-4 mt-sm-5 pt-4 pt-sm-0">
                    <div className="text-secondary">
                      <span>Created At</span>
                    </div>
                    <div className="text-secondary">
                      <span
                        className="font-weight-bolder"
                        style={{ fontSize: 18 }}
                      >
                        {displayFormatDate(
                          corporateScheduleDetails?.created_at
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={"Add Candidate"}
        isOpen={addNewCandidateModal.visible}
        onClose={addNewCandidateModal.hide}
      >
        <div className="col-xl-6">
          <Input
            placeholder={"First Name"}
            value={firstName.value}
            onChange={firstName.onChange}
          />
          <Input
            placeholder={"Last Name "}
            value={lastName.value}
            onChange={lastName.onChange}
          />
          <Input
            placeholder={"Mobile Number"}
            maxLength={10}
            type={"number"}
            value={mobileNumber.value}
            onChange={mobileNumber.onChange}
          />
          <Input
            placeholder={"Email"}
            value={email.value}
            onChange={email.onChange}
          />
        </div>
        <div className={"text-center pt-3"}>
          <Button
            size={"md"}
            text={"Submit"}
            onClick={generateNewCandidateHandler}
            style={{ borderRadius: 4, paddingLeft: 70, paddingRight: 70 }}
          />
        </div>
      </Modal>

      <Modal isOpen={preparingInterviewModal.visible} onClose={preparingInterviewModal.hide}>
        <PreparingYourInterview />
      </Modal>
    </>
  );
}

export { VariantInfo };
