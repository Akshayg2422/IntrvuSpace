import { Container, Row, Col } from "reactstrap";
import { videos, image, icons } from "@Assets";
import "./index.css";
import { Button } from "@Components";
import { useEffect, useRef, useState } from "react";
import { useDynamicHeight, useGrowingTitleLine } from "@Hooks";

function AllInOnePlatform() {

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
              <Col className={`text-black ${!screenHeight ? "mt-5" : "mt-7"} text-center`}>
                <span
                  className={"display-3 font-weight-bolder text-secondary"}
                  // style={{ fontSize: 45 }}
                >
                  All-In-One Platform For Interview
                </span>

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
              
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
}

export { AllInOnePlatform };
