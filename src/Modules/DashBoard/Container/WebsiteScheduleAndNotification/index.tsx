import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { Image, StatusIcon } from '@Components'

const packageContent = [
    { id: 1, description: "Interview invite link will be sent over email and text message to the candidate" },
    { id: 2, description: "Each added candidate will face the distinct questions but completely aligning to the JD expectations" },
    { id: 3, description: "Candidates can complete their interview at their convenient time before the deadline" },
    { id: 4, description: "Candidate can join with the provided lnk without authenticating or registering to the system" },
];

function WebsiteScheduleAndNotification() {
    return (

        <Container>
            <div className="mb-md-6">
                <Row>
                    <Col lg="7" sm="12">
                        <div className={'mt-md-5 d-flex justify-content-center'}>
                            <img
                                className={"mr-md-8"}
                                src={image.ScheduleAndNotification}
                                width={"80%"}
                                height={"80%"}
                            />
                        </div>
                    </Col>
                    <Col lg="5">
                        <div className="mt-5">
                            <div>
                                <span style={{ lineHeight: '35px' }} className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                    Schedule & Notification
                                </span>
                            </div>

                            <div className="" style={{ paddingTop: 35 }}>
                                {packageContent.map((item) => {
                                    return (
                                        <>
                                            <div className="row ml-sm-0 ml-1">
                                                <div>
                                                    <StatusIcon />
                                                </div>
                                                <span
                                                    className="col-11 text-secondary"
                                                >
                                                    <p style={{ fontSize: '15px', fontWeight: 400 }}>{item.description}</p>
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

    )
}

export { WebsiteScheduleAndNotification }