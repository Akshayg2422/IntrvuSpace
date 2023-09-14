
import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";

function Tab2() {



  return (
    <div style={{ backgroundColor: '#c7f2c1', borderRadius: '20px' }}>

      <section className="m-3 m-md-5">
        <Container>
          <Row>
            <Col xs={12} md={6} className="d-flex flex-column">
              <div className="pt-4 pb-2">
                <img className={''} src={icons.skillMatrixReport} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
              </div>
              <div className={'text-black h2 font-weight-bolder'}>Skill Matrix Report</div>
              <p className={'custom-text-color'} style={{ maxWidth: '400px' }}>
                The Skill Matrix Report delves deeper into your specific skillset. It evaluates your proficiency in essential competencies related to the job you're targeting. This report provides a detailed breakdown of your strengths and areas that need improvement, enabling you to tailor your preparation to match the skills required for your desired role.
              </p>

            </Col>
            <Col className="order-md-2 col-6 py-4">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  style={{ borderRadius: '20px', backgroundColor: 'white', maxWidth: '100%' }}
                  alt="..."
                  className="img-fluid"
                  src={image.SkillMatrix}
                />
              </div>
            </Col>
          </Row>



        </Container>
      </section>

    </div>
  )
}

export { Tab2 }