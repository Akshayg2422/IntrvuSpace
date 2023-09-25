import React, { useState } from 'react';
import './index.css';

const Sliders = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const [isSliderActive, setIsSliderActive] = useState(false);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSliderValue(Number(value));
    };

    const handleSliderFocus = () => {
        setIsSliderActive(true);
    };

    const handleSliderBlur = () => {
        setIsSliderActive(false);
    };

    const trackBackgroundColor = `linear-gradient(to right, #68d75c ${sliderValue * 3.33}%, #ddd ${sliderValue * 3.33}%)`;

    const trackBackgroundStyle = {
        background: trackBackgroundColor,
    };

    const spanLeft = `${sliderValue * 3.33}%`;

    const sliderValueStyle = {
        left: spanLeft,
    };

    return (
        <div className="range mt-9">
            <div className='sliderValue' style={sliderValueStyle}>
                <span className={isSliderActive ? 'show' : ''}>{sliderValue}</span>
            </div>
            <div className="field">
                <div className="value left">0</div>
                <input
                    type="range"
                    min="0"
                    max="30"
                    value={sliderValue}
                    step="1"
                    onChange={handleSliderChange}
                    onFocus={handleSliderFocus}
                    onBlur={handleSliderBlur}
                    style={trackBackgroundStyle}
                />
                <div className="value right">200</div>
            </div>
        </div>
    );
};

export { Sliders };
