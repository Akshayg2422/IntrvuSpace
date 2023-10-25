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
} from "@Components";
import {
  useInput,
  useLoader,
  useModal,
  useNavigation,
  useWindowDimensions,
} from "@Hooks";
import { AnalyzingAnimation, GenerateModal } from "@Modules";
import {
  bulkUploadCandidates,
  createSchedule,
  generateForm,
  getCorporateScheduleDetails,
  selectedScheduleId,
} from "@Redux";
import { ROUTES } from "@Routes";
import {
  VALIDATE_ADD_NEW_CANDIDATES_RULES,
  capitalizeFirstLetter,
  convertToUpperCase,
  filteredName,
  getDisplayTimeDateMonthYearTime,
  getMomentObjFromServer,
  getValidateError,
  ifObjectExist,
  showMore,
  validate,
} from "@Utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import "./index.css";

function VariantInfo() {
  const { selectedRole, corporateScheduleDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );
  // console.log((corporateScheduleDetails), "corporateScheduleDetails-------->");

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
  const generateVariantModal = useModal(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const bulkUploadModal = useModal(false);
  const [candidateBulkUploadData, setCandidateBulkUploadData] = useState("");

  useEffect(() => {
    getCorporateScheduleDetailsHandler();
  }, []);

  const Refresh = () => {
    const refresh = () => window.location.reload();

    return <button onClick={refresh}>Refresh</button>;
  };

  const getCorporateScheduleDetailsHandler = () => {
    const params = { corporate_openings_details_id: selectedRole?.id };
    dispatch(
      getCorporateScheduleDetails({
        params,
        onSuccess: (response: any) => () => {},
        onError: (error: any) => () => {},
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
      addNewCandidateModal.hide();
      generateVariantModal.show();
      loader.show();
      dispatch(
        createSchedule({
          params,
          onSuccess: (response: any) => () => {
            resetValues();
            showToast("Candidate added successfully", "success");
            loader.hide();
            generateVariantModal.hide();
            getCorporateScheduleDetailsHandler();
          },
          onError: (error: any) => () => {
            showToast(error.error_message, "error");
            generateVariantModal.hide();
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

  console.log(JSON.stringify(schedules), "schedulessssssssssss");

  const normalizedTableData = (data: any) => {
    if (data && data?.schedules?.length > 0)
      return data?.schedules?.map((el: any) => {
        return {
          name: (
            <div className="row">
              <div className="col-auto ">
                <div className="mr--3">{el?.interviewee_name}</div>
              </div>
            </div>
          ),

          phone: <div className={""}>{el?.interviewee_mobile_number}</div>,

          Email: <div className="m-0">{el?.interviewee_email}</div>,

          status: <div className="">{el?.status}</div>,
          "": <div className={"text-right"}>{handleNextStep(el)}</div>,
        };
      });
  };

  const handleNextStep = (item: any) => {
    const { id, is_complete, is_started } = item;
    if (is_complete === true) {
      return (
        <Button
          text={"View Report"}
          size="sm"
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
          showToast(response.success, "success");
          bulkUploadLoader.hide();
          getCorporateScheduleDetailsHandler();
          console.log(response, "1111111111111111111111111111111111111");
        },
        onError: (error: any) => () => {
          showToast(error.error_message, "error");
          bulkUploadLoader.hide();
        },
      })
    );
  }

  const downloadCSVTemplate = () => {
    const csvContent =
      "Name,Email,Phone\nJohn Doe,johndoe@example.com,123-456-7890";
    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "candidate_template.csv");
  };

  return (
    <>
      <div>
        <div className={"m-lg-6 m-4"}>
          <div className="row justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <div>
                  <Image
                    style={{ cursor: "pointer" }}
                    src={icons.back}
                    height={10}
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
                  {"4 Vacancies"}
                </span>
              </div>
              <div className="pl-3">
                <Image src={icons.more} height={22} />
              </div>
            </div>
          </div>

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
            <div className="pt-5">
              <Button
                text={"Add Manually"}
                size="lg"
                style={{ borderRadius: 4, paddingLeft: 70, paddingRight: 70 }}
              />
              <Button className="mt-4 mt-sm-0 mr-3 mr-sm-0"
                text={"Bulk Import"}
                size="lg"
                style={{ borderRadius: 4, paddingLeft: 78, paddingRight: 78 }}
              />
            </div>
          </div>

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
                        {"Mobile Development"}
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
                        {"30 minutes"}
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
                        {"20 Oct 2023, 6.00 PM"}
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
                        {"Arul Kumar"}
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
                        {"20 Oct 2023, 12.43 PM"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {/* {
                        schedules && schedules.length > 0 ?

                            < Card className={'mt--3 vh-100 mb-3 overflow-auto overflow-hide'} >
                                <>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className={'h3 text-dark'}>
                                            {'Candidates'}
                                        </div>
                                        <div className={'row align-items-center'}>

                                            <div className={'mr-3'}>
                                                <DropzoneFilePicker
                                                    size={'md'}
                                                    title={'Upload Candidates'}
                                                    onSelect={(data) => {
                                                        let eventPickers = [data]?.toString().replace(/^data:(.*,)?/, "");
                                                        console.log('eventPickers=======>..', eventPickers);
                                                        setCandidateBulkUploadData(eventPickers);
                                                    }}
                                                    onSubmitClick={() => {
                                                        bulkUploadCandidatesHandler();
                                                    }}
                                                    onTemplateClick={downloadCSVTemplate}
                                                />
                                            </div>

                                            <Button text={'Add New'} onClick={addNewCandidateModal.show} />
                                        </div>
                                    </div>
                                    {corporateScheduleDetails && corporateScheduleDetails?.schedules.length > 0
                                        ? (
                                            <div className={'row px-0 mx--4'}>
                                                <div className={'col-sm-12 px-0'} >
                                                    <CommonTable
                                                        tableDataSet={corporateScheduleDetails}
                                                        displayDataSet={normalizedTableData(corporateScheduleDetails)}
                                                    />

                                                </div>
                                            </div>
                                        ) :
                                        <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}>
                                            <NoDataFound text={"No Data Found"} />
                                        </div>
                                    }
                                </>
                            </Card>

                            : <div className={'m-2 row d-flex justify-content-between'}>
                                <div className={'mt-3  text-right col-9'}>
                                    <DropzoneFilePicker
                                        size={'md'}
                                        title={'Upload Candidates'}
                                        onSelect={(data) => {
                                            let eventPickers = [data]?.toString().replace(/^data:(.*,)?/, "");
                                            console.log('eventPickers=======>..', eventPickers);
                                            setCandidateBulkUploadData(eventPickers);
                                        }}
                                        onSubmitClick={() => {
                                            bulkUploadCandidatesHandler();
                                        }}
                                        onTemplateClick={downloadCSVTemplate}
                                    />
                                </div>
                                <div className={''}>
                                    <Button block text={'Add Candidates'} onClick={addNewCandidateModal.show} />
                                </div>
                            </div>
                    } */}
          {/* <Card className={'col-sm-12 col-lg-12 col-md-12'} >
                        <div className={'row justify-content-between mb-3 mx--4'}>
                            <div className={'ml-2 h3 text-dark'}>{capitalizeFirstLetter(position)}</div>
                            <div className={'mb-2 mr-2'}><h3 className={'text-primary pointer'} onClick={() => { goTo(ROUTES['designation-module']['questions']) }} >{'View Questions'}</h3></div>
                        </div>
                        <div className={'d-flex flex-column mt--3'}>
                            <div className={'row pb-2'}>
                                <span className={"text-black text-sm"}>
                                    <i className="pr-2">
                                        <img src={icons.briefCaseBlack} alt="Comment Icon" height={'20'} width={'20'} />
                                    </i>
                                    Experience with {experience}
                                </span>
                            </div>
                            <div className={'row pb-1 text-sm text-black font-weight-500'}>
                                <span style={{ maxWidth: '100vw' }}>
                                    <i className="pr-2">
                                        <img src={icons.information} alt="Comment Icon" height={'20'} width={'20'} />
                                    </i>
                                    {showFullContent ? details : filteredName(details, 480)}
                                </span>
                                {details && details.length > 480 && (
                                    <span
                                        className="text-primary pointer"
                                        onClick={() => setShowFullContent(!showFullContent)}
                                    >
                                        {showFullContent ? <span className={'h5 text-primary'}> View Less</span> : <span className={'h5 text-primary'}> View More</span>}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card> */}
        </div>
      </div>
      {/* <Modal title={'Add Candidate'} isOpen={addNewCandidateModal.visible} onClose={addNewCandidateModal.hide}>
                <div className='col-xl-6'>
                    <Input heading={'First Name'} value={firstName.value} onChange={firstName.onChange} />
                    <Input heading={'Last Name '} value={lastName.value} onChange={lastName.onChange} />
                    <Input heading={'Mobile Number'} maxLength={10} type={'number'} value={mobileNumber.value} onChange={mobileNumber.onChange} />
                    <Input heading={'Email'} value={email.value} onChange={email.onChange} />

                </div>
                <div className={'text-right'}><Button size={'md'} text={'Submit'} onClick={generateNewCandidateHandler} /></div>

            </Modal> */}
      <GenerateModal
        title={"Scheduling Interview"}
        isOpen={generateVariantModal.visible}
        onClose={generateVariantModal.hide}
      >
        <AnalyzingAnimation />
      </GenerateModal>
    </>
  );
}

export { VariantInfo };
