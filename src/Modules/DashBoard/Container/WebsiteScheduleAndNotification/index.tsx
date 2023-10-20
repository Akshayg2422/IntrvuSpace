import { image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';

const packageContent = [
    { id: 1, description: "Interview invite link will be sent over email and text message to the candidate" },
    { id: 2, description: "Each added candidate will face the distincr questions but completely aligning to the JD expectations" },
    { id: 3, description: "Candidates can complete their interview at their conveninet time before the deadline" },
    { id: 4, description: "Candidate can join with the provided lnk without authenticating or registering the system" },
];

function WebsiteScheduleAndNotification() {
    return (
        <div className={`pt-sm-6`}>
            <Container>
                <div className="mb-6">
                    <Row>
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
                        <Col lg="5">
                            <div className="mt-5 ml-lg-5">
                                <div>
                                    <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                        Schedule & <br /> Notification
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
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export { WebsiteScheduleAndNotification }