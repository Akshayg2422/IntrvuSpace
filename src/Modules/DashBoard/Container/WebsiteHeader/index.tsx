import { icons, image } from "@Assets";
import { Button, Image } from "@Components";
import { useDynamicHeight, useGrowingTitleLine } from "@Hooks";
import { Col, Container, Row } from "reactstrap";

const packageContent = [
  { id: 1, description: "Automated Video Interviews" },
  { id: 2, description: "Flexible Interview timings of candidate's choice" },
  { id: 3, description: "Interview Video Recordings" },
  { id: 4, description: "Detailed Insights & Reports" },
  { id: 5, description: "Auto Approvals based on objective analytics" },
];

function WebsiteHeader() {

  const { titleLineRef: websiteHeaderRef } =
    useGrowingTitleLine();



  return (
    <div
      className={`header pt-8`}
      ref={websiteHeaderRef}
      style={{ backgroundColor: "" }}
    >
      <Container>
        <div className="mb-md-6">
          <Row>
            <Col lg="5">
              <div className="">
                <div>
                  <div>
                    <span
                      className=" mb-0 text-secondary"
                      style={{ fontWeight: "800", fontSize: 18 }}
                    >
                      {" "}
                      Streamlined Automated Interviews
                    </span>
                  </div>
                  <div>
                    <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                      Where AI
                    </span>
                  </div>
                  <div style={{ marginTop: -11 }}>
                    <span className="display-3 text-secondary font-weight-bolder ls-1">
                      meets HR
                    </span>
                  </div>
                </div>
                <div className="pt-3">
                  <span
                    className="text-secondary"
                    style={{ fontSize: 14, fontWeight: "500" }}
                  >
                    {"Create a job description and add the candidates,"} <br />
                    {"Let us take care of the rest of you!"}
                  </span>
                </div>

                <div className="" style={{ paddingTop: 35 }}>
                  {packageContent.map((item) => {
                    return (
                      <>
                        <div className="pt-2">
                          <Image src={icons.check} height={20} />
                          <span
                            className="ml-2 text-secondary"
                            style={{ fontSize: 12.5, fontWeight: 800 }}
                          >
                            {item.description}
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className={"mt-5 col-sm-10 ls-0"}>
                  <Button
                    block
                    text={"Start Now"}
                  />
                </div>


                <div className="pt-3 pb-sm-0 pb-3 ">
                  <Image src={icons.headSet} height={20} />
                  <span
                    className="ml-2 text-secondary"
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    {"24/7 Customer Support"}
                  </span>
                </div>
              </div>
            </Col>
            <Col lg="7" sm="12">
              <div className="">
                <img
                  src={image.CandidatesAttendInterview}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export { WebsiteHeader };
