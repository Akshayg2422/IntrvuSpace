import { Button, Divider } from '@Components';
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Progress } from 'reactstrap'
import ReactToPrint from 'react-to-print';

function Report() {
    const [dragAndReorderData, setDragAndReorder] = useState<any>([
        { id: 1, name: 'Full stack development with React', description: 'Minimum 1 year experience in full stack development with React.', weightage: '15', display_order: '1', percentage: '20' },
        { id: 2, name: 'Front-end UI integration with API', description: 'Knowledge about integrating front-end UI with the constructed API.', weightage: '10', display_order: '2', percentage: '40' },
        { id: 3, name: 'NodeJS', description: 'Mandatory skill in NodeJS.', weightage: '10', display_order: '3', percentage: '60' },
        { id: 3, name: 'NodeJS', description: 'Mandatory skill in NodeJS.', weightage: '10', display_order: '3', percentage: '80' },
        { id: 3, name: 'NodeJS', description: 'Mandatory skill in NodeJS.', weightage: '10', display_order: '3', percentage: '100' },
        // {id:4, name: 'ReactJS', description: 'Mandatory skill in ReactJS.', weightage: '10', display_order: '4' },
        // {id:5, name: 'ExpressJS', description: 'Mandatory skill in ExpressJS.', weightage: '5', display_order: '5' },
        // {id:6, name: 'AngularJS', description: 'Mandatory skill in AngularJS.', weightage: '5', display_order: '6' },
        // {id:7, name: 'RESTful web services', description: 'Professional exposure to RESTful web services.', weightage: '5', display_order: '7' },
        // {id:8, name: 'JavaScript development with React', description: 'Functional and object oriented JavaScript development including application development with React.', weightage: '10', display_order: '8' },
        // {id:9, name: 'Databases', description: 'Knowledge of databases like MySQL, PostgreSQL, MongoDB.', weightage: '5', display_order: '9' },
        // {id:10, name: 'Front-end development tools', description: 'Experience with common front-end development tools such as Babel, Webpack, NPM, etc.', weightage: '10', display_order: '10' },
        // {id:11, name: 'Business requirements translation', description: 'Ability to understand business requirements and translate them into technical requirements.', weightage: '5', display_order: '11' },
        // {id:12, name: 'Code versioning tools', description: 'Familiarity with code versioning tools (such as Git).', weightage: '5', display_order: '12' }
    ])

    const [headerData, setHeaderData] = useState<any>([
        { id: 1, name: 'SKILL', percentage: '20' },
        { id: 2, name: 'COMMUNICATION', percentage: '40' },
        { id: 3, name: 'TRAIT', percentage: '60' },
    ])
    const componentRef = useRef(null);



    const colorVariant = (percentage) => {

        if (percentage <= 20) {
            return 'red'
        }
        else if (percentage <= 40) {
            return 'orange'
        }
        else if (percentage <= 60) {
            return 'yellow'
        }
        else if (percentage <= 80) {
            return 'green'
        }
        else if (percentage <= 100) {
            return '#FFD700'
        }
    }

    console.log("colorVariant", colorVariant(100))

    return (
        <>

            <ReactToPrint
                trigger={() => <a href="#">Print this out!</a>}
                content={() => componentRef.current}
            />

            <div ref={componentRef} className='container-fluid'>
                <div className='row justify-content-end mr-1 mt-3'>
                    <Button
                        variant={'icon-rounded'}
                        color='info'
                        icons={'bi bi-printer-fill text-white fa-lg'}
                    />
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
                                <div className='row pl-lg-5 pr-lg-5 pl-sm-0 pl-3 pr-sm-0 pr-3 justify-content-between'>
                                    <div className='h1 pt-1 font-weight-bolder text-black'>
                                        JayaKumar
                                        <h5 className='pt-1 font-weight-bolder text-black'>
                                            29 Yrs
                                        </h5>
                                    </div>
                                    <div>
                                        <h1 className='font-weight-bolder display-3'
                                            style={{
                                                color: colorVariant(+7.6 * 10)
                                            }}
                                        >
                                            7.6
                                        </h1>
                                    </div>
                                </div>
                                <div className='row   mx-lg-4'>

                                    {headerData && headerData.map((el) => {
                                        return (
                                            <div className='col-sm-4 px-1'>
                                                <Card className=' '
                                                    style={{
                                                        boxShadow: "rgb(22 21 21 / 8%) 0px 0px 12px 3px"
                                                    }}
                                                >
                                                    <CardBody className='px-1 pt-2 pb-0'>
                                                        <div className="progress-wrapper col py-0 m-0 ">
                                                            <div className="progress-info">
                                                                <div className="h4 mb-0 pb-0">
                                                                    <h4 className='font-weight-bolder text-black'>{el.name}</h4>
                                                                </div>
                                                                <div className="progress-percentage mt--3">
                                                                    <span
                                                                        style={{
                                                                            fontSize: '12px'
                                                                        }}
                                                                    >60%</span>
                                                                </div>
                                                            </div>
                                                            <Progress
                                                                className='mt--2'
                                                                max="100" value="60"
                                                                style={{
                                                                    height: '6px',
                                                                }}
                                                                barStyle={
                                                                    {
                                                                        backgroundColor: colorVariant(+el.percentage)
                                                                    }
                                                                }
                                                            />
                                                            <p className='description mt--2 '
                                                                style={{
                                                                    fontSize: '12px'
                                                                }}
                                                            >
                                                                Documentation and examples for using Bootstrap custom progress
                                                            </p>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        )
                                    })
                                    }
                                </div>

                            </CardHeader>
                            <CardBody className='mx-1 pb-5'>
                                <div className='px-lg-4 mb-lg--4 '>
                                    <h4 className='font-weight-bolder text-black mb-4'>SKILL MATRIX</h4>
                                    {dragAndReorderData && dragAndReorderData.map((el) => {
                                        return (
                                            <div className=' px-3 my--4'>

                                                <div className='row justify-content-between  align-items-center'
                                                >
                                                    <div className='pt-4 '>
                                                        <h4 className='text-black'>
                                                            Testing
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
                                                                        backgroundColor: colorVariant(+el.percentage)
                                                                    }
                                                                }
                                                                max="100" value="60" />

                                                        </div>
                                                        <div className="">
                                                            <span className='h6'
                                                                style={{
                                                                    fontSize: '12px'
                                                                }}
                                                            >60%</span>
                                                        </div>
                                                    </div>


                                                </div>

                                                <p className='description ml--3'>
                                                    Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.
                                                </p>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <div className='mx--4'>
                                    <Divider />
                                </div>
                                <div className='px-lg-4 my-lg--4'>
                                    <h4 className='font-weight-bolder text-black mb-4'>Communication</h4>
                                    {dragAndReorderData && dragAndReorderData.map((el) => {
                                        return (
                                            <div className=' px-3 my--4'>

                                                <div className='row justify-content-between  align-items-center'
                                                >
                                                    <div className='pt-4 '>
                                                        <h4 className='text-black'>
                                                            Testing
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
                                                                        backgroundColor: colorVariant(+el.percentage)
                                                                    }
                                                                }
                                                                max="100" value="60" />

                                                        </div>
                                                        <div className="">
                                                            <span className='h6'
                                                                style={{
                                                                    fontSize: '12px'
                                                                }}
                                                            >60%</span>
                                                        </div>
                                                    </div>


                                                </div>

                                                <p className='description ml--3'>
                                                    Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.
                                                </p>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <div className='mx--4'>
                                    <Divider />
                                </div>
                                <div className='px-lg-4 mt-g--4'>
                                    <h4 className='font-weight-bolder text-black mb-4'>Trait</h4>
                                    {dragAndReorderData && dragAndReorderData.map((el) => {
                                        return (
                                            <div className=' px-3 my--4'>

                                                <div className='row justify-content-between  align-items-center'
                                                >
                                                    <div className='pt-4 '>
                                                        <h4 className='text-black'>
                                                            Testing
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
                                                                        backgroundColor: colorVariant(+el.percentage)
                                                                    }
                                                                }
                                                                max="100" value="60" />

                                                        </div>
                                                        <div className="">
                                                            <span className='h6'
                                                                style={{
                                                                    fontSize: '12px'
                                                                }}
                                                            >60%</span>
                                                        </div>
                                                    </div>


                                                </div>

                                                <p className='description ml--3'>
                                                    Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.
                                                </p>
                                            </div>
                                        )
                                    })
                                    }
                                </div>

                                {/* <div className='pt-5'>
                                    <div className='text-center'>
                                        <h2>
                                            Communication
                                        </h2>
                                    </div>
                                    <div className='px-4'>
                                        <div className='col-sm-6'>
                                            {dragAndReorderData && dragAndReorderData.map(() => {
                                                return (
                                                    <>
                                                        <div className="progress-wrapper  ">
                                                            <div className="progress-info">
                                                                <div className="progress-label text-black">
                                                                    <span className='ml--3 text-black'>Task completed</span>
                                                                </div>
                                                                <div className="progress-percentage">
                                                                    <span className=''
                                                                        style={{
                                                                            fontSize: '12px'
                                                                        }}
                                                                    >60%</span>
                                                                </div>
                                                            </div>
                                                            <Progress max="100" value="60" color="primary" />
                                                        </div>
                                                    </>
                                                )
                                            })
                                            }


                                        </div>
                                    </div>
                                </div>
                                <div className='pt-5'>
                                    <div className='text-center'>
                                        <h2>
                                            Trait
                                        </h2>
                                    </div>
                                    <div className='px-4'>
                                        <div className='col-sm-6'>
                                            {dragAndReorderData && dragAndReorderData.map(() => {
                                                return (
                                                    <>
                                                        <div className="progress-wrapper  ">
                                                            <div className="progress-info">
                                                                <div className="progress-label text-black">
                                                                    <span className='ml--3 text-black'>Task completed</span>
                                                                </div>
                                                                <div className="progress-percentage">
                                                                    <span className=''
                                                                        style={{
                                                                            fontSize: '12px'
                                                                        }}
                                                                    >60%</span>
                                                                </div>
                                                            </div>
                                                            <Progress max="100" value="60" color="primary" />
                                                        </div>
                                                    </>
                                                )
                                            })
                                            }


                                        </div>
                                    </div>
                                </div> */}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div >

        </>
    )
}

export { Report }