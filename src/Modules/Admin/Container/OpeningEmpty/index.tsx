import { image } from '@Assets';
import { CreateNew } from '@Modules';
import { showCreateOpeningsModal } from '@Redux';
import { useDispatch } from 'react-redux';
import './index.css';

function OpeningEmpty() {

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
        <CreateNew
            image={image.StreamlinedAutomatedInterview}
            title={`Streamlined \n Interviews & Insights`}
            description={'Get access to interview video recordings and detailed curated reports on Candidates for watch interview'}
            keyPoints={INSIGHTS_AND_REPORTS}
            buttonText={'Create Opening'}
            onButtonClick={handleCreateOpeningsClick}
        />
    )
}

export { OpeningEmpty };
