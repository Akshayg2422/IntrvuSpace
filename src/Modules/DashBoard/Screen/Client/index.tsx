import { Button, Modal, SearchInput, TopNavbar } from '@Components'
import { useInput } from '@Hooks'
import { CodeEditor, FromCollection, FromJD, FromSkills } from '@Modules'
import { setSelectedSection } from '@Redux'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tooltip, UncontrolledTooltip } from 'reactstrap'

function Clients() {

    const search = useInput('');
    // const INTERVIEW_TYPE = [
    //     {
    //         id: 1, title: 'From Collection'
    //     },
    //     {
    //         id: 2, title: 'From JD'
    //     },
    //     {
    //         id: 3, title: 'From Skills'
    //     }
    // ]

    const dispatch = useDispatch()
    const { selectedSection } = useSelector((state: any) => state.DashboardReducer)

    const [isOpenIdeModal, setIsOpenIdeModal] = useState<boolean>(false)


    const apiResponse = {
        "response_type":"CODE_JS",
        "message":"Write a JavaScript program to display the current day and time in the following format.",  
        Sample_Output : "Today is : Tuesday.",
        "current_time" : "10 PM : 30 : 38",
        "time_out":30000
    }


    function renderComponent() {

        let component = <FromJD />

        // switch (selectedSection) {
        //     case 0:
        //         component = <FromCollection />
        //         break;
        //     case 1:
        //         component = <FromJD />
        //         break;
        //     case 2:
        //         component = <FromSkills />
        //         break;

        // }
        return component;
    }


    return (
        <>
            <TopNavbar />
            <div className={`container-fluid mt-7`}>
                <div className='row align-items-center'>
                    {/* <div className='col-sm-9 mb-sm-0 mb-2 px-2'>
                        <SearchInput defaultValue={search.value} onSearch={search.set} />
                    </div> */}

                    {/**ide modal .....................................................................................................................*/}

                    {/* <i className="bi bi-code-square text-primary pointer fa-lg" onClick={() => {
                        setIsOpenIdeModal(true)
                    }}
                        data-placement="top"
                        id="tooltip611234743"
                    >

                        <UncontrolledTooltip
                            delay={0}
                            placement="top"
                            target="tooltip611234743"
                        >
                            {"Open IDE"}

                        </UncontrolledTooltip>
                    </i> */}

                    {/**....................................................................................................................................... */}

                    
                    {/* {
                        INTERVIEW_TYPE.map((interview: any, index: number) => {
                            const { title } = interview;
                            const selected = index === selectedSection
                            return (
                                <div className='m-1 row col-xl  col-sm-3 px-1'>
                                    <Button
                                        block
                                        size={'md'}
                                        className={'shadow-none'}
                                        color={!selected ? 'neutral' : 'primary'}
                                        text={title}
                                        onClick={() => {
                                            dispatch(setSelectedSection(index));
                                        }}
                                    />
                                </div>
                            )
                        })
                    } */}
                </div >
                {
                    renderComponent()
                }

            </div >
            <Modal
                title='JavaScript IDE'
                isOpen={isOpenIdeModal}
                onClose={() => setIsOpenIdeModal(false)}
                size='xl'>
                <CodeEditor
                    // value={studentProgramData}
                    courseIde={apiResponse.response_type === 'CODE_JS' ? 'JS': apiResponse.response_type === 'CODE_PY' ? "PY" : "HTML"}
                    // codeOutput={codeOutput}
                    // isLoading={isLoadingSubmitButton}
                    // isFromStudentTask
                    onSubmit={(code) => {

                        //   if ((courseIde === "HTML")) {

                        //     onSubmit(studentWrittenQuestion, studentProcedureData, studentFlowDiagramData, window.btoa(code))
                        //   }
                        //   else {

                        //     if (codeOutputData && codeOutputData?.status?.id !== 11) {

                        //       onSubmit(studentWrittenQuestion, studentProcedureData, studentFlowDiagramData, window.btoa(code))
                        //     }
                        //     else if (codeOutputData?.status?.id === 11) {


                        //       showToast('error', translate('editor.codeError')!)
                        //     }

                        //     else if ((code && !codeOutputData && !codeOutput)) {

                        //       showToast('info', translate('editor.noRunError')!)
                        //     }
                        //     else if (!code) {

                        //       showToast('info', translate('editor.noCodeError')!)
                        //     }

                        //     else {

                        //       onSubmit(studentWrittenQuestion, studentProcedureData, studentFlowDiagramData, window.btoa(code))
                        //     }
                        //     // dispatch(settingStudentProgramData(btoa(code)))
                        //   }
                    }}
                />
            </Modal>
        </>
    )
}

export { Clients }
