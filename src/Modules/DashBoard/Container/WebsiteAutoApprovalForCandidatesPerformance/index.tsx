import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { Image, StatusIcon } from '@Components'

const packageContent = [
    { id: 1, description: "Based on the provided JD and the extracted information the system suggests the best fit candidates in order" },
    { id: 2, description: "If the auto approval is enabled with the expected criteria with the minimum saturation on each expectation" },
    { id: 3, description: "The system carefully evaluates the criteria and auto approves/rejects based on it" },
];

function WebsiteAutoApprovalForCandidatesPerformance() {
    return (

        <div className='container-fluid'>
            <div className={'m-6 pb-md-5'}>
                <Row>
                    <Col lg="5">
                        <div className="mt-5">
                            <div>
                                <span style={{ lineHeight: '35px' }} className="display-3 text-secondary font-weight-bolder mb-0">
                                    Auto Approval based on Candidate's Performance
                                </span>

                            </div>

                            <div style={{ paddingTop: 35 }}>
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
                                src={image.AutoApproval}
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

export { WebsiteAutoApprovalForCandidatesPerformance }