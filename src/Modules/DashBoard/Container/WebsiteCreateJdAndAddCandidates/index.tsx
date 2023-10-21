import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import {Image} from '@Components'
const packageContent = [
    { id: 1, description: "Input job details, specifying qualifications and requirements" },
    { id: 2, description: "Select Interview duration for how long the interview needs to be conducted" },
    { id: 3, description: "Choose the deadline before which the candidate should attend the interview" },
    { id: 4, description: "Add the candidates with their name, email and phone number" },
];

function WebsiteCreateJdAndAddCandidates() {
    return (
        <div className={`pt-sm-6`}>
            <Container>
                <div className="mb-6">
                    <Row>
                        <Col lg="5">
                            <div className="mt-5">
                                <div>
                                    <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                        Create Jd & <br /> Add Candidates
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
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export { WebsiteCreateJdAndAddCandidates }