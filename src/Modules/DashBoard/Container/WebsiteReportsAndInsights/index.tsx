import { image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';

const packageContent = [
    { id: 1, description: "Video recording of the interview with other interview information" },
    { id: 2, description: "Report on complete assessment report on the skill of the interviewee for each question asked" },
    { id: 3, description: "Communication, Aptitude Report, Personality Trait Report, etc..," },
];

function WebsiteReportsAndInsights() {
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
                                        Access on Interview<br />Reports & Insights
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

export { WebsiteReportsAndInsights }