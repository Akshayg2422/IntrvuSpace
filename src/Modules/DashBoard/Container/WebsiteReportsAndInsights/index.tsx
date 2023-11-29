import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { Image, StatusIcon } from '@Components'

const packageContent = [
    { id: 1, description: "Video recording of the interview with other interview information" },
    { id: 2, description: "Report on complete assessment report on the skill of the interviewee for each question asked" },
    { id: 3, description: "Communication, Aptitude Report, Personality Trait Report, etc..," },
];

function WebsiteReportsAndInsights() {
    return (

        <Container>
            <div className="mb-md-6">
                <Row>
                    <Col className={'pt-md-5'} lg="6" sm="12">
                        <div>
                            <img
                                src={image.AccessReportsAndInsights}
                                width={"100%"}
                                height={"100%"}
                            />
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="mt-5 ml-md-7">
                            <div>
                                <span style={{ lineHeight: '35px' }} className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                    Access on Interview <br></br>Reports & Insights
                                </span>
                            </div>

                            <div className="" style={{ paddingTop: 35 }}>
                                {packageContent.map((item) => {
                                    return (
                                        <>
                                            <div className="row ml-md-1 ml-sm-0 ml-1">
                                                <div>
                                                    <StatusIcon/>
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
                </Row>
            </div>
        </Container>

    )
}

export { WebsiteReportsAndInsights }