import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { Image } from '@Components'

const packageContent = [
    { id: 1, description: "Video recording of the interview with other interview information" },
    { id: 2, description: "Report on complete assessment report on the skill of the interviewee for each question asked" },
    { id: 3, description: "Communication, Aptitude Report, Personality Trait Report, etc..," },
];

function WebsiteReportsAndInsights() {
    return (

        <Container>
            <div className="mb-md-6 m-md-0">
                <Row>
                    <Col className={'pt-md-5'} lg="7" sm="12">
                        <div>
                            <img
                                src={image.CreateIntrvu}
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
                                            <div className="row ml-md-1 ml-sm-0 ml-1">
                                                <div>
                                                    <Image src={icons.check} height={20} />
                                                </div>
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

    )
}

export { WebsiteReportsAndInsights }