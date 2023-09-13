
import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";

function Tab5() {

  const [data, setData] = useState('')
  const dashBoardModule = ['Track progress, manage tasks, assignments, and deadlines for improved organization and productivity.', 'Tailored course suggestions based on interests, goals, and performance, promoting focused learning.', 'Easy access to resources: Retrieve course materials, lecture notes, videos, and engage in discussions, facilitating collaboration and resource retrieval.']


  return (
    <div style={{ backgroundColor: '#c7f2c1', borderRadius: '20px' }}>

      <section className="m-5">
        <Container>
          <Row>
            <Col className={'col-6'}>
              <div className="pt-6">
                <div className='pb-4'>
                  <img className={''} src={icons.skillMatrixAdvanced} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                </div>

                <div className={'text-black h2 font-weight-bolder'}>Skill Matrix Advanced</div>

                <p className={'custom-text-color'} style={{ maxWidth: '400px' }}>
                  Building on the Skill Matrix Report, the Skill Matrix Advanced report provides an even more in-depth analysis of your skills. It examines your proficiency in advanced or specialized competencies related to your desired job role. This report is ideal for candidates aiming to excel in highly specific skill areas, offering targeted guidance for improvement.
                </p>
              </div>
            </Col>
            <Col className="order-md-2 col-6 py-4">
              <img
                style={{ borderRadius: '20px', backgroundColor: 'white' }}
                alt="..."
                className="img-fluid"
                src={image.Tab5Image}
              />
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  )
}

export { Tab5 }