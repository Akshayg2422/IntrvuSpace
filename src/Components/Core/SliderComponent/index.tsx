import React, { useEffect, useState } from "react";
import Slider from "nouislider";
import { Form, Row, Col } from "reactstrap";

const SliderComponent = () => {
    const [slider1Value, setSlider1Value] = useState("0");

    useEffect(() => {
        const slider1 = document.getElementById("slider1");

        if (slider1) {
            Slider.create(slider1, {
                start: [100],
                connect: [true, false],
                step: 0.01,
                range: { min: 100.0, max: 500.0 },
            }).on("update", (values, handle) => {
                setSlider1Value(values[0].toString()); // Convert to string
            });
        }
    }, []);

    return (
        <>
            <Form>
                <div className="input-slider-container">
                    <div className="input-slider" id="slider1" />
                    <Row className="mt-3">
                        <Col xs="6">
                            <span className="range-slider-value">{slider1Value}</span>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};

export {SliderComponent}
