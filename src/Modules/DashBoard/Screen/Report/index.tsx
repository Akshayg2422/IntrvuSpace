import { icons } from "@Assets";
import {
  Badge,
  Button,
  DropDown,
  Image,
  NoDataFound,
  Spinner
} from "@Components";
import { useDropDown, useLoader } from "@Hooks";
import { fetchBasicReport } from "@Redux";
import { capitalizeFirstLetter } from "@Utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Card } from "reactstrap";
import { ReportHeader, BasicReport } from '@Modules'




function Report() {

  const dispatch = useDispatch();


  const { schedule_id } = useParams();

  const REPORT_TYPE = [
    { id: "BR", text: "Basic Report" },
    { id: "DR", text: "Detailed Report" },
  ];

  const NOTE = [
    { id: 1, icon: icons.check, text: "Completely Covered" },
    { id: 2, icon: icons.checkBlack, text: "Partially Covered" },
    { id: 3, icon: icons.frame, text: "Covered by invalid" },
  ];


  const loader = useLoader(false);
  const [report, setReport] = useState<any>(undefined);


  const componentRef = useRef(null);


  const [fileName, setFileName] = useState("");
  const reportType = useDropDown(REPORT_TYPE[0]);



  useEffect(() => {
    getReportApiHandler();
  }, [reportType.value.id]);


  const getReportApiHandler = () => {
    loader.show();
    const params = {
      schedule_id: schedule_id,
      ...(reportType.value.id === 'DR' && { is_detailed: true }),
    };

    dispatch(
      fetchBasicReport({
        params,
        onSuccess: (response: any) => () => {
          loader.hide();
          setReport(response.details);
          const {
            name,
            sub_text,
          } = response.details;
          setFileName(name + "_" + sub_text + "_" + reportType)
        },
        onError: (error: any) => () => {
          loader.hide();
          console.log(error, "error");
        },
      })
    );
  };

  const colorVariant = (percentage: any) => {
    if (percentage <= 20) return "red";
    if (percentage <= 40) return "orange";
    if (percentage <= 60) return "#ebeb1b";
    if (percentage <= 80) return "green";
    return "#FFD700";
  };


  return (
    <div className={'screen'}>
      {/* <div className="position-relative ml-sm-6">
        <div className="col-sm-3 position-absolute top-3 left-0 p-0">
          <DropDown
            id={"status"}
            data={REPORT_TYPE}
            selected={reportType.value}
            onChange={reportType.onChange}
          />
        </div>
      </div> */}
      {/* <div
        className="row position-fixed bottom-0 right-0 m-sm-3 p-3"
        style={{
          zIndex: 1,
        }}
      >
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

      </div> */}

      {
        loader.loader && <div className={'loader-container'}> <Spinner /></div>
      }
      {
        <>
          <ReportHeader details={report} />
          <BasicReport />
        </>
      }
      {/* {loader.loader ? <div
        className={
          "vh-100 d-flex justify-content-center align-items-center"
        }
      >
        <Spinner />
      </div>
        : report ? (
          <div className="d-flex flex-column px-sm-6 px-3 py-3" ref={componentRef}>
            <div className="">
              <div className="position-relative ">
                <div className="mt-5">
                  <div className="text-center">
                    <div className="">
                      <span
                        style={{ fontSize: 38 }}
                        className="font-weight-bolder text-secondary"
                      >
                        {report?.interview_meta_info?.name}
                      </span>
                    </div>
                    <div className="mt--2">
                      <span
                        className="font-weight-bolder text-secondary font-weight-600"
                        style={{ fontSize: 12 }}
                      >
                        {`${report.interview_meta_info?.role} - ${!report.interview_meta_info?.experience
                          ? "Fresher"
                          : report.interview_meta_info?.experience
                          } ${report.interview_meta_info?.experience > 1
                            ? "years"
                            : report.interview_meta_info?.experience === 1
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
                        text={`${report.interview_meta_info?.interview_duration} min Interview`}
                      />
                    </div>
                  </div>
                </div>
                <div className="position-absolute right-0 top-2 p-0">
                  <h1
                    className="font-weight-bolder text-right display-2"
                    style={{
                      color: colorVariant(report.candidate_score),
                    }}
                  >
                    {report.candidate_score}
                  </h1>
                </div>
              </div>
            </div>

            <ReportHeader />

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
                              {report?.skill_matrix_overal_percent}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                    {report?.report_other_analytics &&
                      Object.keys(report?.report_other_analytics)?.map(
                        (heading) => {
                          return (<>
                            {typeof report?.report_other_analytics[heading] !== "number" ? <div>{''}</div>
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
                                        {`${report?.report_other_analytics[heading]} %`}
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
                            {`${report?.skill_matrix_overal_percent} %`}
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
                    {report &&
                      report?.report_other_analytics &&
                      report?.report_other_analytics?.hlv_r &&
                      Object.keys(
                        report?.report_other_analytics?.hlv_r
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
                                    {`${report.report_other_analytics.hlv_r[heading]} %`}
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
                    {report &&
                      Object.keys(report).map((item) => {
                        return (
                          <div>
                            {item === "skill_matrix" &&
                              report?.skill_matrix?.sections &&
                              report?.skill_matrix?.sections.map(
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
                    >{`${report.skill_matrix_overal_percent}%`}</span>
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
                    {report &&
                      report?.skill_matrix &&
                      report.skill_matrix?.sections.length > 0 &&
                      report.skill_matrix.sections.map((skill: any) => {
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

                  {report &&
                    report?.report_other_analytics &&
                    report.report_other_analytics?.llv_r &&
                    report.report_other_analytics?.hlv_r &&
                    Object.keys(report.report_other_analytics?.hlv_r).map(
                      (heading) => {
                        return (
                          <>
                            <div className="pt-5 text-secondary d-flex justify-content-between align-items-center font-weight-bolder">
                              <span style={{ fontSize: 26 }}>
                                {capitalizeFirstLetter(heading).replace("_", " ")}
                              </span>
                              <span style={{ fontSize: 36 }}>
                                {`${report.report_other_analytics.hlv_r[heading]} %`}
                              </span>
                            </div>

                            <div>
                              <div className="" style={{ paddingTop: 20 }}>
                                <div>
                                  {report.report_other_analytics.llv_r[
                                    heading
                                  ] &&
                                    report.report_other_analytics.llv_r[
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
      } */}
    </div>
  );
}

export { Report };
