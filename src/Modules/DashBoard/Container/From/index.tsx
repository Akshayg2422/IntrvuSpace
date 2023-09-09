import React, { useState } from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { Image } from "@Components";
import './style.css'



function From() {



    const [cardContent, setCardContent] = useState([
        { id: 1, heading: 'Comprehensive Courses', para: 'Learn a wide range of programming languages and skills for enhanced career opportunities.' },
        { id: 2, heading: 'Authentic Learning', para: '  Engage in real-world tasks and mock interviews to gain practical experience.' },
        { id: 3, heading: 'Skill Showcase', para: 'Share your progress and achievements across social platforms to build a professional online presence.' },
        { id: 4, heading: 'Task Storage', para: 'Keep track of task details and recordings for future reference and improvement.' }
    ])

    return (
        <div className=''>
            <section className="pt-8 pb-9 ">
                <Container fluid>
                    <Row className="justify-content-center text-center">
                        <Col md="8">
                            <h2 className="display-2 text-black">
                                Introduction
                            </h2>
                            <p className="">
                                Unlock the power of advanced technology in the world of interviews with MockEasy. Our innovative web application is designed to empower both job seekers and companies, revolutionizing the way interviews are conducted. From personalized interview simulations to streamlined candidate selection, MockEasy brings a new era of efficiency and effectiveness to the hiring process.
                            </p>

                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="section section-lg pt-lg-0 mt--7">
                <Container fluid>
                    <h3 className='display-4 text-center text-black'>
                        Key Features
                    </h3>
                    <Row className="justify-content-center pt-5">
                        <Col lg="12">
                            <Row>

                                {cardContent && cardContent.length > 0 && cardContent.map((item) => {
                                    return (
                                        <>
                                            <Col lg="3">
                                                <div className="card-container">
                                                    <div className="card">
                                                        <div className="front-content ">
                                                            <p> {item?.heading}</p>
                                                        </div>
                                                        <div className="content">
                                                            <p className="heading text-white"> {item?.heading}</p>
                                                            <p className='text-white'>
                                                                {item?.para}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col >
                                        </>
                                    )
                                })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container >
            </section >
        </div>
    )
}

export { From }