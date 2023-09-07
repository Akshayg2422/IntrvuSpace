import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";
import { Tab1, Tab2, Tab3, Tab4 } from '@Modules'

function Data() {

    const [data, setData] = useState('')
    const dashBoardModule = ['Track progress, manage tasks, assignments, and deadlines for improved organization and productivity.', 'Tailored course suggestions based on interests, goals, and performance, promoting focused learning.', 'Easy access to resources: Retrieve course materials, lecture notes, videos, and engage in discussions, facilitating collaboration and resource retrieval.']


    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <section className="">
                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">
                            <Col lg="6" className='pl-sm-5' >
                                <Image
                                    src={image.MockEazy1}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            </Col>
                            <Col lg="6 pl-sm-7">
                                <div className={''}>
                                    <span className={'display-3 text-black font-weight-bolder'}> Why Choose MockEasy</span>
                                    <p className="custom-text-color" style={{ fontSize: '17px' }}>
                                    Embracing the next era of interviews means staying ahead of the curve, and that's exactly what MockEazy offers. In an ever-evolving job market, where competition is fierce and expectations are higher than ever, MockEazy stands as your gateway to the future of interviews. Our innovative platform redefines the interviewing experience, providing you with the tools and insights needed to excel. With MockEazy, you can prepare for interviews with confidence, sharpen your skills, and gain the edge you need to succeed in today's fast-paced professional world. Say goodbye to traditional interview preparation and step into the future with MockEazy.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </Container >
            </section>

        </div>
    )
}

export { Data }