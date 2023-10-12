import { color } from '@Themes';
import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";

function Tab1() {
  return (
    <div style={{ backgroundColor: '#001532', borderRadius: '20px' }}>
      <section className="m-3 m-md-5">
        <Container>
          <Row>
            <Col xs={12} md={6} className="d-flex flex-column"> {/* Use flexbox to align columns */}
              <div className="pt-4 pb-2">
                <img
                  src={icons.basicReport}
                  alt="Authentication icon"
                  height={45}
                  width={45}
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="text-white h2 font-weight-bolder">Basic Report</div>
              <p className="text-white" style={{ maxWidth: '400px' }}>
                The Basic Report in intrvu SPACE provides a fundamental overview of your interview preparation journey. It offers insights into your overall progress, highlighting key areas where you've excelled and areas that may require more attention. This report serves as a valuable starting point for your interview preparation, allowing you to build a strong foundation for success.
              </p>
            </Col>
            <Col xs={12} md={6} className="py-4">
              <div className="d-flex justify-content-center align-items-center h-100"> {/* Center the image vertically */}
                <img
                  style={{ borderRadius: '20px', backgroundColor: 'white', maxWidth: '100%' }}
                  alt="..."
                  className="img-fluid"
                  src={image.BasicReport}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export { Tab1 };
