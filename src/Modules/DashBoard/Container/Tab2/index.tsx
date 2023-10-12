import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { image, icons } from '@Assets';

function Tab2() {
  return (
    <div style={{ backgroundColor: '#001532', borderRadius: '20px' }}>
      <section className="m-3 m-md-5">
        <Container>
          <Row>
            <Col xs={12} md={6} className="">
              <div className="pt-4 pb-2">
                <img
                  src={icons.skillMatrixReport}
                  alt="Authentication icon"
                  height={45}
                  width={45}
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="text-white h2 font-weight-bolder">Skill Matrix Report</div>
              <p className="text-white" style={{ maxWidth: '400px' }}>
                The Skill Matrix Report delves deeper into your specific skillset. It evaluates your proficiency in essential competencies related to the job you're targeting. This report provides a detailed breakdown of your strengths and areas that need improvement, enabling you to tailor your preparation to match the skills required for your desired role.
              </p>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center align-items-center py-4">
              <div>
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
  );
}

export { Tab2 };
