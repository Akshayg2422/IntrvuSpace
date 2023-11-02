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

        <div style={{ maxHeight: '60vh' }} className={'container-fluid'}>
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

                <div className={'row mx-md-3'}>
                    <div className={'col-lg-6'}>
                        <div className="mt-2">
                            <div>
                                <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                    Insights & Reports
                                </span>
                            </div>
                            <div style={{maxWidth:'80%'}} className={'text-default font-weight-500 mb-sm-0 mb-3'}>
                                Upon completion of the interview, Get access  to interview view video recording and detailed curated reports
                            </div>

                            <div className="pt-md-3">
                                {insightsdAndReports.map((item) => {
                                    return (
                                        <div className="row">
                                            <div className={'col-1'} style={{ lineHeight: '16px' }} >
                                                <Image src={icons.check} height={20} />
                                            </div>
                                            <span
                                                className="col-11 text-secondary m-0 p-0"
                                            >
                                                <p style={{ lineHeight: '18px' }} className={'font-weight-700'}>{item.description}<small style={{ fontSize: '15px' }} className={'pl-1 font-weight-500'}>{item.description2}</small></p>
                                            </span>
                                        </div>
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

                    <div className={'pt-md-4 pt-sm-0 pt-4 col-lg-6 col-sm-12'}>
                        <div>
                            <img
                                src={image.InsightsAndReports}
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