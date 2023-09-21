import { Input } from "@Components";

interface QuestionWithMultipleChoicesProps {
  question?: any;
  choices?: any;
  selectedChoices?: any;
  onChoiceSelect?: (val1, val2) => void;
}

const QuestionWithMultipleChoices = ({
  question,
  choices,
  selectedChoices,
  onChoiceSelect,
}: QuestionWithMultipleChoicesProps) => {
  return (
    <div className="question-container text-white">
      <p className="question ">{question}</p>
      <div className="choices">
        {choices.map((choice: any, index: any) => (
          <div key={index} className="custom-control custom-checkbox pt-3">
            <input
              className="custom-control-input"
              type="checkbox"
              id={`${question}-${choice}`}
              name={question} // Ensure each question has the same name attribute
              value={choice}
              checked={selectedChoices.includes(choice)}
              onChange={() => {
                if (onChoiceSelect) {
                  onChoiceSelect(question, choice);
                }
              }}
            />
            <label className="custom-control-label" htmlFor={`${question}-${choice}`}>{choice}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export { QuestionWithMultipleChoices };
