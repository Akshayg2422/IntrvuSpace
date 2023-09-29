import React, { useState } from 'react';
import './index.css';
import { SlidersProps } from './interfaces'

const Sliders = ({ min, max, value, step, onChange, heading, disabled }: SlidersProps) => {
    const [isSliderActive, setIsSliderActive] = useState(false);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onChange(Number(value));
    };

    const handleSliderFocus = () => {
        setIsSliderActive(true);
    };

    const handleSliderBlur = () => {
        setIsSliderActive(false);
    };

    const trackBackgroundColor = `linear-gradient(to right, #68d75c ${value * (100 / max)}%, #ddd ${value * (100 / max)}%)`;

    const trackBackgroundStyle = {
        background: trackBackgroundColor,
    };

    const spanLeft = `calc(${value * (100 / max)}%)`;

    const sliderValueStyle = {
        left: spanLeft,
    };

    return (
        <div className={'range m-0 p-0'}>
            {
                heading &&
                <h5 style={{ color: '#525f7f' }} className={'mb-4'}>
                    {heading}
                </h5>
            }
            <div className='sliderValue d-flex justify-content-center' style={sliderValueStyle}>
                <span className={isSliderActive ? 'show' : ''}>{value}</span>
            </div>
            <div className={'field'}>
                <div className={'value left'}>{min} Yrs</div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    step={step}
                    onChange={handleSliderChange}
                    onFocus={handleSliderFocus}
                    onBlur={handleSliderBlur}
                    style={trackBackgroundStyle}
                    disabled={disabled}
                />
                <div className={'value right'}>{max} Yrs</div>
            </div>
        </div>
    );
};

export { Sliders };
