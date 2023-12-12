import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { Image, StatusIcon } from '@Components'

const packageContent = [
    { id: 1, description: "Interview will be created for the specified duration" },
    { id: 2, description: "Candidates will be notified email and text message with the interview link" },
    { id: 3, description: "Each added candidate will face the distinct auto generated questions from one another" },
    { id: 4, description: "Candidates can participate in their interview at any time of their comfort before the deadline" },
];

function WebsiteScheduleAndNotification() {
    return (

      <div className="container-fluid">
            <div className="m-lg-6 m-md-6 m-sm-0 mb-md-6">
                <Row>
                    <Col lg="7" sm="12">
                        <div className={'mt-md-5 d-flex justify-content-center'}>
                            <img
                                className={"mr-md-6"}
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
                                Automated Schedules
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
        </div>

    )
}

export { WebsiteScheduleAndNotification }