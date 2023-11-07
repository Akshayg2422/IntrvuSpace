import { Card } from "@Components";
import { capitalizeFirstLetter } from "@Utils";

const BasicReportMatrixCard = ({reportData}) => {
    return (
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
                            {reportData?.skill_matrix_overal_percent}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                  {reportData?.report_other_analytics &&
                    Object.keys(reportData?.report_other_analytics)?.map(
                      (heading) => {
                        return (
                          <>
                            {typeof reportData?.report_other_analytics[
                              heading
                            ] !== "number" ? (
                              <div>{""}</div>
                            ) : (
                              <div className="col-sm-3 ">
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
                                      {heading && (
                                        <span
                                          className="font-weight-bolder text-secondary"
                                          style={{ fontSize: 16 }}
                                        >
                                          {capitalizeFirstLetter(
                                            heading
                                          )?.replace("_", " ")}
                                        </span>
                                      )}
                                    </div>

                                    <div className="mt--2">
                                      <span
                                        className={
                                          "text-secondary font-weight-bold"
                                        }
                                        style={{
                                          fontSize: "36px",
                                        }}
                                      >
                                        {`${reportData?.report_other_analytics[heading]} %`}
                                      </span>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </>
                        );
                      }
                    )}
                </div>
              </div>
            </div>
    )
}

export {BasicReportMatrixCard}