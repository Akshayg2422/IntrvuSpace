import React from 'react'
import { BasicReportProps } from './interfaces'
import { createNewObjectWithoutNullOrNaNValues } from '@Utils';
import './index.css'

function BasicReport({ details }: BasicReportProps) {

    const { skill_matrix_overal_percent, report_other_analytics, skill_matrix } = details || {}

    const { sections } = skill_matrix || {};
    const modifiedAnalytics = createNewObjectWithoutNullOrNaNValues(report_other_analytics)

    return (

        <div className='basic-report-container'>
            <div className={'report-dashboard-container'}>
                <div className={'report-card-container report-card-spacing report-card-left-spacing'}>
                    <div className={'report-title'}>{'Skill Matrix'}</div>
                    <div className={'text-heading text-primary'}>{skill_matrix_overal_percent}</div>
                </div>
                {
                    modifiedAnalytics && Object.keys(modifiedAnalytics).map((key, index, array) => {

                        let additionalClass = '';
                        if (index === array.length - 1) {
                            additionalClass = 'report-card-right-spacing';
                        }

                        return (
                            <div className={`report-card-container report-card-spacing ${additionalClass}`}>
                                <div className={'report-title'}>{key.replace(/_/g, ' ')}</div>
                                <div className={'text-heading'}>{modifiedAnalytics[key]}</div>
                            </div>
                        )
                    })
                }

            </div>

            <div className={'job-description-container'}>
                <div className={'text-heading'}>{'Job Description Key Areas'}</div>
                {sections && sections.length > 0 && sections.map((each => {
                    const { id, name, rating } = each
                    return (
                        <div key={id} className={'job-description-item card-border'}>
                            <div className={'job-description-title'}>{name}</div>
                            <div className={'job-description-title font-weight-700'}>{rating}</div>
                        </div>
                    )
                }))}
            </div>
        </div >

    )
}

export { BasicReport }