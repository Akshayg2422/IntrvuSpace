import { icons, image } from "@Assets";
import {
  Badge,
  Button,
  ButtonGroup,
  CommonTable,
  Divider,
  DropDownIcon,
  Image,
  Spinner,
} from "@Components";
import { useDropDown, useLoader } from "@Hooks";
import { fetchBasicReport } from "@Redux";
import { color } from "@Themes";
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
  { id: 1, icon: "success", text: "Completely Covered" },
  { id: 2, icon: "primary", text: "Partially Covered" },
  { id: 3, icon: "warning", text: "Covered by invalid" },
];

const REPORT_TYPE = [
  { id: "Basic Report", name: "Basic Report", value: "Basic Report" },
  { id: "Detailed Report", name: "Detailed Report", value: "Detailed Report" },
];

function Report() {
  // const FILTER = [
  //   { id: 1, title: "Basic Report" },
  //   { id: 2, title: "Detailed Report" },
  // ];

  const { schedule_id } = useParams();

  const dispatch = useDispatch();

  const [dataId, setDataId] = useState<any>([
    "trait",
    "communication",
    "skill_matrix",
  ]);

  const [basicReportData, setBasicReportData] = useState<any>([]);
  // const filter = useDropDown(FILTER[0]);

  const componentRef = useRef(null);
  let basicReportLoader = useLoader(false);
  const [check, setCheck] = useState<any>(0);
  const heightRef = useRef<any>();
  const [cardHeight, setCardHeight] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>({});
  const [fileName, setFileName] = useState("");
  const [reportType, setReportType] = useState(REPORT_TYPE[0].id);

  console.log("reportType", reportType);

  useEffect(() => {
    getBasicReportData("");
  }, []);

  useEffect(() => {
    if (basicReportData) {
      removeDuplicates();
    }
  }, [basicReportData]);

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

  const getBasicReportData = (details) => {
    basicReportLoader.show();
    const params = {
      schedule_id: schedule_id,
      ...(details === "Detailed Report" && { is_detailed: true }),
    };

    dispatch(
      fetchBasicReport({
        params,
        onSuccess: (success) => () => {
          basicReportLoader.hide();
          console.log("success===>", success.details);
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

          console.log(communication, "communication data");
          console.log(skill_matrix, "skill_matrix data");
          console.log(trait, "trait data");

          const communicationPercentage =
            communication?.length > 0
              ? parseFloat(
                  (
                    (getPercentage(communication, "rating") / 100) *
                    overall_weightage.communication
                  ).toFixed(1)
                )
              : 0;
          const skillMatrixPercentage =
            skill_matrix?.sections?.length > 0
              ? parseFloat(
                  (
                    (getPercentage(skill_matrix?.sections, "rating") / 100) *
                    overall_weightage.skill_matrix
                  ).toFixed(1)
                )
              : 0;
          const traitPercentage =
            trait.length > 0
              ? parseFloat(
                  (
                    (getPercentage(trait, "percent") / 100) *
                    overall_weightage.trait
                  ).toFixed(1)
                )
              : 0;

          console.log(
            communicationPercentage,
            "communicationPercentage=========="
          );
          console.log(skillMatrixPercentage, "communicationPercentage======");
          console.log(traitPercentage, "communicationPercentage===");

          const total = (
            communicationPercentage +
            skillMatrixPercentage +
            traitPercentage
          ).toFixed(1);
          console.log("total0===================>", total);

          setPercentage({
            communication: communicationPercentage,
            skillMatrix: skillMatrixPercentage,
            trait: traitPercentage,
            communicationOverAll:
              communication?.length > 0
                ? parseFloat(getPercentage(communication, "rating").toFixed(1))
                : 0,
            skillMatrixOverAll: "",
            traitOverAll:
              trait.length > 0
                ? parseFloat(getPercentage(trait, "percent").toFixed(1))
                : 0,
            overAll: parseFloat(total),
          });
        },
        onError: (error) => () => {
          basicReportLoader.hide();
        },
      })
    );
  };

  const calculateRating = (data: any) => {
    let overallPercent = 0;
    if (Array.isArray(data)) {
      data.length > 0 &&
        data.filter((el) => {
          overallPercent = el?.percent
            ? +overallPercent + +el?.percent
            : +overallPercent + +el?.rating;
        });
    }
    return overallPercent ? +overallPercent / data.length : 0;
  };

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

  console.log("cardheight", cardHeight);

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
                                  console.log("9090909e333333333333", items);
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

  const handleButtonClick = (selectedOption) => {
    if (selectedOption.title === "Detailed Report") {
      getBasicReportData("Detailed Report");
    } else {
      getBasicReportData("");
    }

    // filter.onChange(selectedOption);
  };

  let array = 0;

  console.log("basicReportData===>", basicReportData);

  return (
    <>
      <div className="d-flex flex-column position-relative bg-white">
        <div
          className="row position-fixed bottom-0 right-0 m-3 p-3"
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

        <div className="col-sm-3 position-absolute top-5 left-2">
          <DropDownIcon
            data={REPORT_TYPE}
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
            }}
          />
        </div>

        <div className="" ref={componentRef}>
          <div>
            <div className="mt-5">
              <div className="text-center">
                <div className="">
                  <span
                    style={{ fontSize: 36 }}
                    className="font-weight-bolder text-secondary"
                  >
                    {basicReportData.name}
                  </span>
                </div>
                <div className="mt--2">
                  <span
                    className="font-weight-bolder text-secondary"
                    style={{ fontSize: 16 }}
                  >
                    {"Senior Vue JS Developer -  2 years"}
                  </span>
                </div>
                <div>
                  <Badge
                    className="text-primary text-lowercase mt-1"
                    style={{
                      backgroundColor: "#ebe4ff",
                      borderRadius: 30,
                      fontSize: 11,
                      borderWidth: 0,
                    }}
                    text={"30 min Interview"}
                  />
                </div>
              </div>
            </div>

            <div className="position-absolute right-5 top-5">
              <h1
                className="font-weight-bolder text-right display-2"
                style={{
                  color: colorVariant(+percentage?.overAll),
                }}
              >
                {percentage?.overAll}
              </h1>
            </div>
          </div>

          {reportType === "Basic Report" ? (
            <div className="mt-md-6 pr-md-5">
              <div className="mx-md-4 mx-0 pb-0 mb--2 pt-5 pb-md-5">
                <div className="row">
                  {basicReportData &&
                    Object.keys(basicReportData)
                      .reverse()
                      ?.map((heading) => {
                        return dataId.map((el) => {
                          if (heading === el) {
                            return (
                              <div className="col-sm-4 mx-3 mx-md-0 mb-md-4 mb-0">
                                <Card
                                  style={{
                                    borderWidth: 1.5,
                                    borderColor: "#e8edff",
                                    backgroundColor: "transparent",
                                  }}
                                  className="p-2 text-center text-sm-left"
                                >
                                  <div className="progress-wrapper col py-0 m-0 ">
                                    <div className="h4 mb-0 pb-0 pt-2">
                                      <span
                                        className="font-weight-bolder text-secondary"
                                        style={{ fontSize: 16 }}
                                      >
                                        {heading === "skill_matrix"
                                          ? "Skill Matrix"
                                          : heading === "communication"
                                          ? "Communication"
                                          : heading === "trait"
                                          ? "Trait"
                                          : heading}
                                      </span>
                                    </div>

                                    <div className="mt--2">
                                      <span
                                        className={`${
                                          heading === "skill_matrix"
                                            ? "text-primary"
                                            : "text-secondary"
                                        } font-weight-bold`}
                                        style={{
                                          fontSize: "36px",
                                        }}
                                      >
                                        {heading === "skill_matrix"
                                          ? +basicReportData[
                                              heading
                                            ].overal_percent.toFixed(1)
                                          : heading === "communication"
                                          ? percentage?.communicationOverAll
                                          : percentage?.traitOverAll}
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            );
                          }
                          console.log("879868768768");
                        });
                      })}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 px-5">
              <Card
                className="mx-lg-4 pb-0 mb--2 pt-5 pb-5"
                style={{
                  borderWidth: 1.5,
                  borderColor: "#e8edff",
                  backgroundColor: "transparent",
                }}
              >
                <div className="row">
                  {basicReportData &&
                    Object.keys(basicReportData)
                      .reverse()
                      ?.map((heading) => {
                        return dataId.map((el) => {
                          if (heading === el) {
                            return (
                              <>
                                <div className="col-sm-4 px-1 text-center">
                                  <div className="progress-wrapper col py-md-0 py-3 m-0">
                                    <div className="">
                                      <span
                                        className="text-secondary font-weight-bold"
                                        style={{
                                          fontSize: "36px",
                                        }}
                                      >
                                        {heading === "skill_matrix"
                                          ? +basicReportData[
                                              heading
                                            ].overal_percent.toFixed(1)
                                          : heading === "communication"
                                          ? percentage?.communicationOverAll
                                          : percentage?.traitOverAll}
                                        %
                                      </span>
                                    </div>
                                    <div className="h4 mb-0 pb-0 pt-2">
                                      <span
                                        className="font-weight-bolder text-secondary"
                                        style={{ fontSize: 16 }}
                                      >
                                        {heading === "skill_matrix"
                                          ? "Skill Matrix"
                                          : heading === "communication"
                                          ? "Communication"
                                          : heading === "trait"
                                          ? "Trait"
                                          : heading}
                                      </span>
                                    </div>
                                    <div className="pt-2">
                                      {PERFORMANCE_CONTENT.map((content) => {
                                        if (content.topic === heading)
                                          return (
                                            <span
                                              className="text-default"
                                              style={{ fontSize: 16 }}
                                            >
                                              {content.subText}
                                            </span>
                                          );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          }
                        });
                      })}
                </div>
              </Card>
            </div>
          )}

          <div className="mt-6 px-md-5 px-3">
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
                                    className="pt-3 pb-3 px-3 font-weight-bolder text-secondary"
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

            {reportType === "Detailed Report" && (
              <>
                <div className="pt-5 text-secondary d-flex justify-content-between font-weight-bolder">
                  <span style={{ fontSize: 26 }}>{"Skill Matrix Report"}</span>
                  <span
                    style={{ fontSize: 36 }}
                  >{`${basicReportData?.skill_matrix?.overal_percent}%`}</span>
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
                              <Image src={icons.check} height={20} />
                              <span
                                style={{ fontSize: 14 }}
                                className="text-default ml-2"
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
                            className="p-3"
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
                                    <span
                                      className="text-secondary font-weight-bolder"
                                      style={{ fontSize: 16 }}
                                    >
                                      {skill.name}
                                    </span>
                                  </div>
                                </div>
                                <span
                                  className="text-secondary font-weight-bolder"
                                  style={{ fontSize: 16 }}
                                >
                                  {skill.rating}
                                </span>
                              </div>

                              <div>
                                {skill?.questions &&
                                  skill?.questions.length > 0 &&
                                  skill?.questions.map((que) => {
                                    return (
                                      <>
                                        <div className="mt-3">
                                          <span
                                            className="text-secondary"
                                            style={{ fontSize: 16 }}
                                          >
                                            {que.question}
                                          </span>
                                        </div>

                                        <div className="mt-3">
                                          {que?.expected_answer_key_points &&
                                          que.expected_answer_key_points
                                            ?.points &&
                                          que.expected_answer_key_points?.points
                                            .length > 0 ? (
                                            que.expected_answer_key_points?.points.map(
                                              (ans: any) => {
                                                let index = ans.indexOf("-");
                                                if (index < 0) {
                                                  ans = ans;
                                                } else {
                                                  ans = ans.slice(2);
                                                }
                                                return (
                                                  <div>
                                                    <Image
                                                      src={icons.check}
                                                      height={20}
                                                    />
                                                    <span className="text-default ml-1">
                                                      {ans}
                                                    </span>
                                                  </div>
                                                );
                                              }
                                            )
                                          ) : (
                                            <div>
                                              <span className="text-default">
                                                {"Not Answered"}
                                              </span>
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

                <div className="pt-5 text-secondary d-flex justify-content-between font-weight-bolder">
                  <span style={{ fontSize: 26 }}>{"Communication"}</span>
                  <span style={{ fontSize: 36 }}>{"26%"}</span>
                </div>

                <div>
                  <div className="" style={{ paddingTop: 20 }}>
                    <div>
                      {basicReportData &&
                        Object.keys(basicReportData).map((item) => {
                          return (
                            <div>
                              {item === "communication" &&
                                basicReportData?.communication &&
                                basicReportData?.communication.length > 0 &&
                                basicReportData?.communication.map(
                                  (com: any) => {
                                    return (
                                      <Card
                                        className="pt-3 pb-3 px-3"
                                        style={{
                                          borderWidth: 1.5,
                                          borderColor: "#e8edff",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <div className="d-flex justify-content-between">
                                          <div>
                                            <div>
                                              <span
                                                className="text-secondary font-weight-bolder"
                                                style={{ fontSize: 16 }}
                                              >
                                                {com.metrics_name}
                                              </span>
                                            </div>
                                            <span
                                              className="text-default"
                                              style={{ fontSize: 14 }}
                                            >
                                              {com.description}
                                            </span>
                                          </div>
                                          <span
                                            className="text-secondary font-weight-bolder"
                                            style={{ fontSize: 16 }}
                                          >
                                            {com.rating}
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

                <div className="pt-5 text-secondary d-flex justify-content-between font-weight-bolder">
                  <span style={{ fontSize: 26 }}>{"Personality Trait"}</span>
                  <span style={{ fontSize: 36 }}>{"36%"}</span>
                </div>

                <div>
                  <div className="" style={{ paddingTop: 20 }}>
                    <div>
                      {basicReportData &&
                        Object.keys(basicReportData).map((item) => {
                          return (
                            <div>
                              {item === "trait" &&
                                basicReportData?.trait &&
                                basicReportData?.trait.length > 0 &&
                                basicReportData?.trait.map((el: any) => {
                                  return (
                                    <Card
                                      className="pt-3 pb-3 px-3"
                                      style={{
                                        borderWidth: 1.5,
                                        borderColor: "#e8edff",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <div>
                                          <div>
                                            <span
                                              className="text-secondary font-weight-bolder"
                                              style={{ fontSize: 16 }}
                                            >
                                              {el.trait}
                                            </span>
                                          </div>
                                          <span
                                            className="text-default"
                                            style={{ fontSize: 14 }}
                                          >
                                            {el.reason}
                                          </span>
                                        </div>
                                        <span
                                          className="text-secondary font-weight-bolder"
                                          style={{ fontSize: 16 }}
                                        >
                                          {el.percent}
                                        </span>
                                      </div>
                                    </Card>
                                  );
                                })}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="row justify-content-end mt-5 mr-4 mb-6">
            <Image src={icons.poweredBy} height={40} />
          </div>
        </div>
      </div>
    </>
  );
}

export { Report };
