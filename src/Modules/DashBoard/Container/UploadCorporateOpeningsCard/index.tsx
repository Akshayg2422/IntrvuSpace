import React from 'react'
import { Button, Image } from '@Components'
import { color } from '@Themes'
import { showCreateJddModal, showCreateOpeningsModal } from '@Redux'
import { icons, image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { useDispatch } from 'react-redux'

function UploadCorporateOpeningsCard() {

    const dispatch = useDispatch();

    const insightsdAndReports = [
        { id: 1, description: "Multiple Candidates", description2: "for single JD" },
        { id: 2, description: "Flexible Interview", description2: "timings with deadline" },
        { id: 3, description: "Interview Video Recordings" },
        { id: 4, description: "Objective", description2: "Reports on Interview" },
        { id: 5, description: "Auto Approval", description2: "System" },
    ];
    const handleCreateOpeningsClick = () => {
        dispatch(showCreateOpeningsModal());
    };
    return (

        <div className={'container-fluid mt-md-7 mt-sm-0 mt-8'}>

            <div className={'row mx-md-5 '}>
                <div className={'col-lg-5 col-sm-12'}>
                    <div className="mt-2 ml-md-5">
                        <div className={'mb-md-3 mb-sm-0 mb-4'}>
                            <span style={{ lineHeight: '30px' }} className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                Streamlined <br />
                                Interviews & Insights
                            </span>
                        </div>
                        <div className={'text-default font-weight-500 mb-md-3 mb-sm-0 mb-4'}>
                            Get access to interview video recordings and detailed curated reports on Candidates for wach interview
                        </div>

                        <div className="pt-md-1 pt-sm-0 pt-2">
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
                        <div className='pt-md-3 pt-sm-0 pt-4'></div>
                        <Button
                            className={'px-md-5 px-sm-0 px-7 ml-sm-0 ml-2 rounded-sm'}
                            isTextLowercase={false}
                            text={'Create Openings'}
                            onClick={handleCreateOpeningsClick} />
                    </div>
                </div>

                <div className={'pt-md-8 pt-sm-0 pt-4 col-lg-5 col-sm-12 ml-md-6'}>
                    <div>
                        <Image
                            src={image.AccessReportsAndInsights}
                            width={"100%"}
                            height={"100%"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { UploadCorporateOpeningsCard }