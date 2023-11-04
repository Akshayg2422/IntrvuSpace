import { icons, image } from "@Assets";
import {
  Badge,
  Button,
  ButtonGroup,
  CommonTable,
  Divider,
  DropDown,
  DropDownIcon,
  Heading,
  Image,
  NoDataFound,
  Spinner,
} from "@Components";
import { useDropDown, useLoader } from "@Hooks";
import { fetchBasicReport } from "@Redux";
import { color } from "@Themes";
import { capitalizeFirstLetter } from "@Utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Card, CardBody, CardFooter, CardHeader, Progress } from "reactstrap";

const PERFORMANCE_CONTENT = [
  {
    id: 1,
    topic: "skill_matrix",
    subText:
      "Performance in relation to the specified job description and specifications",
  },
  {
    id: 2,
    topic: "communication",
    subText:
      "Evaluation of communication skills, encompassing fluency and grammar",
  },
  {
    id: 3,
    topic: "trait",
    subText: "Diplomacy, work ethics, character and suitability for the role",
  },
];

const NOTE = [
  { id: 1, icon: icons.check, text: "Completely Covered" },
  { id: 2, icon: icons.checkBlack, text: "Partially Covered" },
  { id: 3, icon: icons.frame, text: "Covered by invalid" },
];

const REPORT_TYPE = [
  { id: "BR", text: "Basic Report" },
  { id: "DR", text: "Detailed Report" },
];

function Report() {
  const { schedule_id } = useParams();

  const dispatch = useDispatch();

  const [dataId, setDataId] = useState<any>([
    "trait",
    "communication",
    "skill_matrix",
  ]);

  const [basicReportData, setBasicReportData] = useState<any>(undefined);
  // const filter = useDropDown(FILTER[0]);

  const componentRef = useRef(null);
  let basicReportLoader = useLoader(false);
  const [check, setCheck] = useState<any>(0);
  const heightRef = useRef<any>();
  const [cardHeight, setCardHeight] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>({});
  const [fileName, setFileName] = useState("");
  // const [reportType, setReportType] = useState(REPORT_TYPE[0].id);
  const reportType = useDropDown(REPORT_TYPE[0]);


  useEffect(() => {
    getBasicReportData();
  }, [reportType.value.id]);

  // useEffect(() => {
  //   if (basicReportData) {
  //     removeDuplicates();
  //   }
  // }, [basicReportData]);

  const handleRating = (el: any) => {
    if (typeof el.rating === "string" && !isNaN(el.rating)) {
      return parseInt(el.rating);
    } else if (typeof el.rating === "number" && !isNaN(el.rating)) {
      return el.rating;
    } else {
      return 0;
    }
  };

  function getPercentage(array: any, key: string) {
    const arrayWithUpdatedRatings = array.map((it) => {
      return {
        ...it,
        rating: handleRating(it),
      };
    });

    return (
      arrayWithUpdatedRatings.reduce(function (acc, obj) {
        return acc + parseFloat(obj[key]);
      }, 0) / array.length
    );
  }

  const getBasicReportData = () => {
    basicReportLoader.show();
    const params = {
      schedule_id: schedule_id,
      ...(reportType.value.id === "DR" && { is_detailed: true }),
    };
    dispatch(
      fetchBasicReport({
        params,
        onSuccess: (success) => () => {
          basicReportLoader.hide();
          // console.log("success===>", success.details);
          setBasicReportData(success.details);

          const {
            communication,
            skill_matrix,
            trait,
            overall_weightage,
            name,
            sub_text,
          } = success.details;
          // setFileName(name + "_" + sub_text + "_" + filter?.value.title);
          setFileName(name + "_" + sub_text + "_" + reportType)

          // console.log(communication, "communication data");
          // console.log(skill_matrix, "skill_matrix data");
          // console.log(trait, "trait data");

          // const communicationPercentage =
          //   communication?.length > 0
          //     ? parseFloat(
          //         (
          //           (getPercentage(communication, "rating") / 100) *
          //           overall_weightage.communication
          //         ).toFixed(1)
          //       )
          //     : 0;
          // const skillMatrixPercentage =
          //   skill_matrix?.sections?.length > 0
          //     ? parseFloat(
          //         (
          //           (getPercentage(skill_matrix?.sections, "rating") / 100) *
          //           overall_weightage.skill_matrix
          //         ).toFixed(1)
          //       )
          //     : 0;
          // const traitPercentage =
          //   trait.length > 0
          //     ? parseFloat(
          //         (
          //           (getPercentage(trait, "percent") / 100) *
          //           overall_weightage.trait
          //         ).toFixed(1)
          //       )
          //     : 0;

          // console.log(
          //   communicationPercentage,
          //   "communicationPercentage=========="
          // );
          // console.log(skillMatrixPercentage, "communicationPercentage======");
          // console.log(traitPercentage, "communicationPercentage===");

          // const total = (
          //   communicationPercentage +
          //   skillMatrixPercentage +
          //   traitPercentage
          // ).toFixed(1);
          // console.log("total0===================>", total);

          // setPercentage({
          //   communication: communicationPercentage,
          //   skillMatrix: skillMatrixPercentage,
          //   trait: traitPercentage,
          //   communicationOverAll:
          //     communication?.length > 0
          //       ? parseFloat(getPercentage(communication, "rating").toFixed(1))
          //       : 0,
          //   skillMatrixOverAll: "",
          //   traitOverAll:
          //     trait.length > 0
          //       ? parseFloat(getPercentage(trait, "percent").toFixed(1))
          //       : 0,
          //   overAll: parseFloat(total),
          // });
        },
        onError: (error) => () => {

          basicReportLoader.hide();
          console.log(error, "error");

        },
      })
    );
  };
  console.log(basicReportData, "basicReportData");

  // const calculateRating = (data: any) => {
  //   let overallPercent = 0;
  //   if (Array.isArray(data)) {
  //     data.length > 0 &&
  //       data.filter((el) => {
  //         overallPercent = el?.percent
  //           ? +overallPercent + +el?.percent
  //           : +overallPercent + +el?.rating;
  //       });
  //   }
  //   return overallPercent ? +overallPercent / data.length : 0;
  // };

  // const formatDateAndTime = (text) => {
  //     // Define the regex pattern to match multi numbers in date and time format
  //     const dateRegex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;

  //     // Function to replace matched date and time with formatted date and time
  //     const replaceDateAndTime = (match, year, month, day, hour, minute, second) => {
  //       const months = [
  //         'January', 'February', 'March', 'April', 'May', 'June', 'July',
  //         'August', 'September', 'October', 'November', 'December'
  //       ];

  //       // Format the date and time as desired
  //       const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
  //       const formattedTime = `${parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour}:${minute} ${parseInt(hour, 10) >= 12 ? 'pm' : 'am'}`;

  //       // Return the formatted date and time
  //       return `${formattedDate} ${formattedTime}`;
  //     };

  //     // Replace occurrences of multi numbers in date and time format with formatted date and time
  //     return text?.replace(dateRegex, replaceDateAndTime);
  //   };

  useEffect(() => {
    setCardHeight(heightRef?.current?.offsetHeight);
  }, []);

  function removeDuplicates() {
    let count = 0;
    Object.keys(basicReportData).map((el) => {
      if (el === "skill_matrix") {
        basicReportData[el].sections.length > 0 &&
          basicReportData[el].sections.map((item) => {
            count =
              count +
              +basicReportData[el].overal_percent /
              basicReportData[el].sections.length;
          });
      } else if (Array.isArray(basicReportData[el])) {
        basicReportData[el].length > 0 &&
          basicReportData[el].map((it) => {
            count = it.percent
              ? count + +it.percent / basicReportData[el].length
              : count + +it.rating / basicReportData[el].length;
          });
      }
    });
    setCheck(count);
  }

  const normalizedTableData = (data: any, heading: any) => {
    let length = 0;
    return (
      data.length > 0 &&
      data.map((el, index) => {
        // let array: any = loopFunction(el)
        if (el?.suggestions?.covered?.length > length) {
          length = el?.suggestions?.covered?.length;
        } else if (el?.suggestions?.covered_partial?.length > length) {
          length = el?.suggestions?.covered_partial?.length;
        } else if (el?.suggestions?.covered_not_valid?.length > length) {
          length = el?.suggestions?.covered_not_valid?.length;
        }

        const { covered, covered_partial, covered_not_valid } = el?.suggestions;

        let coveredHeight;
        let coveredPartialHeight;
        let coveredNotValidHeight;

        if (covered && covered.length > 0)
          coveredHeight = covered
            .map((card: any) => card.length)
            .reduce((a, b) => a + b);

        if (covered_partial && covered_partial.length > 0)
          coveredPartialHeight = covered_partial
            .map((card: any) => card.length)
            .reduce((a, b) => a + b);

        if (covered_not_valid && covered_not_valid.length > 0)
          coveredNotValidHeight = covered_not_valid
            .map((card: any) => card.length)
            .reduce((a, b) => a + b);

        const maxNumber =
          Math.max(
            coveredHeight ? coveredHeight : 0,
            coveredPartialHeight ? coveredPartialHeight : 0,
            coveredNotValidHeight ? coveredNotValidHeight : 0
          ) + 100;

        return (
          <div className=" py-2">
            <div className="">
              <h5 className="text-black">{`${index + 1}.${el.question}`}</h5>
            </div>
            <div className="ml-2 pl-1 pb-3 text-black">
              {el?.expected_answer_key_points?.points &&
                el?.expected_answer_key_points?.points.length > 0 ? (
                <>
                  <h5 className="text-black text-uppercase">
                    Expected Key Points
                  </h5>
                  {el?.expected_answer_key_points?.points?.map((it) => {
                    return (
                      <>
                        <li
                          className=""
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          {it}
                        </li>
                      </>
                    );
                  })}
                </>
              ) : (
                <span className="text-muted font-weight-500">Not Answered</span>
              )}
            </div>
            {(el?.suggestions?.covered?.length > 0 ||
              el?.suggestions?.covered_partial?.length > 0 ||
              el?.suggestions?.covered_not_valid?.length > 0) && (
                <div className="ml-1 pb-2">
                  <h5 className="text-black text-uppercase ">Answer breakdown</h5>
                </div>
              )}
            <div className="mx-5">
              <div
                className="row p-0 ml--6 mr--7"
                style={{
                  zoom: "80%",
                }}
              >
                {(el?.suggestions?.covered?.length > 0 ||
                  el?.suggestions?.covered_partial?.length > 0 ||
                  el?.suggestions?.covered_not_valid?.length > 0) && (
                    <>
                      {el?.suggestions?.covered?.length > 0 && (
                        <div className="col-sm-4">
                          <Card
                            className="check"
                            style={{
                              height: maxNumber + "px",
                            }}
                          >
                            <CardHeader className="h3">Valid</CardHeader>
                            <CardBody>
                              <div>
                                {el?.suggestions?.covered?.length > 0 &&
                                  el?.suggestions?.covered?.map((items) => {
                                    return (
                                      <>
                                        <li>
                                          <span>{items}</span>
                                        </li>
                                      </>
                                    );
                                  })}
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      )}
                      {el?.suggestions?.covered_partial?.length > 0 && (
                        <div className="col-sm-4">
                          <Card
                            style={{
                              height: maxNumber + "px",
                            }}
                          >
                            <CardHeader className="h3">Partial</CardHeader>
                            <CardBody>
                              {el?.suggestions?.covered_partial?.length > 0 &&
                                el?.suggestions?.covered_partial?.map((items) => {
                                  return (
                                    <>
                                      <li>{items}</li>
                                    </>
                                  );
                                })}
                            </CardBody>
                          </Card>
                        </div>
                      )}
                      {el?.suggestions?.covered_not_valid?.length > 0 && (
                        <div className="col-sm-4">
                          <Card
                            style={{
                              height: maxNumber,
                            }}
                          >
                            <CardHeader className="h3">Invalid</CardHeader>
                            <CardBody>
                              {el?.suggestions?.covered_not_valid?.length > 0 &&
                                el?.suggestions?.covered_not_valid?.map(
                                  (items) => {
                                    return (
                                      <>
                                        <li>{items}</li>
                                      </>
                                    );
                                  }
                                )}
                            </CardBody>
                          </Card>
                        </div>
                      )}
                    </>
                  )}
              </div>
            </div>
          </div>
        );
      })
    );
  };

  const colorVariant = (percentage) => {
    if (percentage <= 20) {
      return "red";
    } else if (percentage <= 40) {
      return "orange";
    } else if (percentage <= 60) {
      return "#ebeb1b";
    } else if (percentage <= 80) {
      return "green";
    } else if (percentage <= 100) {
      return "#FFD700";
    }
  };

  // const handleButtonClick = (selectedOption) => {
  //   if (selectedOption.title === "Detailed Report") {
  //     // getBasicReportData("Detailed Report");
  //   } else {
  //     // getBasicReportData("");
  //   }

  //   // filter.onChange(selectedOption);
  // };

  let array = 0;

  // console.log("basicReportData===>", basicReportData);

  return (
    <> <div className="position-relative ml-sm-6">
      <div className="col-sm-3 position-absolute top-3 left-0 p-0">
        <DropDown
          // data={REPORT_TYPE}
          // value={reportType}
          // onChange={(e) => {
          //   setReportType(e.target.value);
          // }}
          // style={{ height: "44px", borderColor: "#727586" }}
          id={"status"}
          // heading={"Status"}
          data={REPORT_TYPE}
          selected={reportType.value}
          onChange={reportType.onChange}
        />
      </div>
    </div>
      <div
        className="row position-fixed bottom-0 right-0 m-sm-3 p-3"
        style={{
          zIndex: 1,
        }}
      >
        {/* <ButtonGroup
            size={"btn-sm"}
            sortData={FILTER}
            selected={filter.value}
            onClick={handleButtonClick}
          /> */}
        <div className="ml-3">
          {fileName && (
            <ReactToPrint
              documentTitle={fileName}
              trigger={() => (
                <Button
                  variant={"icon-rounded"}
                  color="info"
                  icons={"bi bi-printer-fill text-white fa-lg"}
                />
              )}
              content={() => componentRef.current}
            />
          )}
        </div>

      </div>
      {basicReportLoader.loader ? <div
        className={
          "vh-100 d-flex justify-content-center align-items-center"
        }
      >
        <Spinner />
      </div>
        : basicReportData ? (
          <div className="d-flex flex-column px-sm-6 px-3 py-3" ref={componentRef}>

            <div className="">

              <div className="position-relative ">
                {/* <div className="position-absolute top-2" style={{ width: '35mm', height: '45mm', overflow: 'hidden' }}>
                  <Image src={image.passportImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div> */}
                <div className="mt-5">
                  <div className="text-center">
                    <div className="">
                      <span
                        style={{ fontSize: 38 }}
                        className="font-weight-bolder text-secondary"
                      >
                        {basicReportData?.interview_meta_info?.name}
                      </span>
                    </div>
                    <div className="mt--2">
                      <span
                        className="font-weight-bolder text-secondary font-weight-600"
                        style={{ fontSize: 12 }}
                      >
                        {`${basicReportData.interview_meta_info?.role} - ${!basicReportData.interview_meta_info?.experience
                          ? "Fresher"
                          : basicReportData.interview_meta_info?.experience
                          } ${basicReportData.interview_meta_info?.experience > 1
                            ? "years"
                            : basicReportData.interview_meta_info?.experience === 1
                              ? "year"
                              : ""
                          }`}
                      </span>
                    </div>
                    <div>
                      <Badge
                        className="text-primary text-lowercase mt-1 font-weight-bolder px-4"
                        style={{
                          backgroundColor: "#ebe4ff",
                          borderRadius: 30,
                          fontSize: 12,
                          borderWidth: 0,
                        }}
                        text={`${basicReportData.interview_meta_info?.interview_duration} min Interview`}
                      />
                    </div>
                  </div>
                </div>
                <div className="position-absolute right-0 top-2 p-0">
                  <h1
                    className="font-weight-bolder text-right display-2"
                    style={{
                      color: colorVariant(basicReportData.candidate_score),
                    }}
                  >
                    {basicReportData.candidate_score}
                  </h1>
                </div>
              </div>
            </div>

            {reportType.value.id === "BR" ? (
              <div className="mt-md-6 p-0">
                <div className="mx-0 pb-0 mb--2 pt-5 pb-md-5">
                  <div className="row">
                    <div className="col-sm-3">
                      <Card
                        style={{
                          borderWidth: 1.5,
                          borderColor: "#e8edff",
                          backgroundColor: "transparent",
                        }}
                        className="p-3 text-center text-sm-left rounded-sm"
                      >
                        <div className="progress-wrapper col py-0 m-0 ">
                          <div className="h4 mb-0 pb-0 pt-2">
                            <span
                              className="font-weight-bolder text-secondary"
                              style={{ fontSize: 16 }}
                            >
                              {"Skill Matrix"}
                            </span>
                          </div>

                          <div className="mt--2">
                            <span
                              className={`font-weight-bold text-primary`}
                              style={{
                                fontSize: "36px",
                              }}
                            >
                              {basicReportData?.skill_matrix_overal_percent}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                    {basicReportData?.report_other_analytics &&
                      Object.keys(basicReportData?.report_other_analytics)?.map(
                        (heading) => {
                          return (<>
                            {typeof basicReportData?.report_other_analytics[heading] !== "number" ? <div>{''}</div>
                              : <div className="col-sm-3 ">
                                <Card
                                  style={{
                                    borderWidth: 1.5,
                                    borderColor: "#e8edff",
                                    backgroundColor: "transparent",
                                  }}
                                  className="p-3 text-center text-sm-left rounded-sm"
                                >
                                  <div className="progress-wrapper col py-0 m-0 ">
                                    <div className="h4 mb-0 pb-0 pt-2">
                                      {heading && <span
                                        className="font-weight-bolder text-secondary"
                                        style={{ fontSize: 16 }}
                                      >
                                        {capitalizeFirstLetter(heading)?.replace(
                                          "_",
                                          " "
                                        )}
                                      </span>}
                                    </div>

                                    <div className="mt--2">
                                      <span
                                        className={"text-secondary font-weight-bold"}
                                        style={{
                                          fontSize: "36px",
                                        }}
                                      >
                                        {`${basicReportData?.report_other_analytics[heading]} %`}
                                      </span>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            }
                          </>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 px-0">
                <Card
                  className="mx-lg-4 mb-7 p-5 rounded-sm"
                  style={{
                    borderWidth: 1.5,
                    borderColor: "#e8edff",
                    backgroundColor: "transparent",
                  }}
                >
                  <div className="row">
                    <div className="col-sm-3 px-1 text-center">
                      <div className="progress-wrapper col py-md-0 py-3 m-0">
                        <div className="">
                          <span
                            className="text-secondary font-weight-bolder"
                            style={{
                              fontSize: "36px",
                            }}
                          >
                            {`${basicReportData?.skill_matrix_overal_percent} %`}
                          </span>
                        </div>
                        <div className="h4 mb-0 pb-0 pt-2">
                          <span
                            className="font-weight-bolder text-secondary"
                            style={{ fontSize: 18 }}
                          >
                            {"Skill Matrix"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {basicReportData &&
                      basicReportData?.report_other_analytics &&
                      basicReportData?.report_other_analytics?.hlv_r &&
                      Object.keys(
                        basicReportData?.report_other_analytics?.hlv_r
                      )?.map((heading) => {
                        return (
                          <>
                            <div className="col-sm-3 px-1 text-center">
                              <div className="progress-wrapper col py-md-0 py-3 m-0">
                                <div className="">
                                  <span
                                    className="text-secondary font-weight-bolder"
                                    style={{
                                      fontSize: "36px",
                                    }}
                                  >
                                    {`${basicReportData.report_other_analytics.hlv_r[heading]} %`}
                                  </span>
                                </div>
                                <div className="h4 mb-0 pb-0 pt-2">
                                  <span
                                    className="font-weight-bolder text-secondary"
                                    style={{ fontSize: 18 }}
                                  >
                                    {capitalizeFirstLetter(heading).replace("_", " ")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </Card>
              </div>
            )}

            <div className="mt-3 px-0">
              <div>
                <span
                  className="font-weight-bolder text-secondary "
                  style={{ fontSize: 26 }}
                >
                  {"Job Description Key Areas"}
                </span>
              </div>

              <div>
                <div className="" style={{ paddingTop: 30 }}>
                  <div>
                    {basicReportData &&
                      Object.keys(basicReportData).map((item) => {
                        return (
                          <div>
                            {item === "skill_matrix" &&
                              basicReportData?.skill_matrix?.sections &&
                              basicReportData?.skill_matrix?.sections.map(
                                (skill) => {
                                  return (
                                    <Card
                                      className="py-4 px-4 font-weight-bolder text-secondary rounded-sm"
                                      style={{
                                        borderWidth: 1.5,
                                        borderColor: "#e8edff",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <span
                                          className="text-secondary"
                                          style={{ fontSize: 16 }}
                                        >
                                          {skill.name}
                                        </span>
                                        <span
                                          className="text-secondary"
                                          style={{ fontSize: 16 }}
                                        >
                                          {skill.rating}
                                        </span>
                                      </div>
                                    </Card>
                                  );
                                }
                              )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {reportType.value.id === "DR" && (
                <>
                  <div className="pt-5 text-secondary d-flex justify-content-between align-items-center font-weight-bolder">
                    <span style={{ fontSize: 26 }}>{"Skill Matrix Report"}</span>
                    <span
                      style={{ fontSize: 36 }}
                    >{`${basicReportData.skill_matrix_overal_percent}%`}</span>
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <div>
                      <div>
                        <span className="font-weight-bolder">{"Note"}</span>
                      </div>
                      <div className="">
                        {NOTE.map((item) => {
                          return (
                            <>
                              <div>
                                <Image src={item.icon} height={20} />
                                <span
                                  style={{ fontSize: 14 }}
                                  className="text-default ml-2 font-weight-500"
                                >
                                  {item.text}
                                </span>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="">
                    {basicReportData &&
                      basicReportData?.skill_matrix &&
                      basicReportData.skill_matrix?.sections.length > 0 &&
                      basicReportData.skill_matrix.sections.map((skill: any) => {
                        return (
                          <div className="mt-5">
                            <Card
                              className="p-4"
                              style={{
                                borderWidth: 1.5,
                                borderColor: "#e8edff",
                                backgroundColor: "transparent",
                              }}
                            >
                              <>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <div>
                                      <h2
                                        className="text-secondary font-weight-bolder"

                                      >
                                        {skill.name}
                                      </h2>
                                    </div>
                                  </div>
                                  <h2
                                    className="text-secondary font-weight-bolder"
                                  >
                                    {skill.rating}
                                  </h2>
                                </div>

                                <div>
                                  {skill?.questions &&
                                    skill?.questions.length > 0 &&
                                    skill?.questions.map((que: any) => {
                                      return (
                                        <>
                                          <div className="mt-3">
                                            <b
                                              className="text-secondary font-weight-500"

                                            >
                                              {que.question}
                                            </b>
                                          </div>

                                          <div className="mt-3">
                                            {que?.suggestions &&
                                              que.suggestions?.covered &&
                                              que.suggestions?.covered.length > 0 &&
                                              que.suggestions.covered.map(
                                                (ans: any) => {
                                                  return (
                                                    <div>
                                                      <Image
                                                        src={icons.check}
                                                        height={20}
                                                      />
                                                      <small className="text-default ml-2 font-weight-500">
                                                        {ans}
                                                      </small>
                                                    </div>
                                                  );
                                                }
                                              )}

                                            {que?.suggestions &&
                                              que.suggestions?.covered_partial &&
                                              que.suggestions?.covered_partial
                                                .length > 0 &&
                                              que.suggestions.covered_partial.map(
                                                (ans: any) => {
                                                  return (
                                                    <div>
                                                      <Image
                                                        src={icons.checkBlack}
                                                        height={20}
                                                      />
                                                      <small className="text-default ml-2 font-weight-500">
                                                        {ans}
                                                      </small>
                                                    </div>
                                                  );
                                                }
                                              )}

                                            {que?.suggestions &&
                                              que.suggestions?.covered_not_valid &&
                                              que.suggestions?.covered_not_valid
                                                .length > 0 &&
                                              que.suggestions.covered_not_valid.map(
                                                (ans: any) => {
                                                  return (
                                                    <div>
                                                      <Image
                                                        src={icons.frame}
                                                        height={20}
                                                      />
                                                      <small className="text-default ml-2 font-weight-500">
                                                        {ans}
                                                      </small>
                                                    </div>
                                                  );
                                                }
                                              )}

                                            {que.suggestions?.covered_not_valid
                                              .length === 0 &&
                                              que.suggestions?.covered.length ===
                                              0 &&
                                              que.suggestions?.covered_partial
                                                .length === 0 && (
                                                <div>
                                                  <Image
                                                    src={icons.frame}
                                                    height={20}
                                                  />
                                                  <small className="text-default ml-2 font-weight-500">
                                                    {"Not Answered"}
                                                  </small>
                                                </div>
                                              )}
                                          </div>
                                        </>
                                      );
                                    })}
                                </div>
                              </>
                            </Card>
                          </div>
                        );
                      })}
                  </div>

                  {basicReportData &&
                    basicReportData?.report_other_analytics &&
                    basicReportData.report_other_analytics?.llv_r &&
                    basicReportData.report_other_analytics?.hlv_r &&
                    Object.keys(basicReportData.report_other_analytics?.hlv_r).map(
                      (heading) => {
                        return (
                          <>
                            <div className="pt-5 text-secondary d-flex justify-content-between align-items-center font-weight-bolder">
                              <span style={{ fontSize: 26 }}>
                                {capitalizeFirstLetter(heading).replace("_", " ")}
                              </span>
                              <span style={{ fontSize: 36 }}>
                                {`${basicReportData.report_other_analytics.hlv_r[heading]} %`}
                              </span>
                            </div>

                            <div>
                              <div className="" style={{ paddingTop: 20 }}>
                                <div>
                                  {basicReportData.report_other_analytics.llv_r[
                                    heading
                                  ] &&
                                    basicReportData.report_other_analytics.llv_r[
                                      heading
                                    ].map((item) => {
                                      return (
                                        <div>
                                          <Card
                                            className="p-4"
                                            style={{
                                              borderWidth: 1.5,
                                              borderColor: "#e8edff",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <div className="d-flex justify-content-between align-items-start">
                                              <div>
                                                <div>
                                                  <span
                                                    className="text-secondary font-weight-bolder"
                                                    style={{ fontSize: 16 }}
                                                  >
                                                    {item.metrics_name}
                                                  </span>
                                                </div>
                                                <span
                                                  className="text-default"
                                                  style={{ fontSize: 14 }}
                                                >
                                                  {item.description}
                                                </span>
                                              </div>
                                              <div>
                                                <span
                                                  className="text-secondary font-weight-bolder"
                                                  style={{ fontSize: 16 }}
                                                >
                                                  {item.rating}
                                                </span>
                                              </div>
                                            </div>
                                          </Card>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    )}
                </>
              )}
            </div>
            <div className="d-flex justify-content-end mt-5 mb-6">
              <a href={'https://www.intrvu.space'} target="_blank" rel="noreferrer">
                <Image src={icons.poweredBy} height={40} />
              </a>
            </div>
          </div>) :
          (
            <div
              className={
                "d-flex h-100vh justify-content-center align-items-center mx-auto"
              }
            >
              <NoDataFound />
            </div>
          )
      }
    </>
  );
}

export { Report };
