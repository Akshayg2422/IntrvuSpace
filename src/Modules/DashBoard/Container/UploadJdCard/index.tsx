import { image } from '@Assets';
import { CreateNew } from '@Modules';
import { showCreateJddModal } from '@Redux';
import { useDispatch } from 'react-redux';
import './index.css'

function UploadJdCard() {

    const dispatch = useDispatch();

    const insightsdAndReports = [
        { id: 1, description: "Interview video recording" },
        { id: 2, description: "Skill Matrix", description2: "Report" },
        { id: 3, description: "Communication", description2: "Report" },
        { id: 4, description: "Aptitude", description2: "Report" },
        { id: 5, description: "Personality Trait", description2: "Report" },
    ];

    function createInterviewHandler() {
        dispatch(showCreateJddModal())
    }

    return (
        <CreateNew
            image={image.InsightsAndReports}
            title={'Insights & Reports'}
            description={'Input job details, specifying qualifications, requirements, interview duration and start attending the one to one Video interview with AI backend precision'}
            keyPoints={insightsdAndReports}
            buttonText={'Create Interview'}
            onButtonClick={createInterviewHandler}
        >
            <div className={'create-interview-heading'}>
                <div className={'text-heading'}>{'Start Your Interview Now !'}</div>
                <div style={{ whiteSpace: "pre-line", marginTop: "15px" }}>{'Input job details, specifying qualifications, requirements, interview duration and start attending the one to one Video interview \n with AI backend precision'}</div>
            </div>

        </CreateNew>
    )
}

export { UploadJdCard };
