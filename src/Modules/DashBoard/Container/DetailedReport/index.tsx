import React from 'react'
import { DetailedReportProps } from './interfaces'
import { createNewObjectWithoutNullOrNaNValues } from '@Utils';
import { Image } from '@Components';
import { icons } from '@Assets'
import './index.css'

function DetailedReport({ details }: DetailedReportProps) {
  const { skill_matrix_overal_percent, report_other_analytics, skill_matrix } = details || {}

  const { hlv_r } = report_other_analytics || {}
  const { sections } = skill_matrix || {};

  const modifiedAnalytics = createNewObjectWithoutNullOrNaNValues(hlv_r)

  const NOTE = [
    { id: 1, icon: icons.check, text: "Completely Covered", h: 8 },
    { id: 2, icon: icons.checkBlack, text: "Partially Covered", h: 20 },
    { id: 3, icon: icons.frame, text: "Covered by invalid", h: 20 },
  ];



  return (
    <div className={'detailed-report-container'}>
      <div className={'detailed-report-card-container'}>
        <div className='text-center'>
          <div className={'heading-font'}>{skill_matrix_overal_percent}%</div>
          <div className={'detailed-report-title'}>{'Skill Matrix'}</div>
        </div>
        {
          modifiedAnalytics && Object.keys(modifiedAnalytics).map((key, index, array) => {
            return (
              <div className={'text-center'} >
                <div className={'heading-font'}>{modifiedAnalytics[key]}%</div>
                <div className={'detailed-report-title'}>{key.replace(/_/g, ' ')}</div>
              </div>
            )
          })
        }
      </div>
      <div className={'detailed-job-description-container'}>
        <div className={'text-heading'}>{'Job Description Key Areas'}</div>
        {sections && sections.length > 0 && sections.map((each => {
          const { id, name, rating } = each
          return (
            <div key={id} className={'detailed-job-description-item border'}>
              <div className={'detailed-job-description-title'}>{name}</div>
              <div className={'detailed-job-description-title font-weight-700'}>{rating}</div>
            </div>
          )
        }))}
      </div>

      <div className={'skill-matrix-container'}>
        <div className={'skill-matrix-heading-container'}>
          <div className={'text-heading'}>{'Skill Matrix Report'}</div>
          <div className={'text-heading'}>{skill_matrix_overal_percent}%</div>
        </div>
        <div className={'note-container'}>
          <div>
            <div className={'screen-des text-secondary font-weight-bold'}>{'Note'}</div>
            <div className={'note-list-container'}>
              {
                NOTE.map(each => {
                  const { id, icon, text, h } = each
                  return (
                    <div className={'note-list-item'} key={id}>
                      <Image src={icon} height={h} style={{
                        objectFit: 'contain'
                      }} />
                      <div className={'screen-des ml-2'}>{text}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DetailedReport }