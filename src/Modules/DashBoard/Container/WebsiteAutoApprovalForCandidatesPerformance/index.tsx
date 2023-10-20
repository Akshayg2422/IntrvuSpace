import { image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';

const packageContent = [
    { id: 1, description: "Based on the provided JD and the extracted information the system suggests the best fit candidates in order" },
    { id: 2, description: "If the auto approval is enabled with the expected criteria with the minimum saturation on each expectation" },
    { id: 3, description: "The system carefully evaluates the criteria and auto approves/rejects based on it" },
];

function WebsiteAutoApprovalForCandidatesPerformance() {
    return (
        <div className={`pt-sm-6`}>
            <Container>
                <div className="mb-6">
                    <Row>
                        <Col lg="5">
                            <div className="mt-5 ml-lg-12">
                                <div>
                                    <span className="display-3 text-secondary font-weight-bolder mb-0">
                                        Auto Approval based on <br /> Candidate's Performance
                                    </span>

                                </div>

                                <div className="" style={{ paddingTop: 35 }}>
                                    {packageContent.map((item) => {
                                        return (
                                            <>
                                                <div className="pt-2 row">
                                                    <span className={'col-1 ni ni-check-bold text-green pt-2'} />
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

export { WebsiteAutoApprovalForCandidatesPerformance }