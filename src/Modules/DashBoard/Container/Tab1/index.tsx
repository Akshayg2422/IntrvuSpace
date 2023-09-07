
import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";

function Tab1() {

  const [data, setData] = useState('')
  const dashBoardModule = ['Track progress, manage tasks, assignments, and deadlines for improved organization and productivity.', 'Tailored course suggestions based on interests, goals, and performance, promoting focused learning.', 'Easy access to resources: Retrieve course materials, lecture notes, videos, and engage in discussions, facilitating collaboration and resource retrieval.']


  return (
    <div style={{ backgroundColor: '#e9eff3', borderRadius: '20px' }}>

      <section className="m-5">
        <Container>
          <Row>
            <Col className={'col-6'}>
              <div className="pt-6">
                <div className='pb-4'>
                  <img className={''} src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                </div>

                <div className={'text-black h2 font-weight-bolder'}>Your Expertise, Your Advantage</div>

                <p className={'custom-text-color'} style={{ maxWidth: '400px' }}>
                  Experience Matters, Practice Perfectly! In the "Interview by Experience" method, we take into account your years of professional experience. The app will present you with a series of interview questions carefully tailored to match your expertise level. This means you'll face relevant and challenging questions that resonate with your specific background and qualifications.
                </p>
              </div>
            </Col>
            <Col className="order-md-2 col-6 py-4">
              <img
                style={{ borderRadius: '20px', backgroundColor: 'white' }}
                alt="..."
                className="img-fluid"
                src={image.Tab1Image}
              />
            </Col>
          </Row>



        </Container>
      </section>

    </div>
  )
}

export { Tab1 }