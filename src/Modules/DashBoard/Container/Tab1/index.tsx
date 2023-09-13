
import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";

function Tab1() {

  return (
    <div style={{ backgroundColor: '#c7f2c1', borderRadius: '20px' }}>

      <section className="m-5">
        <Container>
          <Row>
            <Col className={'col-6'}>
              <div className="pt-6">
                <div className='pb-4'>
                  <img className={''} src={icons.basicReport} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                </div>

                <div className={'text-black h2 font-weight-bolder'}>Basic Report</div>

                <p className={'custom-text-color'} style={{ maxWidth: '400px' }}>
                The Basic Report in MockEazy provides a fundamental overview of your interview preparation journey. It offers insights into your overall progress, highlighting key areas where you've excelled and areas that may require more attention. This report serves as a valuable starting point for your interview preparation, allowing you to build a strong foundation for success.
                 
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