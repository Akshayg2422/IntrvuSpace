import React from 'react'
import { DurationProps, } from './interface'
import { InputHeading, Button } from '@Components'
import { INTERVIEW_DURATIONS } from '@Utils'
import './index.css'

function Duration({ selected, onSelected }: DurationProps) {
    return (
        <div className={"duration-container"}>
            <InputHeading heading={"Duration"} />
            <div className={"duration-content-container"}>
                {INTERVIEW_DURATIONS.map((item: any, index: number) => {
                    const { id, subText } = item;
                    return (
                        <div
                            className={
                                index === 0
                                    ? "each-duration"
                                    : "each-duration each-duration-space"
                            }
                        >
                            <Button
                                block
                                outline
                                className={`${selected?.id === id
                                    ? "btn-outline-primary-active"
                                    : "btn-outline-primary-inactive"
                                    }`}
                                text={subText}
                                onClick={() => {
                                    if (onSelected) {
                                        onSelected(item)
                                    }
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export { Duration }