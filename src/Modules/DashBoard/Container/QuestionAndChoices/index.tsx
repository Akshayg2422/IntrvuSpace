import { Input } from "@Components";

interface QuestionAndChoicesProps {
  question?: any;
  choices?: any;
  selectedChoice?: any;
  onChoiceSelect?: (val) => void;
}

const QuestionAndChoices = ({
  question,
  choices,
  selectedChoice,
  onChoiceSelect,
}: QuestionAndChoicesProps) => {
  return (
    <div className="container-fluid text-white">
      <p className="question">{question}</p>
      <div className="choices">
        {choices.map((choice: any, index: any) => (
          <div key={index} className="custom-control custom-radio pt-3">
            <input
              className="custom-control-input"
              type="radio"
              id={`${question}-${choice}`}
              name={`${question}-${choice}`} // Ensure each question has the same name attribute
              value={choice}
              checked={selectedChoice === choice}
              onChange={() => {
                if (onChoiceSelect) {
                  onChoiceSelect(choice);
                }
              }}
            />
            <label
              className="custom-control-label"
              htmlFor={`${question}-${choice}`}
            >
              {choice}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export { QuestionAndChoices };
