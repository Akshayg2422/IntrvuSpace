import React from 'react'
import { Button } from '@Components'
import { color } from '@Themes'
import { showCreateJddModal } from '@Redux'
import { image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { useDispatch } from 'react-redux'

function UploadJdCard() {

    const dispatch = useDispatch();

    const insightsdAndReports = [
        { id: 1, description: "Interview video recording" },
        { id: 2, description: "Skill Matrix", description2: "Report" },
        { id: 3, description: "Communication", description2: "Report" },
        { id: 4, description: "Aptitude", description2: "Report" },
        { id: 5, description: "Personality Trait", description2: "Report" },
    ];

    return (

        <div className={'bg-white'} style={{objectFit:'contain'}}>
            <Container className={'bg-white'}>
                <div className="">
                    <div className={'row text-center'}>
                        <div className={'col-12 display-3 text-secondary font-weight-bolder mb-0 ls-1'}>
                            Starts Your Interview Now !
                        </div>
                        <div className={'w-100'}></div>
                        <div className={'col-12 text-default'}>
                            Input job details, specifying qualifications, requirements, interview duration and start attending the one to one Video interview <br></br> with AI backend precision
                        </div>

                    </div>
                    <div className={'d-flex justify-content-center align-items-center'}>
                        <div className="">

                        </div>
                    </div>
                    <div className={' '}>

                    </div>


                    <Row>
                        <Col lg="5">
                            <div className="mt-5 ml-lg-5">
                                <div>
                                    <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                        Insights & Reports
                                    </span>
                                </div>
                                <div className={'text-default font-weight-500'}>
                                    Upon completion of the interview, Get access  to interview view video recording and detailed curated reports
                                </div>

                                <div className="" style={{ paddingTop: 35 }}>
                                    {insightsdAndReports.map((item) => {
                                        return (
                                            <>
                                                <div className="pt-2 row">
                                                    <span className={'col-1 ni ni-check-bold text-green'} />
                                                    <span
                                                        className="col-11 text-secondary"
                                                    >
                                                        <p style={{ lineHeight: '16px' }} className={'font-weight-700'}>{item.description}<small className={'pl-1 font-weight-600'}>{item.description2}</small></p>
                                                    </span>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                                <div className='pt-4'></div>
                                <Button
                                    className={'px-md-6 rounded'}
                                    isTextLowercase={false}
                                    text={'Create Interview'}
                                    onClick={() => {
                                        dispatch(showCreateJddModal())
                                    }} />
                            </div>
                        </Col>

                        <Col className={'pt-6 d-none d-lg-block d-md-block d-xl-block'} lg="7" sm="12">
                            <div>
                                <img
                                    src={image.CreateIntrvu}
                                    width={"600px"}
                                    height={"100%"}
                                    style={{ borderRadius: "20px" }}
                                />
                            </div>
                        </Col>

                        <Col className={'pt-4 pb-4 d-block d-sm-none'} lg="7" sm="12">
                            <div>
                                <img
                                    src={image.CreateIntrvu}
                                    width={"330px"}
                                    height={"100%"}
                                    style={{ borderRadius: "20px" }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container >
        </div>
    )
}

export { UploadJdCard }