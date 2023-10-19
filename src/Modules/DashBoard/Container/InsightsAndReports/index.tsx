import { Container, Row, Col } from "reactstrap";
import { videos, image, icons } from "@Assets";
import "./index.css";
import { Button } from "@Components";
import { useEffect, useRef, useState } from "react";
import { useDynamicHeight, useGrowingTitleLine } from "@Hooks";

function InsightsAndReports() {
  let dynamicHeight: any = useDynamicHeight();

  const { growingWidth, titleLineRef: insightsAndReportsRef } =
    useGrowingTitleLine();

  const screenHeight = dynamicHeight.dynamicWidth <= 576 ? "" : "h-100vh";

  return (
    <div className="" style={{ backgroundColor: "#ffffff" }} ref={insightsAndReportsRef}>
      <section className={screenHeight}>
        <Container>
          <div className="header-body">
            <Row className="">
              <Col lg="5" xs="12" className={`text-black ${!screenHeight ? "mt-5" : "mt-4"}`}>
                <span
                  className={"display-2 font-weight-bolder"}
                  style={{ fontSize: 45 }}
                >
                  Insights & Reports
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
                    Once the candidate completes the interview, intrvu SPACE
                    shares the interview video and various reports to
                    objectively assess the interviewee. Reports includes
                  </span>
                </div>

                <li className="mt-2">
                  <span className="">Skill Matrix Report</span>
                </li>

                <li className="mt-1">
                  <span className="">Communication Report</span>
                </li>

                <li className="mt-1">
                  <span className="">Aptitude Report</span>
                </li>

                <li className="mt-1">
                  <span className="">
                    Personality Trait Report
                  </span>
                </li>

                <li className="mt-1">
                  <span className="">
                    And Much More ...
                  </span>
                </li>
              </Col>

              <Col lg="7" xs="12" className={`align-self-center pl-sm-6 ${!screenHeight ? "mt-5" : ""}`}>
                <img src={image.Introduction} width={"100%"} height={"100%"} />
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
}

export { InsightsAndReports };
