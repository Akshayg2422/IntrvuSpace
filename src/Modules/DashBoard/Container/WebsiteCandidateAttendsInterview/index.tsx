import { image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';

const packageContent = [
    { id: 1, description: "Once Candidate joins the interview, our system starts interviewing based on the provided JD" },
    { id: 2, description: "After face authentication, video recording of the interview will begin" },
    { id: 3, description: "Interview will be conducted for the provided duration" },
    { id: 4, description: "Location, emotion and all the other input of the interviewee are analysed for the entire interview" },
];

function WebsiteCandidateAttendsInterview() {
    return (
        <div className={`pt-sm-6`}>
            <Container>
                <div className="mb-6">
                    <Row>
                        <Col lg="5">
                            <div className="mt-5 ml-lg-5">
                                <div>
                                    <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                        Candidate Attends the <br /> interview
                                    </span>

                                </div>

                                <div className="" style={{ paddingTop: 35 }}>
                                    {packageContent.map((item) => {
                                        return (
                                            <>
                                                <div className="pt-2 row">
                                                    <span className={'text-default pt-2'} />
                                                    <span
                                                        className="col-11 text-default"
                                                    >
                                                        <p>{item.description}</p>
                                                    </span>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </Col>
                        <Col lg="7" sm="12">
                            <div>
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
    )
}

export { WebsiteCandidateAttendsInterview }