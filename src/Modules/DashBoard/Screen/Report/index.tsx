import { Button, CommonTable, Divider, Spinner } from '@Components';
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Progress } from 'reactstrap'
import ReactToPrint from 'react-to-print';
import { useDispatch } from 'react-redux';
import { fetchBasicReport } from '@Redux';
import { useLoader } from '@Hooks';

function Report() {


    const dispatch = useDispatch()

    const [dataId, setDataId] = useState<any>(['trait', 'communication', 'skill_matrix'])
    const [basicReportData, setBasicReportData] = useState<any>({})
    const componentRef = useRef(null);
    let basicReportLoader = useLoader(false);
    const [check, setCheck] = useState<any>(0)






    useEffect(() => {
        getBasicReportData()
    }, [])


    const getBasicReportData = () => {
        basicReportLoader.show()
        const params = {
            schedule_id: '60e15a22-fa2d-41b7-8fd3-9c2b3422d990'
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


    const tttt = () => {

    }
    let array1: any = []

    const calculateRating = (data: any) => {

        let overallPercent = 0
        if (Array.isArray(data)) {
            data.filter((el) => {
                console.log("909090909090909090", +el?.rating)

                overallPercent = el?.percent ? +overallPercent + +el?.percent : +overallPercent + +el?.rating
            })
        }

        array1.push(+overallPercent / data.length)

        // removeDuplicates(array1)



        return +overallPercent / data.length
    }

    // let nottu
    // function removeDuplicates(data) {
    //     let a = Array.from(new Set(data));
    //     let b = 0

    //     a && a.filter((el: any) => {
    //         b = b + (el)
    //     })

    //     nottu = b
    //     // setCheck(b)
    //     console.log("+overallPercent / data.length", b)

    // }
    // console.log('oioioi',nottu)




    const normalizedTableData = (data: any,) => {
        return data && data.length > 0 && data?.map((el: any) => {
            return {
                'question': el.question,
                rating: el.rating,
                reason: el.reason,
                suggestion: el.suggestion
            }
        }
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

            {basicReportLoader && <div>

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
                                                {check}
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
                                                                                        >{heading === 'skill_matrix' ? +calculateRating(basicReportData[heading].sections) : +calculateRating(basicReportData[heading])}%</span>
                                                                                    </div>
                                                                                </div>
                                                                                <Progress
                                                                                    className='mt--2'
                                                                                    max="100" value={heading === 'skill_matrix' ? +calculateRating(basicReportData[heading].sections) : +calculateRating(basicReportData[heading])}
                                                                                    style={{
                                                                                        height: '6px',
                                                                                    }}
                                                                                    barStyle={
                                                                                        {
                                                                                            backgroundColor: colorVariant(heading === 'skill_matrix' ? +calculateRating(basicReportData[heading].sections) : +calculateRating(basicReportData[heading]))
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
                                                <div className='pl-lg-4 pr-lg-5 mr- pt-3 pb-2'>
                                                    <div className='row justify-content-between pr-2 pl-3 pb-3'>
                                                        <h4 className='font-weight-bolder text-black mb-4 text-uppercase'>{'SKILL MATRIX'}</h4>
                                                        <div className='font-weight-bolder display-4'
                                                            style={{
                                                                color: colorVariant(calculateRating(basicReportData[heading].sections))
                                                            }}
                                                        >
                                                            {calculateRating(basicReportData[heading].sections)}
                                                        </div>
                                                    </div>

                                                    <>
                                                        {basicReportData && basicReportData["skill_matrix"]?.sections.map((el) => {

                                                            return (
                                                                <>
                                                                    <div className=' px-3 my--4'>

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
                                                                    {el?.sub && <div className='my-5 mx--2'
                                                                        style={{
                                                                            border: '0.5px solid #e9ecef ',
                                                                            borderTop: '0px'
                                                                        }}
                                                                    >
                                                                        <CommonTable
                                                                            tableDataSet={el?.sub}
                                                                            displayDataSet={normalizedTableData(el?.sub)}

                                                                        />
                                                                    </div >}

                                                                    {Object.keys(basicReportData).length - 1 !== index && <div className='mb--3 mx--4'>
                                                                        <Divider />
                                                                    </div>}
                                                                </>
                                                            )
                                                        })}
                                                    </>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                dataId.map((el) => {
                                                    if (el === heading && heading !== "skill_matrix") {
                                                        array = array + calculateRating(basicReportData[heading])
                                                        return (
                                                            <>
                                                                <div className='pl-lg-4 pr-lg-5 mr- pt-3 pb-2'>
                                                                    <div className='row justify-content-between pr-2 pl-3 pb-3'>
                                                                        <h4 className='font-weight-bolder text-black mb-4 text-uppercase'>{heading}</h4>
                                                                        <div className='font-weight-bolder display-4'
                                                                            style={{
                                                                                color: colorVariant(calculateRating(basicReportData[heading]))
                                                                            }}
                                                                        >
                                                                            {calculateRating(basicReportData[heading])}
                                                                        </div>
                                                                    </div>
                                                                    {basicReportData && basicReportData[heading]?.map((el) => {
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
                                                                                {el?.sub && <div className='my-5 mx--2'
                                                                                    style={{
                                                                                        border: '0.5px solid #e9ecef ',
                                                                                        borderTop: '0px'
                                                                                    }}
                                                                                >
                                                                                    <CommonTable
                                                                                        tableDataSet={el?.sub}
                                                                                        displayDataSet={normalizedTableData(el?.sub)}

                                                                                    />
                                                                                </div>}
                                                                            </>
                                                                        )
                                                                    })
                                                                    }
                                                                </div>
                                                                {Object.keys(basicReportData).length - 1 !== index && <div className='mb--3 mx--4'>
                                                                    <Divider />
                                                                </div>}
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