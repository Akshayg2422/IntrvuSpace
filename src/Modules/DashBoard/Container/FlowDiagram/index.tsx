import { Back, Button } from "@Components";
import { useNavigation } from '@Hooks';
import { translate } from '@I18n';
// import { fetchTaskDetails, isBackNavigation, postTaskByStudent, settingFlowDiagramImage, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData, settingStudentWrittenQuestion } from '@Redux';
import { TDExport, TDExportType, Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ACTION = 'download' as 'download' | 'open'

const FlowDiagram = () => {

  const dispatch = useDispatch();
  const { goTo, goBack } = useNavigation()

  // const { getStudentTaskDetails, dashboardDetails, studentWrittenQuestion, studentProcedureData, addStudentTaskResponseId, studentProgramData, studentFlowDiagramData } = useSelector(
  //   (state: any) => state.DashboardReducer
  // );

  // const { codeOutputData } = useSelector(
  //   (state: any) => state.GuestReducer
  // );


  const [myDocument, setMyDocument] = useState<any>({
    id: 'doc',
    version: TldrawApp.version,
    pages: {
      page1: {
        id: 'page1',
        shapes: {},
        bindings: {},
      },
    },
    pageStates: {
      page1: {
        id: 'page1',
        selectedIds: [],
        currentParentId: 'page1',
        camera: {
          point: [0, 0],
          zoom: 1,
        },
      },
    },
    assets: {},
  })

  const [url, setUrl] = useState<any>()
  const [base64Data, setBase64Data] = useState<any>()
  const fileSystemEvents = useFileSystem();
  // const [flowDiagramImage, setFlowDiagramImage] = useState("")
  const [flowDiagramData, setFlowDiagramData] = useState<any>({
    id: 'doc',
    version: TldrawApp.version,
    pages: {
      page1: {
        id: 'page1',
        shapes: {},
        bindings: {},
      },
    },
    pageStates: {
      page1: {
        id: 'page1',
        selectedIds: [],
        currentParentId: 'page1',
        camera: {
          point: [0, 0],
          zoom: 1,
        },
      },
    },
    assets: {},
  })

  useEffect(() => {
    // getGuestTaskDetails()
  }, [])

  useEffect(() => {
    handleClickData()
  }, [url])


  // const getTaskMetaDetailsHandler = () => {
  //   if (getStudentTaskDetails && getStudentTaskDetails.length > 0) {
  //     if (getStudentTaskDetails[0]?.task_meta) {
  //       return getStudentTaskDetails[0]?.task_meta
  //     }
  //     else if (getStudentTaskDetails[0]?.course_section) {
  //       return getStudentTaskDetails[0]?.course_section?.task_meta
  //     }
  //     else if (getStudentTaskDetails[0]?.course_topic) {
  //       return getStudentTaskDetails[0]?.course_topic?.task_meta
  //     }
  //     else return
  //   }
  //   return
  // }



  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  const handleExport = React.useCallback(async (app: TldrawApp, info: TDExport) => {
    // When a user exports, the default behavior is to download
    // the exported data as a file. If the onExport callback is
    // provided, it will be called instead.

    // Download the file
    const blobUrl = URL.createObjectURL(info.blob)
    const link = document.createElement('a')
    link.href = blobUrl
    setUrl(link.href)

    // link.download = info.name + '.' + info.type
    // link.click()
  }, [])


  const handleClickData = async () => {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      const arr: any = new Uint8Array(this.response);
      const raw = String.fromCharCode.apply(null, arr);
      console.log("rawwww===>", raw)
      const b64 = btoa(raw);
      if (url) {

        onSubmit(b64)
      }
      setBase64Data(b64)
      // console.log("b64", b64);
    };
    xhr.send();
  };



  const handleExportPNG = React.useCallback(() => {
    flowDiagramData?.exportImage(TDExportType.PNG, { scale: 1, quality: 3, color: 'white' })
  }, [flowDiagramData])

  // function trigger() {
  //   const event = new KeyboardEvent('keypress', {
  //     key: 'enter',
  //   });

  // }

  const onSubmit = (base64) => {
    // dispatch(settingFlowDiagramImage(base64))

    // const params = {
    //   id: getTaskMetaDetailsHandler()?.id,
    //   base_status: "ST",
    //   is_inprogress: true,
    //   task_meta_id: getStudentTaskDetails[0]?.id,
    //   formulated_question: studentWrittenQuestion,
    //   procedure: studentProcedureData,
    //   flow_diagram: [studentFlowDiagramData],
    //   ...(studentProgramData && { program: btoa(studentProgramData) }),
    //   image_of_flow_diagram: base64,
    //   code_output: codeOutputData ? (codeOutputData) : "",

    // }
    setSubmitLoader(true)
    // dispatch(postTaskByStudent({
    //   params,
    //   onSuccess: (success: any) => () => {
    //     console.log("base633==>", base64)
    //     setSubmitLoader(false)
    //     // getGuestTaskDetails()
    //     goBack()
    //     // disableCopyRightClickDnd(false)
    //   },
    //   onError: (error: any) => () => {
    //     setSubmitLoader(false)
    //   },
    // }))

  }

  // const getGuestTaskDetails = () => {
  //   const params = {
  //     task_meta_id: getTaskMetaDetailsHandler()?.id,
  //     student_id: dashboardDetails?.user_details?.employee_id,
  //   }

  //   dispatch(fetchTaskDetails({ //getTaskMetaDetails
  //     params,
  //     onSuccess: (success) => () => {
  //       // console.log("successflowowoww---->", success)
  //       if (success?.details?.details?.task_answer_details?.flow_diagram.length > 0) {
  //         setMyDocument(success?.details?.details?.task_answer_details?.flow_diagram[0])
  //       }

  //       dispatch(settingStudentWrittenQuestion(success?.details?.details?.task_answer_details?.formulated_question))
  //       dispatch(settingStudentProcedureData(success?.details?.details?.task_answer_details?.procedure))
  //       dispatch(settingStudentFlowDiagramData(success?.details?.details?.task_answer_details?.flow_diagram))
  //       dispatch(settingStudentProgramData(success?.details?.details?.task_answer_details?.program !== null ? atob(success?.details?.details?.task_answer_details?.program) : ""))


  //     },
  //     onError: (error) => () => {
  //     }
  //   }))
  // }

  return (
    <>
      <div className=" h-100vh pl-2"  >
        <div className="">
          <Tldraw

            document={myDocument}
            onExport={handleExport}
            autofocus
            showMenu={false}
            showStyles={false}
            showZoom={false}
            disableAssets={true}
            showPages={false}
            // {...fileSystemEvents}
            onChange={(app: any) => {
              // setMyDocument(app.state.document)
              setFlowDiagramData(app)
              // dispatch(settingStudentFlowDiagramData(app.state.document))
            }}
          />
        </div>
        <div className="" style={{ position: 'absolute', zIndex: 100 }} onClick={() => {
          // dispatch(isBackNavigation(true))
        }}>
          <Back />
        </div>
        <div className="mr-5" style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 100,
          marginBottom: '9px'
        }}>
          <Button text={translate("common.submit")!}
            isLoading={submitLoader}
            onClick={() => {
              handleExportPNG()
              handleClickData()
              // trigger()
              if (Object.keys(flowDiagramData.state.document).length !== 0) {


                // dispatch(settingStudentFlowDiagramData(flowDiagramData.state.document))
              }
            }} />
        </div>
      </div >

    </>

  );
}


export { FlowDiagram };
