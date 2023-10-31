import { Container, Row, Col } from "reactstrap";
import { videos, image, icons } from "@Assets";
import { Button } from "@Components";
import { useState, useEffect, useRef } from "react";
import { useDynamicHeight, useGrowingTitleLine } from "@Hooks";

function AutoApprovalSystem() {
  let dynamicHeight: any = useDynamicHeight();

  const { growingWidth, titleLineRef: autoApprovalSystemRef } =
    useGrowingTitleLine();

  const screenHeight = dynamicHeight.dynamicWidth <= 576 ? "" : "h-100vh";

  return (
    <div
      className={`${screenHeight ? "mt--5" : ""}`}
      style={{ backgroundColor: "#ffffff" }}
      ref={autoApprovalSystemRef}
    >
      <Container>
        <div className="header-body">
          <Row className={screenHeight}>
            <Col
              lg="5"
              className={`mt-sm-6  text-black ${!screenHeight ? "mt-5" : ""}`}
            >
              <span
                className={"display-2 font-weight-bolder"}
                style={{ fontSize: 45 }}
              >
                Auto Approval System
              </span>

              <div
                className="mt-4"
                style={{
                  height: 5,
                  width: growingWidth,
                  backgroundColor: "black",
                }}
              />
              <div className="mt-6" style={{ textAlign: "justify" }}>
                <span>
                  Enable intrvu.space auto approval system to automate the
                  candidate Selection. Once enabled, based on the set criteria
                  in different areas of expectation in JD, the system
                  automatically approves/rejects the candidate.
                </span>
              </div>
            </Col>

            <Col
              lg="7"
              className={`align-self-center pl-sm-6 ${
                !screenHeight ? "mt-5" : "mt-4"
              }`}
            >
              <img src={image.Introduction} width={"100%"} height={"100%"} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export { AutoApprovalSystem };
