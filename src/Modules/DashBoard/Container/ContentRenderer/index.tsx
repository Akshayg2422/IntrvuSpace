import { Button } from "@Components";
import { useDropDown, useDynamicHeight } from "@Hooks";
import { FileUploader } from "@Modules";
import { useState } from "react";
import { CodeEditor } from "../CodeEditor";
import { FlowDiagram } from "../FlowDiagram";
import { QuestionAndChoices } from "../QuestionAndChoices";
import { QuestionWithMultipleChoices } from "../QuestionWithMultipleChoices";
import { ContentRendererProps } from "./interface";

function ContentRenderer({ filterContent, questions }: ContentRendererProps) {
  const [themeColor, setThemeColor] = useState<boolean>(true);

  let dynamicHeight: any = useDynamicHeight();

  // gen_choice

  const [selectedChoices, setSelectedChoices] = useState({});

  //gen_choice_multi

  const [selectedMultiChoices, setSelectedMultiChoices] = useState({});

  // file_all and file_img

  const [uploadedFile, setUploadedFile] = useState<any>([]);

  // select type of ide to shown as task

  const selectCourseIde = (type) => {
    switch (type) {
      case "CODE_JS":
        return { type: "JS", isEditor: true };

      case "CODE_PY":
        return { type: "PY", isEditor: true };

      case "CODE_HTML":
        return { type: "HTML", isEditor: true };

      case "GEN_FLOW":
        return { type, isEditor: false };

      case "GEN_CHOICE":
        return { type, isEditor: false };

      case "GEN_CHOICE_MULTI":
        return { type, isEditor: false };

      case "FILE_IMG":
        return { type, isEditor: false };

      case "FILE_ALL":
        return { type, isEditor: false };

      default:
        return;
    }
  };

  // to hadle choice select radio button

  const handleChoiceSelect = (question: any, choice: any) => {
    let providedAnswer = { question, choice, [question]: choice };

    setSelectedChoices({
      question: providedAnswer.question,
      choice: providedAnswer.choice,
      [question]: choice,
    });
  };

  // to handle multiple choices select using checkbox

  const handleMultiChoicesSelect = (question: any, choice: any) => {
    setSelectedMultiChoices((prevSelectedChoices) => {
      const currentChoices = prevSelectedChoices[question] || [];
      let updatedChoices: any;

      if (currentChoices.includes(choice)) {
        // If the choice is already selected, remove it
        updatedChoices = currentChoices.filter((c) => c !== choice);
      } else {
        // If the choice is not selected, add it
        updatedChoices = [...currentChoices, choice];
      }

      return {
        ...prevSelectedChoices,
        question,
        choice: updatedChoices,
        [question]: updatedChoices,
      };
    });
  };

  const handleFileUpload = (file: any) => {
    setUploadedFile([...uploadedFile, file]);
  };

  return (
    <>
      <div className="col-sm-12">
        {selectCourseIde(filterContent)?.isEditor ? (
          // JS, PY and HTML

          <></>
          // <CodeEditor
          //   timeInSec={30}
          //   // value={studentProgramData}
          //   courseIde={selectCourseIde(filterContent)?.type}
          //   themeCallBack={(theme) => setThemeColor(theme)}
          //   // codeOutput={codeOutput}
          //   // isLoading={isLoadingSubmitButton}
          //   // isFromStudentTask
          //   // onSubmit={(code) => {
          //   // }}
          // />
        ) : !selectCourseIde(filterContent)?.isEditor &&
          // Flow Diagram

          filterContent === "GEN_FLOW" ? (
          <FlowDiagram />
        ) : !selectCourseIde(filterContent)?.isEditor &&
          filterContent === "GEN_CHOICE" ? (
          <div
            className="container-fluid mt-4 overflow-auto overflow-hide"
            style={{
              height:
                dynamicHeight.dynamicWidth <= 1400
                  ? dynamicHeight.dynamicHeight - 139
                  : dynamicHeight.dynamicHeight - 44,
            }}
          >
            <div>
              <h1 className="text-center text-white">{"Questionnaire"}</h1>
              <div className="row">
                {/* // question with choice select one option */}
                <QuestionAndChoices
                  question={questions.question}
                  choices={questions.choices}
                  selectedChoice={selectedChoices[questions.question]}
                  onChoiceSelect={(choice) =>
                    handleChoiceSelect(questions.question, choice)
                  }
                />
              </div>
              <div className="text-center mt-3">
                <Button
                  className="btn btn-primary"
                  text={"Submit"}
                  onClick={() => { }}
                />
              </div>
            </div>
          </div>
        ) : filterContent === "GEN_CHOICE_MULTI" ? (
          <div
            className="container-fluid mt-4 overflow-auto overflow-hide"
            style={{
              height:
                dynamicHeight.dynamicWidth <= 1400
                  ? dynamicHeight.dynamicHeight - 139
                  : dynamicHeight.dynamicHeight - 44,
            }}
          >
            <div>
              <h1 className="text-center text-white">{"Questionnaire"}</h1>
              <div className="row">
                {/* // question with choice select multi option */}

                <QuestionWithMultipleChoices
                  question={questions.question}
                  choices={questions.choices}
                  selectedChoices={
                    selectedMultiChoices[questions.question] || []
                  }
                  onChoiceSelect={(question, choice) =>
                    handleMultiChoicesSelect(questions.question, choice)
                  }
                />
              </div>

              <div className="text-center mt-3">
                <Button
                  className="btn btn-primary"
                  text={"Submit"}
                  onClick={() => { }}
                />
              </div>
            </div>
          </div>
        ) : filterContent === "FILE_IMG" ? (
          <div className="text-white pointer">
            <div className="container mt-4">
              <h1 className="text-center text-white">{"Upload Image"}</h1>

              {/* // Image upload */}
              <FileUploader
                onFileUpload={handleFileUpload}
                isImageUpload
                onClick={(imageArr) => { }}
              />
            </div>
          </div>
        ) : (
          filterContent === "FILE_ALL" && (
            <div className="container mt-4 text-white pointer">
              <h1 className="text-center text-white pointer">
                {"Upload File"}
              </h1>
              {/* /file upload any */}
              <FileUploader
                onFileUpload={handleFileUpload}
                onClick={(fileArr) => { }}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}

export { ContentRenderer };
