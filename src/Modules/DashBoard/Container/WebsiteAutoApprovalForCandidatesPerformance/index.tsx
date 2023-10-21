import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { Image } from '@Components'

const packageContent = [
    { id: 1, description: "Based on the provided JD and the extracted information the system suggests the best fit candidates in order" },
    { id: 2, description: "If the auto approval is enabled with the expected criteria with the minimum saturation on each expectation" },
    { id: 3, description: "The system carefully evaluates the criteria and auto approves/rejects based on it" },
];

function WebsiteAutoApprovalForCandidatesPerformance() {
    return (

        <Container>
            <div className={'pb-5'}>
                <Row>
                    <Col lg="5">
                        <div className="mt-5">
                            <div>
                                <span className="display-3 text-secondary font-weight-bolder mb-0">
                                    Auto Approval based on <br /> Candidate's Performance
                                </span>

                            </div>

                            <div className="" style={{ paddingTop: 35 }}>
                                {packageContent.map((item) => {
                                    return (
                                        <>
                                            <div className="row ml-md-1 ml-sm-0 ml-1">
                                                <div>
                                                    <Image src={icons.check} height={20} />
                                                </div>
                                                <span
                                                    className="col-11 text-default"
                                                >
                                                    <p style={{fontSize:'15px',fontWeight:400}}>{item.description}</p>
                                                </span>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col className={'pt-md-6'} lg="7" sm="12">
                        <div>
                            <img
                                src={image.AutoApproval}
                                width={"100%"}
                                height={"100%"}
                                style={{ borderRadius: "20px" }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export { WebsiteAutoApprovalForCandidatesPerformance }