import { icons } from "@Assets";
import { Card, Image } from "@Components";
import { capitalizeFirstLetter } from "@Utils";

const NOTE = [
    { id: 1, icon: icons.check, text: "Completely Covered" },
    { id: 2, icon: icons.checkBlack, text: "Partially Covered" },
    { id: 3, icon: icons.frame, text: "Covered by invalid" },
  ];

const DetailedReport = ({reportData}) => {
return (
    <>
                <div className="pt-5 text-secondary d-flex justify-content-between align-items-center font-weight-bolder">
                  <span style={{ fontSize: 26 }}>{"Skill Matrix Report"}</span>
                  <span
                    style={{ fontSize: 36 }}
                  >{`${reportData.skill_matrix_overal_percent}%`}</span>
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
                  {reportData &&
                    reportData?.skill_matrix &&
                    reportData.skill_matrix?.sections.length > 0 &&
                    reportData.skill_matrix.sections.map((skill: any) => {
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
                                    <h2 className="text-secondary font-weight-bolder">
                                      {skill.name}
                                    </h2>
                                  </div>
                                </div>
                                <h2 className="text-secondary font-weight-bolder">
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
                                          <b className="text-secondary font-weight-500">
                                            {que.question}
                                          </b>
                                        </div>

                                        <div className="mt-3">
                                          {que?.suggestions &&
                                            que.suggestions?.covered &&
                                            que.suggestions?.covered.length >
                                              0 &&
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
                                            que.suggestions
                                              ?.covered_not_valid &&
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

                {reportData &&
                  reportData?.report_other_analytics &&
                  reportData.report_other_analytics?.llv_r &&
                  reportData.report_other_analytics?.hlv_r &&
                  Object.keys(
                    reportData.report_other_analytics?.hlv_r
                  ).map((heading) => {
                    return (
                      <>
                        <div className="pt-5 text-secondary d-flex justify-content-between align-items-center font-weight-bolder">
                          <span style={{ fontSize: 26 }}>
                            {capitalizeFirstLetter(heading).replace("_", " ")}
                          </span>
                          <span style={{ fontSize: 36 }}>
                            {`${reportData.report_other_analytics.hlv_r[heading]} %`}
                          </span>
                        </div>

                        <div>
                          <div className="" style={{ paddingTop: 20 }}>
                            <div>
                              {reportData.report_other_analytics.llv_r[
                                heading
                              ] &&
                              reportData.report_other_analytics.llv_r[
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
                  })}
              </>
)
}

export {DetailedReport}