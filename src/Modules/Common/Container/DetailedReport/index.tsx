import { StatusIcon } from '@Components';
import { capitalizeFirstLetter, createNewObjectWithoutNullOrNaNValues } from '@Utils';
import './index.css';
import { DetailedReportProps } from './interfaces';

function DetailedReport({ details }: DetailedReportProps) {
  const { skill_matrix_overal_percent, report_other_analytics, skill_matrix } = details || {}

  const { hlv_r, llv_r } = report_other_analytics || {}

  const { sections } = skill_matrix || {};

  const modifiedHlv_r = createNewObjectWithoutNullOrNaNValues(hlv_r)
  const modifiedLlrv = llv_r

  const NOTE = [
    { id: 1, icon: <StatusIcon type={"icon"} />, text: "Completely Covered", h: 20 },
    { id: 2, icon: <StatusIcon type={"icon"} variant={'checkBlack'} />, text: "Partially Covered", h: 20 },
    { id: 3, icon: <StatusIcon type={"icon"} variant={'frame'} />, text: "Covered but Invalid", h: 20 },
  ];


  return (
    <div className={'detailed-report-container'}>
      <div className={'detailed-report-card-container'}>
        <div className='detailed-each-container'>
          <div className={'heading-font'}>{skill_matrix_overal_percent}%</div>
          <div className={'detailed-report-title'}>{'Skill Matrix'}</div>
        </div>
        {
          modifiedHlv_r && Object.keys(modifiedHlv_r).map((key, index, array) => {
            return (
              <div className={'detailed-each-container'} >
                <div className={'heading-font'}>{modifiedHlv_r[key]}%</div>
                <div className={'detailed-report-title'}>{key.replace(/_/g, ' ')}</div>
              </div>
            )
          })
        }
      </div>

      <div>
        {
          sections && sections.length > 0 &&
          <>
            <div className={'detailed-job-description-container'}>
              <div className={'text-heading'}>{'Job Description Key Areas'}</div>
              {sections && sections.length > 0 && sections.map((each => {
                const { id, name, rating } = each
                return (
                  <div key={id} className={'detailed-job-description-item card-border'}>
                    <div className={'detailed-job-description-title'}>{name}</div>
                    <div className={'detailed-job-description-title font-weight-700'}>{rating}</div>
                  </div>
                )
              }))}
            </div>

            <div className={'skill-matrix-container'}>
              <div className={'skill-matrix-heading-container'}>
                <div className={'text-heading'}>{'Skill Matrix'}</div>
                <div className={'text-heading'}>{skill_matrix_overal_percent}%</div>
              </div>
              <div className={'note-container'}>
                <div>
                  <div className={'screen-des text-secondary font-weight-bold'}>{'Note'}</div>
                  <div className={'note-list-container'}>
                    {
                      NOTE.map(each => {
                        const { id, icon, text } = each
                        return (
                          <div className={'note-list-item'} key={id}>
                            {
                              icon
                            }
                            <div className={'note-text'}>{text}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            {
              sections.map((each: any) => {
                const { name, rating, questions } = each;
                return (
                  <div className={'sector-card-container card-border'}>
                    <div className={'sector-heading-container'}>
                      <div className={'detailed-job-description-title'}>{capitalizeFirstLetter(name.replace(/_/g, ' '))}</div>
                      <div className={'detailed-job-description-title'}>{rating}</div>
                    </div>
                    <div>
                      {
                        questions && questions.map(each => {
                          const { question, suggestions } = each

                          const { covered, covered_partial, covered_not_valid } = suggestions || {}

                          return (
                            <div className={'question-container'}>
                              <span className={'question-text'}>{question}</span>

                              <div className={'answer-container'}>
                                {
                                  covered && covered?.length > 0 &&
                                  covered.map(
                                    (ans: any) => {
                                      return (
                                        <div className={'answer-item-container'}>
                                          <StatusIcon type={'icon'} />
                                          <small className={'note-text'}>
                                            {ans}
                                          </small>
                                        </div>
                                      );
                                    }
                                  )}

                                {
                                  covered_partial && covered_partial?.length > 0 &&
                                  covered_partial.map(
                                    (ans: any) => {
                                      return (
                                        <div className={'answer-item-container'}>
                                          <StatusIcon type={'icon'} variant={'checkBlack'} />
                                          <small className={'note-text'}>
                                            {ans}
                                          </small>
                                        </div>
                                      );
                                    }
                                  )}


                                {
                                  covered_not_valid && covered_not_valid?.length > 0 &&
                                  covered_not_valid.map(
                                    (ans: any) => {
                                      return (
                                        <div className={'answer-item-container'}>
                                          <StatusIcon type={'icon'} variant={'frame'} />
                                          <small className={'note-text'}>
                                            {ans}
                                          </small>
                                        </div>
                                      );
                                    }
                                  )
                                }
                                {
                                  covered_not_valid?.length <= 0 &&
                                  covered?.length <= 0 &&
                                  covered_partial?.length <= 0 && (
                                    <div className={'answer-item-container'}>
                                      <StatusIcon type={'icon'} variant={'frame'} />
                                      <small className={'note-text'}>
                                        {"Not Answered"}
                                      </small>
                                    </div>
                                  )}

                              </div>
                            </div>
                          )
                        })
                      }
                    </div>

                  </div>
                )
              })
            }
          </>
        }
      </div>

      <div>
        {
          modifiedLlrv && Object.keys(modifiedLlrv).map((key, index, array) => {

            const list = modifiedLlrv[key]

            return (
              <>
                <div className={'skill-matrix-heading-container'}>
                  <div className={'text-heading'}>{capitalizeFirstLetter(key.replace(/_/g, ' '))}</div>
                  <div className={'text-heading'}>{modifiedHlv_r[key]}%</div>
                </div>

                {
                  list && list.length > 0 && list.map(each => {
                    const { rating, description, metrics_name } = each;
                    return (
                      <div>
                        <div className={'detailed-job-description-item card-border'}>
                          <div>
                            <div className={'detailed-job-description-title'}>{metrics_name}</div>
                            <div className={'note-text ml-0'}>{description}</div>
                          </div>
                          <div className={'detailed-job-description-title font-weight-700 ml-5'}>{rating}</div>
                        </div>
                      </div>
                    )
                  })
                }

              </>
            )
          })
        }
      </div>
    </div>
  )
}

export { DetailedReport };
