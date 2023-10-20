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
  let dynamicHeight: any = useDynamicHeight();

  const { growingWidth, titleLineRef: websiteHeaderRef } =
    useGrowingTitleLine();

  let dynamicWidthCalculation =
    dynamicHeight.dynamicWidth <= 510
      ? dynamicHeight.dynamicWidth / 1.3
      : dynamicHeight.dynamicHeight - 44;

  const screenHeight = dynamicHeight.dynamicWidth <= 576 ? "" : "h-100vh";

  return (
    <div
      className={`header pt-8`}
      ref={websiteHeaderRef}
      style={{ backgroundColor: "" }}
    >
      <Container>
        <div className="mb-6">
          <Row>
            <Col lg="5">
              <div className="mt-5 ml-lg-5">
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
                      Where AI <br /> meets HR
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
                          <Image src={icons.shield} height={17} />
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

                <Button
                  className={"mt-7 col-sm-10"}
                  block
                  text={"Start Now"}
                  size="lg"
                  style={{ borderRadius: 4 }}
                  isTextLowercase
                />

                <div className="pt-3">
                  <Image src={icons.headSet} height={17} />
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
              <div className="pt-sm-5">
                <img
                  src={image.MockEazy2}
                  width={"100%"}
                  height={"100%"}
                  style={{ borderRadius: "20px" }}
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
