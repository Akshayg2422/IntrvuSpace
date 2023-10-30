// import { icons } from "@Assets";
// import { Button, Image, showToast } from "@Components";
// import { useApp } from "@Contexts";
// import { translate } from "@I18n";
// import { CodeEditorWindow, CountDownTimer, OutputWindow } from "@Modules";
// import { postStudentCodeSubmission, settingCodeOutputData } from "@Redux";
// // import { isExpandCodeEditorAction, postStudentCodeSubmission, setCodeOutputData, settingStudentProgramData } from "@Redux";
// import defineTheme from "@Themes//DefaultThemes/defineTheme";
// import { languageOptions } from "@Utils";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "react-toastify/dist/ReactToastify.css";
// import { Spinner as RsSpinner } from "reactstrap";
// // import { CodeEditorWindow, OutputWindow } from "../../Container";

// interface Props {
//   ref?: any;
//   onSubmit?: (value) => void;
//   value?: any;
//   showAddSubmit?: boolean;
//   isLoading?: boolean;
//   showExpand?: boolean;
//   codeOutput?: any;
//   codeSubmit?: () => void;
//   courseIde?: any;
//   isFromStudentTask?: boolean;
//   isMyTask?: boolean;
//   isGuestTask?: boolean;
//   themeCallBack?: (val) => void;
//   timeInSec?: any;
// }

// const CodeEditor = React.forwardRef(
//   ({
//     ref,
//     onSubmit,
//     value,
//     showAddSubmit = false,
//     isLoading,
//     showExpand = false,
//     codeOutput,
//     codeSubmit,
//     courseIde,
//     isFromStudentTask = false,
//     isMyTask = false,
//     isGuestTask = false,
//     themeCallBack,
//     timeInSec,
//     ...props
//   }: Props) => {
//     console.log("courseIde checkkk--->", courseIde);
//     const dispatch = useDispatch();
//     const { isExpandCodeEditor, codeOutputData } = useSelector(
//       (state: any) => state.DashboardReducer
//     );

//     const [javaScript, setJavaScript] = useState<any>("");
//     const [styleCSS, setStyleCSS] = useState<any>("");
//     const [htmlValue, setHTMLValue] = useState<any>("");
//     const [fileName, setFileName] = useState<any>("javascript");
//     const [language, setLanguage] = useState<any>();
//     const [programData, setProgramData] = useState<any>();
//     const [allProgramData, setAllProgramData] = useState<any>();

//     // -------------------------------------------------------------------------------

//     const [outputDetails, setOutputDetails] = useState<any>();
//     // const [run, setRun] = useState(codeOutput)
//     const [processing, setProcessing] = useState<any>(null);
//     const [theme, setTheme] = useState<any>("vs-dark");
//     const [testing, setTesting] = useState<any>();
//     const [themeMode, setThemeMode] = useState(true);
//     const [screenPadding, setScreenPadding] = useState("mx-0");
//     const [isExpand, setIsExpand] = useState(true);
//     const [editorOptions, setEditorOptions] = useState([
//       { id: 1, lang: "JS", codeValue: "" },
//       { id: 2, lang: "CSS", codeValue: "" },
//       { id: 3, lang: "HTML", codeValue: "" },
//     ]);
//     const [previousCode, setPreviousCode] = useState("");

//     // const { focus, setFocus } = useApp()

//     const [statusButton, setStatusButton] = useState(
//       courseIde !== "HTML" ? icons.playWhite : icons.playBlack
//     );

//     // useEffect(() => { // already commented
//     //     setOutputDetails(codeOutput)

//     // }, [codeOutput])

//     // console.log("outputDetails", outputDetails)

//     useEffect(() => {
//       return () => {
//         setAllProgramData(undefined);
//         setHTMLValue("");
//         setStyleCSS("");
//         setJavaScript("");
//         setProgramData(undefined);
//       };
//     }, []);

//     // ---------------------------------------------------------------------------------------------------

//     useEffect(() => {
//       // commented for now
//       settingLanguage(courseIde);

//       if (courseIde === "HTML") {
//         setJavaScript(value ? value.js : " ");
//         setStyleCSS(value ? value.css : " ");
//         setHTMLValue(value ? value.html : " ");
//         setProgramData(value ? value.js : " ");
//       } else {
//         setJavaScript(value ? value : "");
//         setProgramData(value ? value : "");
//         setPreviousCode(btoa(value));
//       }
//       checking();

//       settingLanguage(courseIde);
//     }, [value, courseIde]);

//     const checking = () => {
//       if (courseIde === "HTML")
//         setTimeout(async () => {
//           await handleCompile();
//         }, 2000);
//     };

//     // console.log("codeOutputjs========", codeOutput)
//     // console.log("previousCode---", previousCode)
//     // console.log("codeOutput", value)

//     const settingLanguage = (ide) => {
//       languageOptions.find((el: any) => {
//         if (ide === el.ide && el.ide === "HTML") {
//           setLanguage(el);
//         } else if (ide === el.ide) {
//           setLanguage(el.value);
//           setTesting(el);
//         }
//       });
//     };

//     const onChangeHandler = (action: any, data: any) => {
//       console.log("datttaa-->", data);
//       console.log("action", action, data);
//       switch (action) {
//         case "JS": {
//           setJavaScript(data);
//           break;
//         }
//         case "CSS": {
//           setStyleCSS(data);
//           break;
//         }
//         case "HTML": {
//           setHTMLValue(data);
//           break;
//         }
//       }
//     };

//     // console.log("courseide", courseIde)

//     function isBase64(str) {
//       try {
//         return window.btoa(window.atob(str)) === str;
//       } catch (err) {
//         return false;
//       }
//     }

//     const convertToBase64 = (code: any) => {
//       const convertFromBase64 = window.atob(code);
//       return window.btoa(convertFromBase64);
//     };

//     function handleThemeChange(th) {
//       //{label: 'Active4D', value: 'active4d', key: 'active4d'}
//       //{label: 'krTheme', value: 'krtheme', key: 'krtheme'}
//       // const theme = th;
//       // if (["vs-dark"].includes(theme.value)) {
//       //     setTheme(theme);
//       // } else {
//       //     defineTheme(theme.value).then((_) => setTheme(theme));
//       // }
//     }
//     // console.log("courseide===>", outputDetails)

//     useEffect(() => {
//       // defineTheme("vs-dark").then((_) =>
//       //     setTheme({ label: 'krTheme', value: 'vs-dark', key: 'krtheme' })
//       // );
//     }, []);

//     // useEffect(() => { // commented for now
//     //     const langOptions = editorOptions.filter((item) => {
//     //         if (item.lang === 'JS') {
//     //             return { ...item, value: javaScript }
//     //         }
//     //         else if (item.lang === 'CSS') {
//     //             return { ...item, value: styleCSS }
//     //         }

//     //         else if (item.lang === 'HTML') {
//     //             return { ...item, value: htmlValue }
//     //         }
//     //     })

//     //     setEditorOptions(langOptions)
//     // }, [])

//     const handleCompile = () => {
//       setProcessing(true);
//       // const iframe = document.getElementById('output') as HTMLIFrameElement;

//       if (courseIde === "HTML") {
//         console.log("courseide", courseIde);
//         setAllProgramData(
//           JSON.stringify({
//             js: javaScript,
//             css: styleCSS,
//             html: htmlValue,
//           })
//         );
//         const iframe: any = document.getElementById(
//           "output"
//         ) as HTMLIFrameElement;
//         const iframeDoc: any = iframe?.contentDocument;
//         const iframeHead: any = iframeDoc?.head;
//         const iframeBody: any = iframeDoc?.body;

//         if (iframeHead) {
//           iframeHead.innerHTML = `
//         <style>${styleCSS}</style>
//         <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
//     `;
//         }
//         if (iframeBody) {
//           iframeBody.innerHTML = htmlValue;
//           const script = iframeDoc.createElement("script");
//           script.textContent = javaScript;
//           iframeBody.appendChild(script);

//           iframe.onload = () => {
//             iframe.setAttribute(
//               "srcdoc",
//               `
//             <html>
//                 <head>${iframeHead.innerHTML}</head>
//                 <body>${iframeBody.innerHTML}</body>
//                 <script>${javaScript}</script>
//             </html>
//         `
//             );
//           };
//         }
//         // } else {
//         //     console.log("00000000000000000000000000000000000000")
//         // }

//         setTimeout(() => {
//           setProcessing(false);
//         }, 500);
//         // console.log("iframe", iframe)
//       } else {
//         setAllProgramData(window.btoa(javaScript));

//         setPreviousCode(
//           isBase64(javaScript)
//             ? convertToBase64(javaScript)
//             : window.btoa(javaScript)
//         );

//         const params = {
//           source_code: isBase64(javaScript)
//             ? convertToBase64(javaScript)
//             : window.btoa(javaScript),
//           language_id: testing?.id,
//           number_of_runs: null,
//           stdin: "SnVkZ2Uw",
//           expected_output: null,
//           cpu_time_limit: null,
//           cpu_extra_time: null,
//           wall_time_limit: null,
//           memory_limit: null,
//           stack_limit: null,
//           max_processes_and_or_threads: null,
//           enable_per_process_and_thread_time_limit: null,
//           enable_per_process_and_thread_memory_limit: null,
//           max_file_size: null,
//           enable_network: null,
//         };

//         dispatch(
//           postStudentCodeSubmission({
//             params,
//             onSuccess: (success: any) => () => {
//               setOutputDetails(success);

//               setProcessing(false);
//               if (success?.status?.id === 11) {
//                 setStatusButton(icons.cancel);
//                 setTimeout(() => {
//                   setStatusButton(
//                     themeMode ? icons.playWhite : icons.playBlack
//                   );
//                 }, 1500);
//               } else {
//                 setStatusButton(icons.tickGreen);
//                 setTimeout(() => {
//                   setStatusButton(
//                     themeMode ? icons.playWhite : icons.playBlack
//                   );
//                 }, 1500);
//               }
//               dispatch(settingCodeOutputData(success)); // edit
//             },
//             onError: (error: any) => () => {
//               setProcessing(false);
//             },
//           })
//         );
//       }
//     };

//     // console.log("111111111111111111111---", (isBase64(javaScript) ? convertToBase64(javaScript) : window.btoa(javaScript)))
//     // console.log("2222222222222222222222---", previousCode)
//     return (
//       <div
//         className=""
//         style={{
//           backgroundColor:
//             courseIde === "HTML"
//               ? "#FFFFFF"
//               : themeMode
//               ? "#1E1E1E"
//               : "#ffffff",
//         }}
//       >
//         <div className={`row  mx-1 `}>
//           <div
//             className={`col-sm-6`}
//             style={{
//               paddingRight: "0px",
//               paddingLeft: "0px",
//               borderRight: themeMode
//                 ? "1px solid #808080"
//                 : " 1px solid #808080",
//               borderBottom: "",
//               borderLeft: "",
//               // backgroundColor: themeMode ? "#1E1E1E" : "#FFFFFF"
//             }}
//           >
//             {
//               <div
//                 className={`py-1 ${
//                   isExpandCodeEditor ? "#1E1E1E" : "#1E1E1E"
//                 } ${themeMode ? "#1E1E1E" : "#1E1E1E"}`}
//                 style={{
//                   border:
//                     courseIde === "HTML"
//                       ? "2px solid #FFFFFF"
//                       : themeMode
//                       ? "2px solid #1E1E1E"
//                       : "2px solid #FFFFFF",
//                   padding: "-5px 0px -5px 0px",
//                   backgroundColor:
//                     courseIde === "HTML"
//                       ? "#FFFFFF"
//                       : themeMode
//                       ? "#1E1E1E"
//                       : "#FFFFFF",
//                 }}
//               >
//                 <div className="">
//                   <div className="row">
//                     <div className="row ml-4">
//                       <img
//                         src={
//                           courseIde === "PY"
//                             ? icons.pythonLogo
//                             : icons.defaultImage
//                         }
//                         height={23}
//                         className=""
//                         alt="..."
//                       />
//                       <div style={{ fontSize: "12px" }}>
//                         <span
//                           className={`font-weight-bold ml-1 mt-1 ${
//                             courseIde === "HTML"
//                               ? "text-dark"
//                               : themeMode
//                               ? "text-white"
//                               : "text-dark"
//                           }`}
//                         >
//                           {"Editor"}
//                         </span>
//                       </div>
//                     </div>
//                     {courseIde === "HTML" && (
//                       <div className="row ml-4">
//                         <Button
//                           size="sm"
//                           className={`${
//                             fileName === "javascript"
//                               ? "bg-primary text-white"
//                               : "bg-white text-dark"
//                           } ml-2`}
//                           style={{ border: "2px solid rgba(0, 0, 0, 0.05)" }}
//                           text="JS"
//                           disabled={fileName === "javascript"}
//                           onClick={() => {
//                             setFileName("javascript");
//                             setProgramData(javaScript);
//                           }}
//                         />
//                         <Button
//                           size="sm"
//                           className={`${
//                             fileName === "css"
//                               ? "bg-primary text-white"
//                               : "bg-white text-dark"
//                           }`}
//                           style={{ border: "2px solid rgba(0, 0, 0, 0.05)" }}
//                           text="CSS"
//                           disabled={fileName === "css"}
//                           onClick={() => {
//                             setFileName("css");
//                             setProgramData(styleCSS);
//                           }}
//                         />
//                         <Button
//                           size="sm"
//                           className={`${
//                             fileName === "html"
//                               ? "bg-primary text-white"
//                               : "bg-white text-dark"
//                           }`}
//                           style={{ border: "2px solid rgba(0, 0, 0, 0.05)" }}
//                           text="HTML"
//                           disabled={fileName === "html"}
//                           onClick={() => {
//                             setFileName("html");
//                             setProgramData(htmlValue);
//                           }}
//                         />
//                       </div>
//                     )}

//                     {/**Count down timer */}

//                     <div
//                       className={`col-${
//                         courseIde === "HTML" ? 4 : 6
//                       } justify-content-end d-flex ${
//                         courseIde === "HTML"
//                           ? "text-dark"
//                           : themeMode
//                           ? "text-white"
//                           : "text-dark"
//                       }`}
//                     >
//                       <CountDownTimer timeInSec={timeInSec} />
//                     </div>

//                     <div className="col text-right mr-2">
//                       {/* Full screen */}
//                       {/* {!showExpand &&
//                                             <Image src={!isExpandCodeEditor ? icons.expand : icons.minimize} height={25}
//                                                 className="px-2 mr-2"
//                                                 style={{ border: '2px solid rgba(0, 0, 0, 0.05)' }}
//                                                 onClick={() => {
//                                                     // dispatch(isExpandCodeEditorAction(!isExpandCodeEditor))
//                                                     setIsExpand(!isExpand)
//                                                     if (isExpandCodeEditor) {
//                                                         setScreenPadding('px-4')
//                                                     }
//                                                     else {
//                                                         setScreenPadding('d-flex pl--4')
//                                                     }
//                                                 }}
//                                             />
//                                         } */}

//                       {/* theme image */}
//                       {courseIde !== "HTML" && (
//                         <Image
//                           src={themeMode ? icons.darkWhite : icons.moon}
//                           height={18}
//                           className="px-2  mr-2 pointer"
//                           style={{ border: "2px solid rgba(0, 0, 0, 0.05)" }}
//                           onClick={() => {
//                             setThemeMode(!themeMode);
//                             if (themeCallBack) {
//                               themeCallBack(!themeMode);
//                             }
//                             if (!themeMode) {
//                               setStatusButton(icons.playWhite);
//                             } else {
//                               setStatusButton(icons.playBlack);
//                             }
//                             if (!themeMode) {
//                               handleThemeChange({
//                                 label: "krTheme",
//                                 value: "vs-dark",
//                                 key: "krtheme",
//                               });
//                             } else {
//                               handleThemeChange({
//                                 label: "Active4D",
//                                 value: "active4d",
//                                 key: "active4d",
//                               });
//                             }
//                           }}
//                         />
//                       )}

//                       {/* play button */}

//                       {processing ? (
//                         <RsSpinner
//                           className="mr-3 "
//                           color="success"
//                           as="span"
//                           variant="warning"
//                           size="sm"
//                           role="status"
//                           aria-hidden="true"
//                           animation="grow"
//                         />
//                       ) : (
//                         <Image
//                           src={statusButton}
//                           height={18}
//                           className="mr-3 pointer"
//                           onClick={() => {
//                             // if (setFocus) {
//                             //     setFocus('')
//                             // }

//                             if (javaScript || styleCSS || htmlValue) {
//                               handleCompile();
//                             } else {
//                               showToast(
//                                 "Please type some code to run",
//                                 "error"
//                               );
//                             }
//                           }}
//                         />
//                       )}
//                       <Button text={"submit"} onClick={() => {}} />

//                       {/* <div className={`${themeMode ? "text-white" : "" } pr-2 pt-2`}>
//                         <CountDownTimer timeInMin={timeInMin} />
//                       </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             }
//             <CodeEditorWindow
//               ide={courseIde}
//               value={isBase64(programData) ? atob(programData) : programData}
//               fileType={fileName}
//               onChange={onChangeHandler}
//               language={language}
//               theme={themeMode}
//               isFromStudentTask={isFromStudentTask}
//             />
//           </div>
//           <div
//             className={`col-sm-6 ${
//               isExpandCodeEditor ? "" : "pt-sm-0 pt-xl-0 pt-3"
//             }`}
//             style={{
//               paddingLeft: "0px",
//               paddingRight: "0px",
//               backgroundColor:
//                 courseIde === "HTML"
//                   ? "#FFFFFF"
//                   : themeMode
//                   ? "#1E1E1E"
//                   : "#FFFFFF",
//             }}
//           >
//             {courseIde === "HTML" && (
//               <div
//                 className={` ${isExpandCodeEditor ? "bg-white" : "bg-white"}`}
//                 style={{
//                   border: themeMode ? "2px solid #FFFFFF" : "2px solid #FFFFFF",
//                   padding: "18px 0px 18px 0px",
//                 }}
//               >
//                 {/* <Button
//                             text={"run"}
//                             className='bg-white text-black ml-3'
//                             style={{ border: '2px solid rgba(0, 0, 0, 0.05)'  }}
//                             onClick={() => handleCompile()} /> */}
//               </div>
//             )}
//             <OutputWindow
//               ide={courseIde}
//               iframeId={"output"}
//               outputDetails={codeOutputData}
//               theme={themeMode}
//               onClearClick={() => {
//                 dispatch(settingCodeOutputData(undefined));
//                 setOutputDetails(null);
//               }}
//             />
//           </div>
//         </div>
//         {/* {!isGuestTask ?
//                 ((isMyTask || !showAddSubmit && !isExpandCodeEditor && outputDetails?.status?.id !== 11 && outputDetails !== null) || (courseIde === "HTML" && !isExpandCodeEditor && !showAddSubmit)) && <div className="text-right mt-2 pb-3">

//                     <Button
//                         text={isMyTask ? 'Save' : "Submit for approval"}
//                         size={'md'}
//                         isLoading={isLoading}
//                         disabled={(isBase64(javaScript) ? convertToBase64(javaScript) : window.btoa(javaScript)) !== previousCode}
//                         onClick={() => {
//                             // if (setFocus)
//                             //     setFocus('')
//                             if (onSubmit) {
//                                 if (courseIde === "HTML") {
//                                     const programData = {
//                                         js: javaScript,
//                                         css: styleCSS,
//                                         html: htmlValue
//                                     }
//                                     onSubmit(programData)

//                                 }
//                                 else {
//                                     // dispatch(settingStudentProgramData(btoa(javaScript)))
//                                     const programData = javaScript

//                                     const currentCode = isBase64(javaScript) ? convertToBase64(javaScript) : window.btoa(javaScript)
//                                     console.log("programdatata==>", currentCode)


//                                     if (currentCode === previousCode) {
//                                         onSubmit(javaScript)
//                                     }
//                                     else {
//                                         // showToast('info', translate('editor.codeCompareError')!)
//                                     }
//                                 }
//                             }
//                         }
//                         }
//                     />
//                 </div>
//                 :
//                 <div className="text-right mt-2 pb-3">
//                     <Button
//                         text={"Save"}
//                         size="md"
//                         onClick={() => {
//                             // dispatch(settingStudentProgramData(javaScript))
//                             // if (setFocus) {
//                             //     setFocus('')
//                             // }
//                             if (onSubmit) {
//                                 onSubmit(javaScript)
//                             }
//                         }}
//                     />
//                 </div>
//             } */}
//       </div>
//     );
//   }
// );
// export { CodeEditor };

import React from 'react'

function CodeEditor() {
  return (
    <div>CodeEditor</div>
  )
}

export { CodeEditor }
