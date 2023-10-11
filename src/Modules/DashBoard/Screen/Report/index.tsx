import { icons, image } from '@Assets';
import { Button, ButtonGroup, CommonTable, Divider, Image, Spinner } from '@Components';
import { useDropDown, useLoader } from '@Hooks';
import { fetchBasicReport } from '@Redux';
import { color } from '@Themes';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { Card, CardBody, CardFooter, CardHeader, Progress } from 'reactstrap';


function Report() {
    const FILTER = [{ id: 1, title: 'Basic Report' }, { id: 2, title: 'Detailed Report' }]

    const { schedule_id } = useParams();

    const dispatch = useDispatch()

    const [dataId, setDataId] = useState<any>(['trait', 'communication', 'skill_matrix'])
    const [basicReportData, setBasicReportData] = useState<any>([])
    const filter = useDropDown(FILTER[0]);

    const componentRef = useRef(null);
    let basicReportLoader = useLoader(false);
    const [check, setCheck] = useState<any>(0)
    const heightRef = useRef<any>()
    const [cardHeight, setCardHeight] = useState<any>(null)
    const [percentage, setPercentage] = useState<any>({})
    const [fileName, setFileName] = useState('')



    useEffect(() => {
        getBasicReportData('')
    }, [])

    useEffect(() => {
        if (basicReportData) {
            removeDuplicates()

        }
    }, [basicReportData])

    function getPercentage(array: any, key: string) {
        return array.reduce(function (acc, obj) { return acc + parseFloat(obj[key]); }, 0) / array.length
    }

    const getBasicReportData = (details) => {
        basicReportLoader.show()
        const params = {
            schedule_id: schedule_id,
            ...(details === 'Detailed Report' && { is_detailed: true }),
        }

        dispatch(
            fetchBasicReport({
                params,
                onSuccess: (success) => () => {
                    basicReportLoader.hide()
                    console.log("success===>", success.details)
                    setBasicReportData(success.details)


                    const { communication, skill_matrix, trait, overall_weightage, name, sub_text } = success.details
                    setFileName(name + "_" + sub_text + '_' + filter?.value.title)


                    const communicationPercentage = communication?.length > 0 ? parseFloat((getPercentage(communication, 'rating') / 100 * overall_weightage.communication).toFixed(1)) : 0;
                    const skillMatrixPercentage = skill_matrix?.sections?.length > 0 ? parseFloat((getPercentage(skill_matrix?.sections, 'rating') / 100 * overall_weightage.skill_matrix).toFixed(1)) : 0;
                    const traitPercentage = trait.length > 0 ? parseFloat((getPercentage(trait, 'percent') / 100 * overall_weightage.trait).toFixed(1)) : 0;

                    console.log(communicationPercentage, "communicationPercentage==========");
                    console.log(skillMatrixPercentage, 'communicationPercentage======');
                    console.log(traitPercentage, "communicationPercentage===");




                    const total = (communicationPercentage + skillMatrixPercentage + traitPercentage).toFixed(1);
                    console.log("total0===================>", total)

                    setPercentage({
                        communication: communicationPercentage,
                        skillMatrix: skillMatrixPercentage,
                        trait: traitPercentage,
                        communicationOverAll: communication?.length > 0 ? parseFloat((getPercentage(communication, 'rating')).toFixed(1)) : 0,
                        skillMatrixOverAll: '',
                        traitOverAll: trait.length > 0 ? parseFloat((getPercentage(trait, 'percent')).toFixed(1)) : 0,
                        overAll: total
                    })

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


    useEffect(() => {
        setCardHeight(heightRef?.current?.offsetHeight);
    }, [])

    console.log("cardheight", cardHeight)


    function removeDuplicates() {
        let count = 0
        Object.keys(basicReportData).map((el) => {
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
        setCheck(count)
    }

    const normalizedTableData = (data: any, heading: any) => {
        let length = 0
        return (
            data.length > 0 && data.map((el, index) => {
                // let array: any = loopFunction(el)
                if (el?.suggestions?.covered?.length > length) {
                    length = el?.suggestions?.covered?.length
                }
                else if (el?.suggestions?.covered_partial?.length > length) {
                    length = el?.suggestions?.covered_partial?.length
                }
                else if (el?.suggestions?.covered_not_valid?.length > length) {
                    length = el?.suggestions?.covered_not_valid?.length
                }

                const { covered, covered_partial, covered_not_valid } = el?.suggestions

                let coveredHeight;
                let coveredPartialHeight;
                let coveredNotValidHeight;



                if (covered && covered.length > 0)
                    coveredHeight = covered.map((card: any) => card.length).reduce((a, b) => a + b);


                if (covered_partial && covered_partial.length > 0)
                    coveredPartialHeight = covered_partial.map((card: any) => card.length).reduce((a, b) => a + b);

                if (covered_not_valid && covered_not_valid.length > 0)
                    coveredNotValidHeight = covered_not_valid.map((card: any) => card.length).reduce((a, b) => a + b);

                const maxNumber = Math.max(coveredHeight ? coveredHeight : 0, coveredPartialHeight ? coveredPartialHeight : 0, coveredNotValidHeight ? coveredNotValidHeight : 0) + 100;


                return (
                    <div className=' py-2'>
                        <div className=''>
                            <h5 className='text-black'>{`${index + 1}.${el.question}`}</h5>
                        </div>
                        <div className='ml-2 pl-1 pb-3 text-black'>

                            {el?.expected_answer_key_points?.points && el?.expected_answer_key_points?.points.length > 0 &&
                                <>
                                    <h5 className='text-black text-uppercase'>Expected Key Points</h5>
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
                                </>
                            }
                        </div>
                        {
                            (el?.suggestions?.covered?.length > 0 || el?.suggestions?.covered_partial?.length > 0 || el?.suggestions?.covered_not_valid?.length > 0) &&
                            <div className='ml-1 pb-2'>
                                <h5 className='text-black text-uppercase '>Answer breakdown</h5>
                            </div>
                        }
                        <div className='mx-5'>

                            <div className='row p-0 ml--6 mr--7'
                                style={{
                                    zoom: '80%'
                                }}>
                                {
                                    (el?.suggestions?.covered?.length > 0 || el?.suggestions?.covered_partial?.length > 0 || el?.suggestions?.covered_not_valid?.length > 0) &&
                                    <>


                                        {el?.suggestions?.covered?.length > 0 &&
                                            <div className='col-sm-4'>
                                                <Card className='check' style={{
                                                    height: maxNumber + "px"
                                                }} >
                                                    <CardHeader className='h3'>
                                                        Valid
                                                    </CardHeader>
                                                    <CardBody >
                                                        <div>
                                                            {el?.suggestions?.covered?.length > 0 && el?.suggestions?.covered?.map((items) => {
                                                                return (
                                                                    <>
                                                                        <li>
                                                                            <span >{items}</span>
                                                                        </li>
                                                                    </>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        }
                                        {el?.suggestions?.covered_partial?.length > 0 &&
                                            <div className='col-sm-4'>
                                                <Card
                                                    style={{
                                                        height: maxNumber + "px"
                                                    }}
                                                >
                                                    <CardHeader className='h3'>
                                                        Partial
                                                    </CardHeader>
                                                    <CardBody>
                                                        {el?.suggestions?.covered_partial?.length > 0 && el?.suggestions?.covered_partial?.map((items) => {
                                                            return (
                                                                <>
                                                                    <li>
                                                                        {items}
                                                                    </li>
                                                                </>
                                                            )
                                                        })
                                                        }
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        }
                                        {el?.suggestions?.covered_not_valid?.length > 0 &&
                                            <div className='col-sm-4'>
                                                <Card
                                                    style={{
                                                        height: maxNumber
                                                    }}
                                                >
                                                    <CardHeader className='h3'>
                                                        Invalid
                                                    </CardHeader>
                                                    <CardBody>
                                                        {el?.suggestions?.covered_not_valid?.length > 0 && el?.suggestions?.covered_not_valid?.map((items) => {
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
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        }
                                    </>

                                }
                            </div>
                        </div >
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


    const handleButtonClick = (selectedOption) => {
        if (selectedOption.title === 'Detailed Report') {
            getBasicReportData('Detailed Report')

        }
        else {
            getBasicReportData('')
        }

        filter.onChange(selectedOption);
    };


    let array = 0

    return (
        <>
            <div className='h-100vh w-100 d-flex flex-column position-relative'>
                <div className='row position-fixed bottom-0 right-0 m-3 p-3' style={{
                    zIndex: 1,
                }}>
                    <ButtonGroup size={'btn-sm'} sortData={FILTER} selected={filter.value} onClick={handleButtonClick} />
                    <div className='ml-3'>
                        {fileName && <ReactToPrint
                            documentTitle={fileName}
                            trigger={() =>
                                <Button
                                    variant={'icon-rounded'}
                                    color='info'
                                    icons={'bi bi-printer-fill text-white fa-lg'}
                                />
                            }
                            content={() => componentRef.current}
                        />
                        }
                    </div>
                </div>

                <div className='card flex-grow-1 m-3 rounded-0' ref={componentRef}>
                    <div className='card-header'>
                        <div className={'col d-flex justify-content-end'} >

                            {/* <div className="d-flex align-items-center mr-4" style={{
                                borderWidth: "1px",
                                borderBlockColor: color.primary
                            }}>
                                <div className={'d-flex-column'}>
                                    <Image
                                        className='bg-primary'
                                        height={40}
                                        src={icons.logoText}
                                    />
                                    <small style={{
                                        fontSize: "12px"
                                    }} className={'row text-decoration-underline-hover text-right'}>
                                        <a href={'https://www.intrvu.space'} target="_blank" rel="noreferrer">
                                            https://www.intrvu.space
                                        </a>
                                    </small>
                                </div>
                                <div className='ml-2'>
                                    <Image
                                        className={'m-0 p-0'}
                                        src={icons.logoIcon}
                                        height={40}
                                        width={40}
                                    />
                                </div>
                            </div> */}

                        </div>
                        <div className='row pl-lg-5 pr-lg-5 pl-sm-0 pl-2 pb-0 pr-sm-0 pr-3 justify-content-between'>
                            <div className='h1 pt-1 font-weight-bolder text-black'>
                                {basicReportData.name}
                                <h5 className='text-black font-weight-bolder'>
                                    {basicReportData.sub_text}
                                </h5>
                                <p className='description'>
                                    {basicReportData.sub_text2}
                                </p>
                                <h1 className='font-weight-bolder text-right display-3 d-block d-sm-none'
                                    style={{
                                        color: colorVariant(+percentage?.overAll)
                                    }}
                                >
                                    {percentage?.overAll}
                                </h1>
                            </div>

                            <div className='flex-column text-right d-none d-lg-block d-md-block d-xl-block' >

                                <div className={'d-flex flex-column justify-content-end align-items-end'}  >
                                    <div className='' >
                                        <a href={'https://www.intrvu.space'} target="_blank" rel="noreferrer">
                                            <Image
                                                className={'m-0 p-0'}
                                                src={image.IntrvuSpace}
                                                // height={50}
                                                width={130}
                                            />
                                        </a>
                                    </div>
                                </div>

                                <h1 className='font-weight-bolder display-3 my-3'
                                    style={{
                                        color: colorVariant(+percentage?.overAll)
                                    }}
                                >
                                    {percentage?.overAll}
                                </h1>
                            </div>
                        </div>
                        <div className='row   mx-lg-4 pb-0 mb--2'>

                            {basicReportData && Object.keys(basicReportData).reverse()?.map((heading) => {

                                return (
                                    dataId.map((el) => {

                                        if (heading === el) {
                                            return (
                                                <>
                                                    <div className='col-sm-4 px-1'>
                                                        <Card className='shadow-none'
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
                                                                            >{heading === 'skill_matrix' ? +basicReportData[heading].overal_percent.toFixed(1) : heading === 'communication' ? percentage?.communicationOverAll : percentage?.traitOverAll}%</span>
                                                                        </div>
                                                                    </div>
                                                                    <Progress
                                                                        className='mt--2'
                                                                        max="100"
                                                                        value={heading === 'skill_matrix' ? +basicReportData[heading].overal_percent : heading === 'communication' ? percentage?.communicationOverAll : percentage?.traitOverAll}
                                                                        style={{
                                                                            height: '6px',
                                                                        }}
                                                                        barStyle={
                                                                            {
                                                                                backgroundColor: colorVariant(heading === 'skill_matrix' ? +basicReportData[heading].overal_percent : heading === 'communication' ? percentage?.communicationOverAll : percentage?.traitOverAll)
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
                    </div>
                    <div className='card-body overflow-hide overflow-auto h-100vh' style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        {Object.keys(basicReportData).reverse()?.map((heading, index) => {

                            if (heading === "skill_matrix") {
                                array = array + calculateRating(basicReportData[heading].sections)
                                return (
                                    <>
                                        {basicReportData["skill_matrix"]?.sections.length > 0 &&
                                            <div className='pl-lg-4 pr-lg-5 mr- pt-3 pb-2'>
                                                <div className='row justify-content-between pr-2 pl-3 pb-3'>
                                                    <h4 className='font-weight-bolder text-black mb-4 text-uppercase'>{'SKILL MATRIX'}</h4>
                                                    <div className='font-weight-bolder display-4 mt--2'
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
                                                                                <div className={'pl-3'}>
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
                                                            </>
                                                        )
                                                    })}
                                                </>

                                                </div>}
                                            {(percentage?.communication !== 0) ? <div className='mb--3 mx--4'>
                                                <Divider />
                                            </div>

                                                :
                                                <></>}
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        dataId.map((el) => {


                                            console.log(JSON.stringify(basicReportData[heading]));

                                            if (el === heading && heading !== "skill_matrix") {
                                                array = array + calculateRating(basicReportData[heading])



                                                return (
                                                    <>
                                                        {basicReportData[heading].length > 0 && <>
                                                            <div className='pl-lg-4 pr-lg-5 mr- pt-3 pb-2'>

                                                            <div className='row justify-content-between align-items-center pr-2 pl-3 pb-3'>
                                                                <div className='font-weight-bolder h4 text-black text-uppercase'>{heading}</div>
                                                                <div className='font-weight-bolder display-4 mt--2'
                                                                    style={{
                                                                        color: colorVariant(heading === 'communication' ? percentage?.communicationOverAll : percentage?.traitOverAll)
                                                                    }}
                                                                >
                                                                    {heading === 'communication' ? percentage?.communicationOverAll : percentage?.traitOverAll}
                                                                </div>
                                                            </div>
                                                            {basicReportData && basicReportData[heading].length > 0 && basicReportData[heading].map((el) => {
                                                                return (
                                                                    <>
                                                                        <div className=' px-3 my--4'>

                                                                            <div className='row justify-content-between align-items-center'
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
                                                                                        <div className={'pl-3'}>
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
                                                        {(heading !== 'trait' && percentage?.trait !== 0) && <div className='mb--3 mx--4'>
                                                            <Divider />
                                                        </div>
                                                        }
                                                    </>}
                                                </>
                                            )
                                        }
                                    })
                                )
                            }
                        })
                        }
                        <CardFooter className={'mx--4 d-block d-sm-none '}>
                            <div className={'mb-5'}>
                                <p>Powered by</p>
                                <div className='mt--3' >
                                    <a href={'https://www.intrvu.space'} target="_blank" rel="noreferrer">
                                        <Image
                                            className={'m-0 p-0'}
                                            src={image.IntrvuSpace}
                                            // height={50}
                                            width={130}
                                        />
                                    </a>
                                </div>
                            </div>
                        </CardFooter>
                    </div>
                    
                </div >
            </div >

        </>
    )
}

export { Report };
