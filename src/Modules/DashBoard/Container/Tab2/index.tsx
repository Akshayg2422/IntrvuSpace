
import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";

function Tab2() {

   

    return (
      <div style={{ backgroundColor: '#c7f2c1', borderRadius: '20px' }}>

      <section className="m-5">
        <Container>
          <Row>
            <Col className={'col-6'}>
              <div className="pt-6">
                <div className='pb-4'>
                  <img className={''} src={icons.skillMatrixReport} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                </div>

                <div className={'text-black h2 font-weight-bolder'}>Skill Matrix Report</div>

                <p className={'custom-text-color'} style={{ maxWidth: '400px' }}>
                The Skill Matrix Report delves deeper into your specific skillset. It evaluates your proficiency in essential competencies related to the job you're targeting. This report provides a detailed breakdown of your strengths and areas that need improvement, enabling you to tailor your preparation to match the skills required for your desired role.
                </p>
              </div>
            </Col>
            <Col className="order-md-2 col-6 py-4">
              <img
                style={{ borderRadius: '20px',backgroundColor:'white' }}
                alt="..."
                className="img-fluid"
                src={image.Tab2Image}
              />
            </Col>
          </Row>



        </Container>
      </section>

    </div>
    )
}

export { Tab2 }