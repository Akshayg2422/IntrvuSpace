import { Button, CommonTable, Divider, NoRecordsFound, Spinner } from '@Components';
import React, { useEffect, useRef, useState } from 'react'
import { Badge, Card, CardBody, CardHeader, CardTitle, DropdownItem, DropdownMenu, DropdownToggle, Media, Progress, Table, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap'
import ReactToPrint from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasicReport } from '@Redux';
import { useLoader } from '@Hooks';
import moment from 'moment';
import { useLinkClickHandler } from 'react-router-dom';

function Report() {


    const dispatch = useDispatch()
    const { scheduleId } = useSelector((state: any) => state.DashboardReducer)
    const [dataId, setDataId] = useState<any>(['trait', 'communication', 'skill_matrix'])
    const [basicReportData, setBasicReportData] = useState<any>([])

    const componentRef = useRef(null);
    let basicReportLoader = useLoader(false);
    const [check, setCheck] = useState<any>(0)


    useEffect(() => {
        getBasicReportData()
    }, [])

    useEffect(() => {
        if (basicReportData) {
            removeDuplicates()

        }
    }, [basicReportData])


    const getBasicReportData = () => {
        basicReportLoader.show()
        const params = {
            schedule_id: scheduleId?.id
        }

        dispatch(
            fetchBasicReport({
                params,
                onSuccess: (success) => () => {
                    basicReportLoader.hide()
                    console.log("success===>", success.details)
                    setBasicReportData(success.details)
                },
                onError: (error) => () => {
                    basicReportLoader.hide()
                },
            })
        );
    }



    const calculateRating = (data: any) => {

        let overallPercent = 0
        if (Array.isArray(data)) {
            data.length > 0 && data.filter((el) => {
                console.log("909090909090909090", +el?.rating)

                overallPercent = el?.percent ? +overallPercent + +el?.percent : +overallPercent + +el?.rating
            })
        }
        return overallPercent ? +overallPercent / data.length : 0
    }


    // const formatDateAndTime = (text) => {
    //     // Define the regex pattern to match multi numbers in date and time format
    //     const dateRegex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;

    //     // Function to replace matched date and time with formatted date and time
    //     const replaceDateAndTime = (match, year, month, day, hour, minute, second) => {
    //       const months = [
    //         'January', 'February', 'March', 'April', 'May', 'June', 'July',
    //         'August', 'September', 'October', 'November', 'December'
    //       ];

    //       // Format the date and time as desired
    //       const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
    //       const formattedTime = `${parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour}:${minute} ${parseInt(hour, 10) >= 12 ? 'pm' : 'am'}`;

    //       // Return the formatted date and time
    //       return `${formattedDate} ${formattedTime}`;
    //     };

    //     // Replace occurrences of multi numbers in date and time format with formatted date and time
    //     return text?.replace(dateRegex, replaceDateAndTime);
    //   };





    function removeDuplicates() {
        let count = 0
        Object.keys(basicReportData).map((el) => {
            console.log('opopopopo', el)
            if (el === 'skill_matrix') {
                basicReportData[el].sections.length > 0 && basicReportData[el].sections.map((item) => {
                    count = count + +basicReportData[el].overal_percent / basicReportData[el].sections.length
                })
            }
            else if (Array.isArray(basicReportData[el])) {
                basicReportData[el].length > 0 && basicReportData[el].map((it) => {
                    count = it.percent ? count + +it.percent / basicReportData[el].length : count + +it.rating / basicReportData[el].length
                })
            }
        })
        console.log("09090======================>", count)
        setCheck(count)
    }



    const commonTableHandler = (data) => {
        return data?.map((el: any) => {
            return {
                expected: el?.expected ? el?.expected : <div className='text-center'>-</div>,
                answered: el?.answered ? el?.answered : <div className='text-center'>-</div>,
                answered_partial: el?.answered_partial ? el?.answered_partial : <div className='text-center'>-</div>,
                invalid_partial: el?.invalid_partial ? el?.invalid_partial : <div className='text-center'>-</div>,
            };
        });
    }


    const loopFunction = (data: any) => {
        let array: any = []
        let length = 0

        Object.keys(data).forEach((items) => {
            if (items === 'expected_answer_key_points') {
                if (data[items]?.points?.length > length) {
                    length = data[items]?.points?.length
                }
            }
            else {
                if (Array.isArray(data?.suggestions[items])) {
                    if (data?.suggestions[items].length > length) {
                        length = data?.suggestions[items].length
                    }
                }
            }
        });

        for (let i = 0; i < length; i++) {
            array.push({
                answered: data?.suggestions['covered']?.length > 0 ? data?.suggestions?.covered[i] : '',
                answered_partial: data?.suggestions['covered_partial']?.length > 0 ? data?.suggestions?.covered_partial[i] : '',
                invalid_partial: data?.suggestions['covered_not_valid']?.length > 0 ? data?.suggestions?.covered_not_valid[i] : '',
            })
        }

        return array

    }






    const normalizedTableData = (data: any, heading: any) => {
        return (
            data.length > 0 && data.map((el, index) => {
                let array: any = loopFunction(el)

                return (
                    <div className='py-2'>
                        <div className=''>
                            <h5 className='text-black'>{`${index + 1}.${el.question}`}</h5>
                        </div>
                        <div className='ml-2 pl-1 pb-3 text-black'>
                            <h5 className='text-black'>Expected Key Points</h5>
                            {el?.expected_answer_key_points?.points?.map((it) => {
                                return (
                                    <>
                                        <li className=''
                                            style={{
                                                fontSize: '12px'
                                            }}
                                        >
                                            {it}
                                        </li>
                                    </>
                                )
                            })
                            }
                        </div>
                        {
                            (el?.suggestions?.covered?.length > 0 || el?.suggestions?.covered?.length > 0 || el?.suggestions?.covered?.length > 0) &&
                            <Card className=''
                                style={{
                                   zoom:'70%'
                                }}
                            >
                                <div className=''
                                
                                >
                                    <Table className=" align-items-center table-flush" >
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="sort" scope="col">
                                                    Answered
                                                </th>
                                                <th className="sort" scope="col">
                                                    Answered Partial
                                                </th>
                                                <th className="sort" scope="col">
                                                    Invalid Answer
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="list overflow-auto overflow-hide">
                                            <tr className=''>
                                                <td className="">
                                                    {el?.suggestions?.covered?.length > 0 && el?.suggestions?.covered?.map((items) => {
                                                        return (
                                                            <>
                                                                <li>
                                                                    {items}
                                                                </li>
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </td>
                                                <td className="budget">
                                                    {el?.suggestions?.covered?.length > 0 && el?.suggestions?.covered?.map((items) => {
                                                        console.log('9090909e333333333333', items)
                                                        return (
                                                            <>
                                                                <li>
                                                                    {items}
                                                                </li>
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </td>
                                                <td className="budget">
                                                    {el?.suggestions?.covered?.length > 0 && el?.suggestions?.covered?.map((items) => {
                                                        return (
                                                            <>
                                                                <li>
                                                                    {items}
                                                                </li>
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        }
                    </div >
                )
            })
        )
    }


    const colorVariant = (percentage) => {

        if (percentage <= 20) {
            return 'red'
        }
        else if (percentage <= 40) {
            return 'orange'
        }
        else if (percentage <= 60) {
            return '#ebeb1b'
        }
        else if (percentage <= 80) {
            return 'green'
        }
        else if (percentage <= 100) {
            return '#FFD700'
        }
    }


    let array = 0



    return (
        <>

            {!basicReportLoader &&
                <div className='row justify-content-center align-items-center mx-3'
                    style={{
                        height: '90vh'
                    }}
                >
                    <Spinner />
                </div>
            }

            {<div>

                <ReactToPrint
                    trigger={() =>
                        <div className='d-flex position-absolute mr-4 pr-2 '
                            style={{
                                right: '0px',
                            }}
                        >
                            <Button
                                variant={'icon-rounded'}
                                color='info'
                                icons={'bi bi-printer-fill text-white fa-lg'}
                            />

                        </div>
                    }
                    content={() => componentRef.current}
                />

                <div ref={componentRef} className='container-fluid contact'>
                    <div className='row justify-content-end mr-4 pr-3 mt-3'>
                        <Button
                            variant={'icon-rounded'}
                            color='info'
                            icons={'bi bi-envelope-fill text-white fa-lg'}
                        />
                    </div>
                    <div className='row py-4'>
                        <div className='col-sm-12'>
                            <Card>
                                <CardHeader>
                                    <div className='row pl-lg-5 pr-lg-5 pl-sm-0 pl-3 pb-0 pr-sm-0 pr-3 justify-content-between'>
                                        <div className='h1 pt-1 font-weight-bolder text-black'>
                                            {basicReportData.name}
                                            <h5 className='text-black font-weight-bolder'>
                                                {basicReportData.sub_text}
                                            </h5>
                                            <p className='description'>
                                                {basicReportData.sub_text2}
                                            </p>
                                        </div>
                                        <div>
                                            <h1 className='font-weight-bolder display-3'
                                                style={{
                                                    color: colorVariant(+check * 10)
                                                }}
                                            >
                                                {(check / 3).toFixed(1)}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className='row   mx-lg-4 pb-0 mb--2'>

                                        {basicReportData && Object.keys(basicReportData)?.map((heading) => {

                                            return (
                                                dataId.map((el) => {

                                                    if (heading === el) {
                                                        return (
                                                            <>
                                                                <div className='col-sm-4 px-1'>
                                                                    <Card className=' '
                                                                        style={{
                                                                            boxShadow: "rgb(22 21 21 / 8%) 0px 0px 12px 3px"
                                                                        }}
                                                                    >
                                                                        <CardBody className='px-1 pt-2 pb-1'>
                                                                            <div className="progress-wrapper col py-0 m-0 ">
                                                                                <div className="progress-info">
                                                                                    <div className="h4 mb-0 pb-0">
                                                                                        <h4 className='font-weight-bolder text-black text-uppercase'>{heading === 'skill_matrix' ? 'SKILL MATRIX' : heading}</h4>
                                                                                    </div>
                                                                                    <div className="progress-percentage mt--3">
                                                                                        <span
                                                                                            style={{
                                                                                                fontSize: '12px'
                                                                                            }}
                                                                                        >{heading === 'skill_matrix' ? +basicReportData[heading].overal_percent.toFixed(1) : +calculateRating(basicReportData[heading]).toFixed(1)}%</span>
                                                                                    </div>
                                                                                </div>
                                                                                <Progress
                                                                                    className='mt--2'
                                                                                    max="100"
                                                                                    value={heading === 'skill_matrix' ? +basicReportData[heading].overal_percent : +calculateRating(basicReportData[heading])}
                                                                                    style={{
                                                                                        height: '6px',
                                                                                    }}
                                                                                    barStyle={
                                                                                        {
                                                                                            backgroundColor: colorVariant(heading === 'skill_matrix' ? +basicReportData[heading].overal_percent : +calculateRating(basicReportData[heading]))
                                                                                        }
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                    console.log('879868768768')
                                                })
                                            )
                                        })

                                        }
                                    </div>
                                </CardHeader>
                                <CardBody className='ml-1 pb-5'>
                                    {Object.keys(basicReportData)?.map((heading, index) => {

                                        console.log("array", array)

                                        if (heading === "skill_matrix") {
                                            array = array + calculateRating(basicReportData[heading].sections)
                                            return (
                                                <>
                                                    {basicReportData["skill_matrix"]?.sections.length > 0 &&
                                                        <div className='pl-lg-4 pr-lg-5 mr- pt-3 pb-2'>
                                                            <div className='row justify-content-between pr-2 pl-3 pb-3'>
                                                                <h4 className='font-weight-bolder text-black mb-4 text-uppercase'>{'SKILL MATRIX'}</h4>
                                                                <div className='font-weight-bolder display-4'
                                                                    style={{
                                                                        color: colorVariant(+basicReportData[heading].overal_percent)
                                                                    }}
                                                                >
                                                                    {+basicReportData[heading].overal_percent}
                                                                </div>
                                                            </div>

                                                            <>
                                                                {basicReportData && basicReportData["skill_matrix"]?.sections.length > 0 && basicReportData["skill_matrix"]?.sections.map((el) => {

                                                                    return (
                                                                        <>
                                                                            <div className=' px-3 mt--4 mb--2'>

                                                                                <div className='row justify-content-between  align-items-center'
                                                                                >
                                                                                    <div className='pt-4 '>
                                                                                        <h4 className='text-black'>
                                                                                            {el?.name}
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className='row align-items-center'>
                                                                                        <div className="progress-wrapper pb-0 ml-0  pl-0 mr-2"
                                                                                            style={{
                                                                                                width: '30vh'
                                                                                            }}
                                                                                        >
                                                                                            <div className="progress-info">
                                                                                                <div className="progress-label ">
                                                                                                    {/* <span className='ml--3 text-black'>Task completed</span> */}
                                                                                                </div>

                                                                                            </div>
                                                                                            <Progress
                                                                                                className='mr-2'
                                                                                                style={{
                                                                                                    height: '6px',
                                                                                                }}
                                                                                                barStyle={
                                                                                                    {
                                                                                                        backgroundColor: colorVariant(+el?.rating || +el?.percent)
                                                                                                    }
                                                                                                }
                                                                                                max="100" value={el?.rating ? el?.rating : 0} />

                                                                                        </div>
                                                                                        <div className="">
                                                                                            <span className='h6'
                                                                                                style={{
                                                                                                    fontSize: '12px'
                                                                                                }}
                                                                                            >{el?.rating ? el?.rating : 0}%</span>
                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                                <p className='description ml--3'>
                                                                                    {el?.note}
                                                                                </p>
                                                                            </div >
                                                                            {el?.questions?.length > 0 && normalizedTableData(el?.questions, '')}




                                                                            {Object.keys(basicReportData).length - 1 !== index && <div className='mb--3 mx--4'>
                                                                                <Divider />
                                                                            </div>}
                                                                        </>
                                                                    )
                                                                })}
                                                            </>
                                                        </div>}
                                                </>
                                            )
                                        }
                                        else {
                                            return (
                                                dataId.map((el) => {
                                                    if (el === heading && heading !== "skill_matrix") {
                                                        array = array + calculateRating(basicReportData[heading])
                                                        return (
                                                            <>
                                                                {basicReportData[heading].length > 0 && <>
                                                                    <div className='pl-lg-4 pr-lg-5 mr- pt-3 pb-2'>

                                                                        <div className='row justify-content-between pr-2 pl-3 pb-3'>
                                                                            <h4 className='font-weight-bolder text-black mb-4 text-uppercase'>{heading}</h4>
                                                                            <div className='font-weight-bolder display-4'
                                                                                style={{
                                                                                    color: colorVariant(calculateRating(basicReportData[heading]))
                                                                                }}
                                                                            >
                                                                                {calculateRating(basicReportData[heading]).toFixed(1)}
                                                                            </div>
                                                                        </div>
                                                                        {basicReportData && basicReportData[heading].length > 0 && basicReportData[heading].map((el) => {
                                                                            return (
                                                                                <>
                                                                                    <div className=' px-3 my--4'>

                                                                                        <div className='row justify-content-between  align-items-center'
                                                                                        >
                                                                                            <div className='pt-4 '>
                                                                                                <h4 className='text-black'>
                                                                                                    {el?.metrics_name || el?.trait || el?.name}
                                                                                                </h4>
                                                                                            </div>
                                                                                            <div className='row align-items-center'>
                                                                                                <div className="progress-wrapper pb-0 ml-0  pl-0 mr-2"
                                                                                                    style={{
                                                                                                        width: '30vh'
                                                                                                    }}
                                                                                                >
                                                                                                    <div className="progress-info">
                                                                                                        <div className="progress-label ">
                                                                                                            {/* <span className='ml--3 text-black'>Task completed</span> */}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <Progress
                                                                                                        className='mr-2'
                                                                                                        style={{
                                                                                                            height: '6px',
                                                                                                        }}
                                                                                                        barStyle={
                                                                                                            {
                                                                                                                backgroundColor: colorVariant(+el?.rating || +el?.percent)
                                                                                                            }
                                                                                                        }
                                                                                                        max="100" value={el?.rating || +el?.percent} />

                                                                                                </div>
                                                                                                <div className="">
                                                                                                    <span className='h6'
                                                                                                        style={{
                                                                                                            fontSize: '12px'
                                                                                                        }}
                                                                                                    >{el?.rating || +el?.percent || 0}%</span>
                                                                                                </div>
                                                                                            </div>


                                                                                        </div>
                                                                                        <p className='description ml--3'>
                                                                                            {el?.description || el?.reason || el?.note}
                                                                                        </p>
                                                                                    </div>
                                                                                    {el?.questions?.length > 0 && el?.questions.map((item) => {
                                                                                        console.log("item===>", item.question)
                                                                                        return (
                                                                                            <>
                                                                                                <div>
                                                                                                    {el?.sub && <div className='my-5 mx--2'
                                                                                                        style={{
                                                                                                            border: '0.5px solid #e9ecef ',
                                                                                                            borderTop: '0px'
                                                                                                        }}
                                                                                                    >
                                                                                                        <CommonTable
                                                                                                            tableDataSet={el?.sub}
                                                                                                            displayDataSet={normalizedTableData(el?.sub, '')}

                                                                                                        />
                                                                                                    </div>}
                                                                                                </div>
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </>
                                                                            )
                                                                        })
                                                                        }
                                                                    </div>
                                                                    {Object.keys(basicReportData).length - 1 !== index && <div className='mb--3 mx--4'>
                                                                        <Divider />
                                                                    </div>}
                                                                </>}
                                                            </>
                                                        )
                                                    }
                                                })
                                            )
                                        }
                                    })

                                    }
                                </CardBody>
                            </Card>
                        </div >
                    </div >
                </div >

            </div>

            }
        </>
    )
}

export { Report }