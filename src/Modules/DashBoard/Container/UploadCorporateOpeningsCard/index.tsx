import { Button, Image } from '@Components'
import { showCreateOpeningsModal } from '@Redux'
import { icons, image } from '@Assets';
import { useDispatch } from 'react-redux'
import './index.css'

function UploadCorporateOpeningsCard() {

    const dispatch = useDispatch();

    const INSIGHTS_AND_REPORTS = [
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

        <div className={'opening-card-container'}>
            <div className={'section-1'}>
                <div>
                    <span className='text-heading lh-110'>
                        {"Streamlined"}
                        <br />
                        {"Interviews & Insights"}
                    </span>

                    <div className={'text-des text-des-container'}>
                        Get access to interview video recordings and detailed curated reports on Candidates for watch interview
                    </div>

                    <div className={'points-container'}>
                        {INSIGHTS_AND_REPORTS.map((item) => {

                            const { description, description2 } = item;
                            return (
                                <>
                                    <div className="row">
                                        <div className={'col-1'} style={{ lineHeight: '16px' }} >
                                            <Image src={icons.check} height={20} />
                                        </div>
                                        <span>
                                            <p className={'point-heading'}>{description}<small className={'point-sub-heading'}>{description2}</small></p>
                                        </span>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className={'create-opening-btn'}>
                    <Button
                        block
                        text={'Create Opening'}
                        onClick={handleCreateOpeningsClick}
                    />
                </div>

            </div>

            <div className={'section-2'}>
                <Image
                    src={image.StreamlinedInterviewAndInsights}
                    className={'section-image'}
                    height={'70%'}
                    width={'70%'}
                />
            </div>

        </div>

    )
}

export { UploadCorporateOpeningsCard }