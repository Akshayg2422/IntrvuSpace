import React, { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import { Row, Col, Form } from "reactstrap";

const Sliders = () => {

    const sliderRef = useRef<any>(null);
    const [sliderValue, setSliderValue] = useState("Any");

    useEffect(() => {
        const slider = sliderRef.current;

        if (slider && !slider.noUiSlider) {
            noUiSlider.create(slider, {
                start: [0],
                connect: [true, false],
                step: 1,
                range: { min: 0, max: 30 },
                tooltips: true,
            });

            slider.noUiSlider.on("update", function (values) {
                setSliderValue(values[0]);
            });
        }
    }, []);

    return (
        <Form>
            <div className="input-slider-container">
                <div className="input-slider mb-0" ref={sliderRef}></div>
                <Row className="mt-2">
                    <Col xs="6">
                        <small>{1} Yrs</small>
                    </Col>
                    <Col className="text-right" xs="6">
                        <small>{30} Yrs</small>
                    </Col>
                </Row>
            </div>
        </Form>
    );
};

export { Sliders };
