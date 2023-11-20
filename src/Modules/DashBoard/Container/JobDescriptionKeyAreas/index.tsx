import { Card } from "@Components";

const JobDescriptionKeyAreas = ({reportData}) => {
    return (
        <div>
              <div className="" style={{ paddingTop: 30 }}>
                <div>
                  {reportData &&
                    Object.keys(reportData).map((item) => {
                      return (
                        <div>
                          {item === "skill_matrix" &&
                            reportData?.skill_matrix?.sections &&
                            reportData?.skill_matrix?.sections.map(
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
    )
}


export {JobDescriptionKeyAreas}