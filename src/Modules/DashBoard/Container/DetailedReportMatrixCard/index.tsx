import { Card } from "@Components";
import { capitalizeFirstLetter } from "@Utils";

const DetailedReportMatrixCard = ({reportData}) => {
    return (
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
                          {`${reportData?.skill_matrix_overal_percent} %`}
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
                  {reportData &&
                    reportData?.report_other_analytics &&
                    reportData?.report_other_analytics?.hlv_r &&
                    Object.keys(
                        reportData?.report_other_analytics?.hlv_r
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
                                  {`${reportData.report_other_analytics.hlv_r[heading]} %`}
                                </span>
                              </div>
                              <div className="h4 mb-0 pb-0 pt-2">
                                <span
                                  className="font-weight-bolder text-secondary"
                                  style={{ fontSize: 18 }}
                                >
                                  {capitalizeFirstLetter(heading).replace(
                                    "_",
                                    " "
                                  )}
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
    )
}

export {DetailedReportMatrixCard}