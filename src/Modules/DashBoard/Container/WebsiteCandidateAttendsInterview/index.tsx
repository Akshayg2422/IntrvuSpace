import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { Image, StatusIcon } from '@Components'

const packageContent = [
    { id: 1, description: "The Actual Interview starts when the candidate joins using the link shared via mail" },
    { id: 2, description: "Our AI system conducts end to end interview conversational interview just like any other interview conducted by the interviewer over meet or teams" },
    { id: 3, description: "Interview questions are tightly aligned with the provided JD and interview will be conducted for the specified duration" },
];

function WebsiteCandidateAttendsInterview() {
    return (

      <div className="container-fluid">
            <div className="m-6 mb-6">
                <Row>
                    <Col lg="5">
                        <div className="mt-5">
                            <div>
                                <span style={{ lineHeight: '35px' }} className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                Candidate Interview
                                </span>
                            </div>

                            <div className="" style={{ paddingTop: 35 }}>
                                {packageContent.map((item) => {
                                    return (
                                        <>
                                            <div className="row ml-md-1 ml-sm-0 ml-1">
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
                    <Col className={'pt-5'} lg="7" sm="12">
                        <div className={'d-flex justify-content-center'}>
                            <img
                                className={'ml-md-6'}
                                src={image.CandidatesAttendInterview}
                                width={"80%"}
                                height={"80%"}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    )
}

export { WebsiteCandidateAttendsInterview }