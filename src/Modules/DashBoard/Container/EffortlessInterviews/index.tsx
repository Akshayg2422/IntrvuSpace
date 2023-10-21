import { Container, Row, Col } from "reactstrap";
import { videos, image, icons } from "@Assets";
import "./index.css";
import { Button } from "@Components";
import { useEffect, useRef, useState } from "react";
import { useDynamicHeight, useGrowingTitleLine } from "@Hooks";

function EffortlessInterviews() {

  let dynamicHeight: any = useDynamicHeight();

  const { titleLineRef: effortlessInterviewsRef, growingWidth } =
    useGrowingTitleLine();

  const screenHeight = dynamicHeight.dynamicWidth <= 576 ? "" : "h-100vh";

  return (
    <div ref={effortlessInterviewsRef} style={{ backgroundColor: "#ffffff" }}>
      <section className={`${screenHeight} pt-3`}>
        <Container>
          <div className="header-body">
            <Row className="">
              {" "}
              {/**h-100vh */}
              <Col lg="5" className={`text-black ${!screenHeight ? "mt-5" : "mt-4"}`}>
                <span
                  className={"display-2 font-weight-bolder"}
                  style={{ fontSize: 45 }}
                >
                  Effortless Interviews
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
                    Create a Job description and add the candidates with their
                    email and phone number. intrvu SPACE instantly schedules
                    interviews automatically and sends the interview link over
                    email and message. Candidates can complete their interview
                    at their convenient time before the deadline.
                  </span>
                </div>
              </Col>
              <Col lg="7" xs="12" className={`pl-sm-6 align-self-center ${!screenHeight ? "mt-5" : ""}`}>
                <img
                  src={icons.effortlessInterviews}
                  width={"100%"}
                  height={"100%"}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
}

export { EffortlessInterviews };
