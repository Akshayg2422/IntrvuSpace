import React from 'react'
import './index.css'
import { ReportHeaderProps } from './interfaces'
const ReportHeader = ({ details }: ReportHeaderProps) => {

    const { interview_meta_info, candidate_score } = details || {}
    const { name, role, experience, interview_duration, user_location_info } = interview_meta_info || {}

    const experience_txt = !experience ? "Fresher" : `${experience} ${experience > 1 ? "years" : experience === 1 ? "year" : ""}`


    const colorVariant = (percentage: any) => {
        if (percentage <= 20) return "red";
        if (percentage <= 40) return "orange";
        if (percentage <= 60) return "#ebeb1b";
        if (percentage <= 80) return "green";
        return "#FFD700";
    };


    return (
        <div className={'base-info-container'}>
            <div className={'user-info-container'}>
                <div className={'user-heading'}>{name}</div>
                <div className={'user-role'}> {`${role} - ${experience_txt}`}</div>
                <div className={'badge-schedule'}>
                    <div className={'badge-text'}>{interview_duration + " min Interview"}</div>
                </div>
            </div>

            <div className={'user-mark-container'}>
                <span
                    className={'mark-text'}
                    style={{
                        color: colorVariant(candidate_score),
                    }}
                >
                    {candidate_score}
                </span>
            </div>
        </div>
    )
}

export { ReportHeader }