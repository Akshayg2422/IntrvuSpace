
import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";

function Tab3() {

  const [data, setData] = useState('')
  const dashBoardModule = ['Track progress, manage tasks, assignments, and deadlines for improved organization and productivity.', 'Tailored course suggestions based on interests, goals, and performance, promoting focused learning.', 'Easy access to resources: Retrieve course materials, lecture notes, videos, and engage in discussions, facilitating collaboration and resource retrieval.']


  return (
    <div style={{ backgroundColor: '#001532', borderRadius: '20px' }}>

      <section className="m-3 m-md-5">
        <Container>
          <Row>
            <Col xs={'12'} md={'6'} className={'d-flex flex-column'}>
              <div className="pt-4 pb-2">
                <img className={''} src={icons.communicationReport} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
              </div>
              <div className={'text-white h2 font-weight-bolder'}>Communication Report</div>
              <p className={'text-white'} style={{ maxWidth: '400px' }}>
                Effective communication is often a critical factor in interview success. The Communication Report in intrvu SPACE assesses your communication skills, including verbal and non-verbal aspects. It offers insights into your clarity, articulation, and confidence when conveying your thoughts and ideas, helping you refine your communication style for interviews.
              </p>

            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center align-items-center py-4">
              <img
                style={{ borderRadius: '20px', backgroundColor: 'white', maxWidth: '100%' }}
                alt="..."
                className="img-fluid"
                src={image.CommunicationReport}
              />
            </Col>
          </Row>



        </Container>
      </section>

    </div>
  )
}

export { Tab3 }