import { Button, Image } from '@Components'
import {  showCreateOpeningsModal } from '@Redux'
import { icons, image } from '@Assets';
import { useDispatch } from 'react-redux'

function UploadCorporateOpeningsCard() {

    const dispatch = useDispatch();

    const insightsAndReports = [
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

        <div className={'container-fluid mt-md-7 mt-sm-0 mt-5'}>

            <div className={'row'}>
                <div className={'col-lg-6 col-sm-12'}>
                    <div className="mt-2 ml-md-6">
                        <div className={'mb-md-3 mb-sm-0 mb-4'}>
                            <span style={{ lineHeight: '36px' }} className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                Streamlined <br />
                                Interviews & Insights
                            </span>
                        </div>
                        <div style={{ maxWidth: '75%' }} className={'text-default font-weight-500 mb-md-3 mb-sm-0 mb-4'}>
                            Get access to interview video recordings and detailed curated reports on Candidates for watch interview
                        </div>

                        <div className="pt-md-2 pt-sm-0 pt-2">
                            {insightsAndReports.map((item) => {
                                return (
                                    <>
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
                                    </>
                                );
                            })}
                        </div>
                        <div className='pt-md-4 pt-sm-0 pt-4'></div>
                        <Button
                            className={'px-md-5 px-sm-0 px-6 ml-sm-0 ml-4 rounded-sm'}
                            isTextLowercase={false}
                            text={'Create Opening'}
                            onClick={handleCreateOpeningsClick} />
                    </div>
                </div>

                <div className={'pt-sm-0 pt-5 col-lg-6 col-sm-12'}>
                    <div>
                        <Image
                            src={image.StreamlinedInterviewAndInsights}
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