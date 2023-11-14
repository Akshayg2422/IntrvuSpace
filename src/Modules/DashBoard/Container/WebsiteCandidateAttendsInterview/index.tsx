import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { Image } from '@Components'

const packageContent = [
    { id: 1, description: "Once Candidate joins the interview, our system starts interviewing based on the provided JD" },
    { id: 2, description: "After face authentication, video recording of the interview will begin" },
    { id: 3, description: "Interview will be conducted for the provided duration" },
    { id: 4, description: "Location, emotion and all the other input of the interviewee are analyzed for the entire interview" },
];

function WebsiteCandidateAttendsInterview() {
    return (

        <Container>
            <div className="mb-6">
                <Row>
                    <Col lg="5">
                        <div className="mt-5">
                            <div>
                                <span style={{ lineHeight: '35px' }} className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                    Candidate Attends the interview
                                </span>
                            </div>

                            <div className="" style={{ paddingTop: 35 }}>
                                {packageContent.map((item) => {
                                    return (
                                        <>
                                            <div className="row ml-md-1 ml-sm-0 ml-1">
                                                <div>
                                                    <Image src={icons.check} height={12} width={12} style={{
                                                        objectFit: 'contain'
                                                    }} />
                                                </div>
                                                <span
                                                    className="col-11 text-default"
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
                    <Col className={'pt-md-5'} lg="7" sm="12">
                        <div>
                            <img
                                className={'ml-md-8 ml-sm-0 ml-4'}
                                src={image.CandidatesAttendInterview}
                                width={"80%"}
                                height={"80%"}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>

    )
}

export { WebsiteCandidateAttendsInterview }