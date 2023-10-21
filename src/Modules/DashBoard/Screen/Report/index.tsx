import { icons, image } from "@Assets";
import {
  Badge,
  Button,
  ButtonGroup,
  CommonTable,
  Divider,
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

function Report() {
  const FILTER = [
    { id: 1, title: "Basic Report" },
    { id: 2, title: "Detailed Report" },
  ];

  const { schedule_id } = useParams();

  const dispatch = useDispatch();

  const [dataId, setDataId] = useState<any>([
    "trait",
    "communication",
    "skill_matrix",
  ]);

  const [basicReportData, setBasicReportData] = useState<any>([]);
  const filter = useDropDown(FILTER[0]);

  const componentRef = useRef(null);
  let basicReportLoader = useLoader(false);
  const [check, setCheck] = useState<any>(0);
  const heightRef = useRef<any>();
  const [cardHeight, setCardHeight] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>({});
  const [fileName, setFileName] = useState("");

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
          setFileName(name + "_" + sub_text + "_" + filter?.value.title);

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

    filter.onChange(selectedOption);
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
          <ButtonGroup
            size={"btn-sm"}
            sortData={FILTER}
            selected={filter.value}
            onClick={handleButtonClick}
          />
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

        <div className="" ref={componentRef}>
          <div>
            <div className="mt-5">
              <div className="text-center">
                <div className="">
                  <span
                    style={{ fontSize: 30 }}
                    className="font-weight-bolder text-secondary"
                  >
                    {basicReportData.name}
                  </span>
                </div>
                <div className="mt--2">
                  <span
                    className="font-weight-bolder text-secondary"
                    style={{ fontSize: 10 }}
                  >
                    {"Senior Vue JS Developer -  2 years"}
                  </span>
                </div>
                <div>
                  <Badge
                    className="text-primary text-lowercase"
                    style={{
                      backgroundColor: "#ebe4ff",
                      borderRadius: 30,
                      fontSize: 10,
                      borderWidth: 0,
                    }}
                    text={"30 min Interview"}
                  />
                </div>
              </div>
            </div>

            <div className="position-absolute right-5 top-5">
              {/** for small screen */}
              <h1
                className="font-weight-bolder text-right display-3"
                style={{
                  color: colorVariant(+percentage?.overAll),
                }}
              >
                {percentage?.overAll}
              </h1>
            </div>
          </div>

          <div className="pt-6 px-5">
            <Card
              className="mx-lg-4 pb-0 mb--2 pt-5 pb-5"
              style={{
                borderWidth: 1.5,
                borderColor: "#e8edff",
                backgroundColor: "transparent",
              }}
            >
              <div className="d-flex">
                {basicReportData &&
                  Object.keys(basicReportData)
                    .reverse()
                    ?.map((heading) => {
                      return dataId.map((el) => {
                        if (heading === el) {
                          return (
                            <>
                              <div className="col-sm-4 px-1 text-center">
                                <div className="progress-wrapper col py-0 m-0 ">
                                  <div className="">
                                    <span
                                      className="text-secondary font-weight-bold"
                                      style={{
                                        fontSize: "30px",
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
                                    <h4 className="font-weight-bolder text-secondary">
                                      {heading === "skill_matrix"
                                        ? "Skill Matrix"
                                        : heading === "communication"
                                        ? "Communication"
                                        : heading === "trait"
                                        ? "Trait"
                                        : heading}
                                    </h4>
                                  </div>
                                  <div>
                                    {PERFORMANCE_CONTENT.map((content) => {
                                      return (
                                        <>
                                          {content.topic === el && (
                                            <div className="">
                                              <span
                                                className="text-default"
                                                style={{ fontSize: 14 }}
                                              >
                                                {content.subText}
                                              </span>
                                            </div>
                                          )}
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        }
                        console.log("879868768768");
                      });
                    })}
              </div>
            </Card>
          </div>

          <div className="pt-6 px-5">
            <div>
              <span
                className="font-weight-bolder text-secondary "
                style={{ fontSize: 20 }}
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
                                      <span>{skill.name}</span>
                                      <span>{skill.rating}</span>
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
          </div>
          <div
            className="row justify-content-end mt-5 mr-4 mb-6"
          >
            <Image src={icons.poweredBy} height={40} />
          </div>
        </div>
      </div>
    </>
  );
}

export { Report };
