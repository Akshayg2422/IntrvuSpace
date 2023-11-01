import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { useDynamicHeight } from "@Hooks";
// import { settingStudentProgramData } from "@Redux";


const CodeEditorWindow = ({ value, onChange, language, fileType, ide, theme, isFromStudentTask }) => {

  const dispatch = useDispatch();
  const editorRef = useRef<any>(null);
  const { studentProgramData, isExpandCodeEditor
  } = useSelector(
    (state: any) => state.DashboardReducer
  );


  let dynamicHeight: any = useDynamicHeight()
  let height = window.innerHeight

  const selectedLanguage = (value: any) => {
    let selectedFileName = fileType

    switch (selectedFileName) {
      case "javascript": {
        onChange("JS", value)
        break;
      }
      case "css": {
        onChange("CSS", value)
        break;
      }
      case "html": {
        onChange("HTML", value)
        break;
      }
      default:
      // onChange("JS", value)

    }


    return
  }


  // useEffect(() => {
  //   editorRef.current?.focus();
  // }, [fileType]);


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Set the font-size style property of the editor's container element
    const editorContainer = editor.getDomNode();
    editorContainer.style.fontSize = '20px';

    // Call the layout method to force the editor to re-layout and recalculate its size
    editor.layout();
  };

  return (
    <>
      {/* <div>{height}</div> */}
      <Editor
        className=""
        height={isExpandCodeEditor ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 36 : dynamicHeight.dynamicHeight - 44 : '80vh'}
        theme={ide === 'HTML' ? 'vs-light' : theme ? "vs-dark" : ""}
        path={fileType}
        value={value}
        onChange={selectedLanguage}
        language={ide === "HTML" ? fileType : language}
        options={{
          scrollbar: {
            alwaysConsumeMouseWheel: false,
            vertical: 'hidden',
            horizontal: 'hidden',
          },
          overviewRulerLanes: 0,
          // readOnly: false,
          minimap: { enabled: false },
        }}

        onMount={(editor) => (editorRef.current = editor)}
      />
    </>
  );
};
export { CodeEditorWindow };
