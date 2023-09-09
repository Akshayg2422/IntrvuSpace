import { useDynamicHeight } from "@Hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OutputWindow = ({ iframeId, ide, outputDetails, theme, onClearClick }) => {
    const [outputData, setOutputData] = useState<any>()
    let dynamicHeight: any = useDynamicHeight()

    const { studentProgramData, isExpandCodeEditor
    } = useSelector(
        (state: any) => state.DashboardReducer
    );
    useEffect(() => {
        setOutputData(outputDetails)
    }, [outputDetails])

    const getOutput = (id: any) => {
        let content: any
        switch (id) {
            case 6:
                content = (<div className="px-2 py-1 font-normal text-xs text-red">
                    {atob(outputData?.compile_output)}
                </div>)
                break;
            case 3:
                content = (<pre className={`font-normal text-xs text-green`}>
                    {atob(outputData.stdout) !== null && outputData.stdout !== null
                        ? `${atob(outputData.stdout)}`
                        : null}
                </pre>)
                break;
            case 5:
                content = (
                    <div className="px-2 py-1 font-normal text-xs text-red">
                        {`Time Limit Exceeded`}
                    </div>
                );
                break;
            case 11:
                content = (
                    <div className="px-2 py-1 font-normal text-xs text-red">
                        {atob(outputData.stderr)}
                    </div>
                );
                break;

            case 1:
                content = (<div className="px-2 py-1 font-normal text-xs text-white">{'hiuiii'}</div>)
                break;

            default:
                content = (<div className="px-2 py-1 font-normal text-xs text-white"></div>)
        }
        return content
    };


    return (
        <>
            {ide === "HTML" &&
                <div>
                    <iframe id={iframeId} title={iframeId} style={{ backgroundColor: "#FFFFFF", width: '100%', height: isExpandCodeEditor ? '94vh' : "80vh" , border:'2px solid #FFFFFF' }} />
                </div >
            }
            {ide !== "HTML" && <div className={``}>
                <div className={` ${isExpandCodeEditor ? "bg-white" : '#1E1E1E'} px-3  ml-0 row justify-content-between mr-0`} style={{ border: theme ? '' : "2px solid #ffffff", padding: '3.3px 0px 3.3px 0px', backgroundColor: theme ? "#1E1E1E" : "#ffffff" }}>
                    <span className={`font-weight-bold text-${outputData?.status?.id === 11 ? 'danger' : ''} mt-1`} style={{ fontSize: '14px', marginTop: '1px' }}>
                        {/* {outputData?.status?.id === 11 ? translate('common.error') : outputData === null ? translate("guest.codeExecutionPending") : translate('common.result')} */}
                    </span>
                    {/* <Button text={'Clear'}
                        // color={'#fcfafa'} 
                        style={{ border: '1px solid rgba(0, 0, 0, 0.05)' }}
                        className=""
                        onClick={onClearClick}
                    // onClick={() => {
                    //   setOutputData(null)
                    // }}
                    /> */}
                    <div className={`pointer ${theme ? 'text-white' : 'text-dark'}`} onClick={onClearClick}>{"Clear"}</div>
                </div>

                <div className={``}>
                    <div className={`overflow-auto scroll-hidden`} style={{ backgroundColor: theme ? '#1E1E1E' : '#FFFFFF', height: isExpandCodeEditor ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 39 : dynamicHeight.dynamicHeight - 44 : "79.9vh", width: '100%', overflowX: 'hidden' }}>
                        {outputData ? <div className="mt-2 ml-2 overflow-auto scroll-hidden" >{getOutput(outputData?.status?.id)}</div> : null}
                    </div>
                </div>
            </div>}

        </>
    );
};

export { OutputWindow };

