
import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";

function Tab4() {

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

                <div className={'text-black h2 font-weight-bolder'}>Tailored Interview Process</div>

                <p className={'custom-text-color'} style={{ maxWidth: '400px' }}>
                If you choose "Interview by Experience," our app will craft personalized questions to match your expertise level. For "Mock Interviews by Company," you'll face industry-specific questions for your desired employers.
                </p>
              </div>
            </Col>
            <Col className="order-md-2 col-6 py-4">
              <img
                style={{ borderRadius: '20px', backgroundColor: 'white' }}
                alt="..."
                className="img-fluid"
                src={image.Tab4Image}
              />
            </Col>
          </Row>



        </Container>
      </section>

    </div>
  )
}

export { Tab4 }