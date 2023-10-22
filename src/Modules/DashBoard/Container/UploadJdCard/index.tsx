import React from 'react'
import { Button, Image } from '@Components'
import { color } from '@Themes'
import { showCreateJddModal } from '@Redux'
import { icons, image } from '@Assets';
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

        <div style={{maxHeight:'60vh'}} className={'container-fluid mt--4'}>
            <div className="">
                <div className={'row text-center'}>
                    <div className={'col-12 display-3 text-secondary font-weight-bolder ls-1'}>
                        Start Your Interview Now !
                    </div>
                    <div className={'w-100'}></div>
                    <div className={'col-12 text-default'}>
                        Input job details, specifying qualifications, requirements, interview duration and start attending the one to one Video interview <br></br> with AI backend precision
                    </div>
                </div>

                <div className={'row'}>
                    <div className={'col-lg-5'}>
                        <div className="mt-2 ml-md-5">
                            <div>
                                <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                    Insights & Reports
                                </span>
                            </div>
                            <div className={'text-default font-weight-500 mb-sm-0 mb-3'}>
                                Upon completion of the interview, Get access  to interview view video recording and detailed curated reports
                            </div>

                            <div className="pt-md-3">
                                {insightsdAndReports.map((item) => {
                                    return (
                                        <>
                                            <div className="row">
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
                            <div className='pt-md-2'></div>
                            <Button
                                className={'px-md-6 px-sm-0 px-7 rounded-sm'}
                                isTextLowercase={false}
                                text={'Create Interview'}
                                onClick={() => {
                                    dispatch(showCreateJddModal())
                                }} />
                        </div>
                    </div>

                    <div className={'pt-md-4 pt-sm-0 pt-4 col-lg-5 col-sm-12 ml-md-6'}>
                        <div>
                            <img
                                src={image.AccessReportsAndInsights}
                                width={"100%"}
                                height={"100%"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export { UploadJdCard }