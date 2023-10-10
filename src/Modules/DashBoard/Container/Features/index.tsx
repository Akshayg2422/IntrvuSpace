import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'reactstrap'

function Features() {



    const [featureOfData, setFeatureOfData] = useState([
        { id: 1, heading: 'Comprehensive Courses', para: 'EDAT offers a wide range of courses in programming languages such as Java, JavaScript, and Python.', img: '', filter: "" },
        { id: 2, heading: 'Task-Based Learning', para: ' Each course includes multiple tasks that allow you to apply your knowledge and gain practical experience.', img: '', filter: '' },
        { id: 3, heading: 'intrvu SPACE Interviews', para: 'After completing tasks, EDAT conducts intrvu SPACE interviews to help you refine your skills and prepare for real-world scenarios.', img: '', filter: '' },
        { id: 4, heading: 'Progress Tracking', para: 'EDAT tracks your progress, ensuring that you can monitor your growth and identify areas for improvement.', img: '', filter: '' },
        { id: 5, heading: 'Digital Branding', para: 'Showcase your efforts and achievements by leveraging EDAT"s digital branding features across social platforms and professional networks.', img: '', filter: '' },
        { id: 6, heading: 'Recording and Storage', para: 'EDAT stores all task details and recordings, enabling you to review your performance and refer back to them in the future.', img: '', filter: '' },
        { id: 7, heading: 'Interactive Community', para: 'Engage with a vibrant community of learners, share insights, and collaborate on projects.', img: '', filter: '' },
        { id: 8, heading: 'User-Friendly Interface', para: 'EDAT provides an intuitive and user-friendly interface, making it easy to navigate and access course materials.', img: '', filter: '' },
        { id: 9, heading: 'Expert Instruction', para: 'Benefit from expertly designed courses with thorough explanations and guidance from experienced instructors.', img: '', filter: '' },
        { id: 10, heading: 'Continuous Learning', para: 'EDAT encourages lifelong learning by offering a platform that supports continuous growth and development.', img: '', filter: '' }

    ])

    return (
        <>
            <div className="card-pricing card-plain " >
                <Container className="pt-5 " id="service" >
                    <div className="text-center pt-5">
                        <h1 className="display-2 ">Features Of EDAT</h1>
                    </div>
                    <Row className="pt-5 justify-content-center align-items-center">

                        {featureOfData && featureOfData.length > 0 && featureOfData.map((el) => {
                            return (
                                <>
                                    <Col md="3" className=''>
                                        <Card className="card-lift--hover text-center px-2" id="info"
                                            style={{
                                                height: '45vh'
                                            }}
                                        >
                                            <div className="" >
                                                <img
                                                    alt="..."
                                                    height={100}
                                                    width={100}
                                                    style={{
                                                        filter: el.filter
                                                    }}
                                                    src={el.img}
                                                />
                                                {/* <i className="tim-icons icon-user-run" /> */}
                                            </div>
                                            <h4 className="info-title px-2 ">{el.heading}</h4>
                                            <p className="px-2 text-sm" >
                                                {el.para}
                                            </p>
                                        </Card>
                                    </Col>
                                </>
                            )
                        })


                        }
                    </Row>
                </Container>
            </div>
        </>
    )
}

export { Features }