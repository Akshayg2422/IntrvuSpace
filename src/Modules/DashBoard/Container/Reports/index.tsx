import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { icons } from '@Assets';

function Reports() {



    const [cardContent, setCardContent] = useState([
        { id: 1, icon: <img src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />, heading: 'Basic Report', para: `The Basic Report in MockEazy provides a fundamental overview of your interview preparation journey. It offers insights into your overall progress, highlighting key areas where you've excelled and areas that may require more attention. This report serves as a valuable starting point for your interview preparation, allowing you to build a strong foundation for success.` },
        { id: 2, icon: <img src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />, heading: 'Skill Matrix Report', para: `The Skill Matrix Report delves deeper into your specific skillset. It evaluates your proficiency in essential competencies related to the job you're targeting. This report provides a detailed breakdown of your strengths and areas that need improvement, enabling you to tailor your preparation to match the skills required for your desired role.` },
        { id: 3, icon: <img src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />, heading: 'Communication Report', para: `Effective communication is often a critical factor in interview success. The Communication Report in MockEazy assesses your communication skills, including verbal and non-verbal aspects. It offers insights into your clarity, articulation, and confidence when conveying your thoughts and ideas, helping you refine your communication style for interviews.` },
        { id: 4, icon: <img src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />, heading: 'Trait Report', para: `Your personal traits and qualities play a significant role in how you present yourself during interviews. The Trait Report evaluates your personality traits and how they may influence your interview performance. It offers valuable insights into your strengths and potential areas for improvement in showcasing your unique qualities to potential employers.` },
        { id: 4, icon: <img src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />, heading: 'Skill Matrix Advanced', para: `Building on the Skill Matrix Report, the Skill Matrix Advanced report provides an even more in-depth analysis of your skills. It examines your proficiency in advanced or specialized competencies related to your desired job role. This report is ideal for candidates aiming to excel in highly specific skill areas, offering targeted guidance for improvement.` },
        { id: 4, icon: <img src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />, heading: 'Communication Advanced', para: `For those seeking to master advanced communication skills, the Communication Advanced report is a valuable resource. It assesses your ability to handle complex communication scenarios, such as interviews with senior executives or technical discussions. This report offers insights and recommendations to enhance your communication prowess in challenging situations` },
    ])

    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <section>
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col md="8">
                            <h3 className="text-primary">
                                Reports
                            </h3>
                            <span className={'display-3 text-black font-weight-bolder'}>Unlocking Your Interview Potential<br></br>
                                with MockEazy Reports
                            </span>
                            <p className="custom-text-color pt-2" style={{ fontSize: '17px' }}>
                                In the pursuit of interview success, MockEazy offers a comprehensive suite of reports to empower your preparation. These reports provide you with valuable insights and analytics tailored to your unique needs. Whether you're looking for a fundamental overview of your progress, a deep dive into specific skills, an assessment of your communication abilities, or an evaluation of your personality traits, our reports have you covered. We also offer advanced versions for those seeking to excel in specialized areas. With MockEazy's reports, you'll gain a clear understanding of your strengths, areas that require improvement, and actionable recommendations to ensure you present your best self in interviews. Elevate your interview preparation with data-driven insights that pave the way for success.
                            </p>

                        </Col>
                    </Row>

                    <div className="row mt-4">
                        {cardContent && cardContent.length > 0 && cardContent.map((item) => {
                            return (
                                <div className="col-lg-4 col-sm-6 mb-lg-0 mb-4 py-3" key={item.id}>
                                    <div className="card h-100">
                                        <div className="text-sm-start text-center pt-5 pb-2 px-4">
                                            <span>{item.icon}</span>
                                            <h5 className="mb-2 mt-3 h2 text-uppercase text-primary">{item.heading}</h5>
                                            <p>{item.para}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </Container>
            </section>
        </div>
    )
}

export { Reports }