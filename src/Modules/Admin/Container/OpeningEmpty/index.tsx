import { image } from '@Assets';
import { CreateNewOpenings } from '@Modules';
import './index.css';
import { OpeningEmptyProps } from './interface';

function OpeningEmpty({ onCreateOpeningClick }: OpeningEmptyProps) {


    const INSIGHTS_AND_REPORTS = [
        { id: 1, description: "Input job details specifying qualifications and requirements" },
        { id: 2, description: "Select Interview duration for how long the interview needs to be conducted" },
        { id: 3, description: "Choose the deadline before which the candidate should attend the interview" },
        { id: 4, description: "Add the candidates with their name, email and phone number" },
    ];

    return (
        <CreateNewOpenings
            image={image.StreamlinedAutomatedInterview}
            title={'Streamlined Automated Interviews'}
            description={'Get access to interview video recordings and detailed curated reports on Candidates for watch interview'}
            keyPoints={INSIGHTS_AND_REPORTS}
            buttonText={'Create Opening'}
            onButtonClick={onCreateOpeningClick}
        />
    )
}

export { OpeningEmpty };
