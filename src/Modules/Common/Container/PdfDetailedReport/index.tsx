import { capitalizeFirstLetter, createNewObjectWithoutNullOrNaNValues } from '@Utils';
import { PdfDetailedReportProps } from './interfaces';
import { dStyles, bStyles } from '@Modules'

import { Text, View, Image } from '@react-pdf/renderer';
import { icons } from '@Assets';


function PdfDetailedReport({ details }: PdfDetailedReportProps) {
  const { skill_matrix_overal_percent, report_other_analytics, skill_matrix } = details || {}

  const { hlv_r, llv_r } = report_other_analytics || {}

  const { sections } = skill_matrix || {};

  const modifiedHlv_r = createNewObjectWithoutNullOrNaNValues(hlv_r)
  const modifiedLlrv = llv_r


  const NOTE = [
    { id: 1, icon: icons.check, text: "Completely Covered" },
    { id: 2, icon: icons.checkBlack, text: "Partially Covered" },
    { id: 3, icon: icons.frame, text: "Covered but Invalid", },
  ];


  console.log(JSON.stringify(modifiedHlv_r));


  function getStatusIcon(variant: 'frame' | 'checkBlack' | 'check' = 'check') {
    const iconMap = {
      'check': icons.check,
      'checkBlack': icons.checkBlack,
      'frame': icons.frame
    };
    return <Image src={iconMap[variant]} style={dStyles['note-list-icon']} />
  }

  return (
    <View>
      <View style={[dStyles['detailed-report-card-container'], dStyles['card-border']]}>
        <View style={dStyles['detailed-each-container']}>
          <Text style={bStyles['text-heading-primary']}>{skill_matrix_overal_percent}%</Text>
          <Text style={bStyles['report-title']}>{'Skill Matrix'}</Text>
        </View>

        {
          modifiedHlv_r && Object.keys(modifiedHlv_r).map((key, index, array) => {
            return (
              <View style={dStyles['detailed-each-container']}>
                <Text style={bStyles['text-heading-secondary']}>{modifiedHlv_r[key]}%</Text>
                <Text style={bStyles['report-title']}>{key.replace(/_/g, ' ')}</Text>
              </View>
            )
          })
        }
      </View>

      <View style={bStyles['job-description-container']}>
        <Text style={bStyles['text-heading-secondary']}>{'Job Description Key Areas'}</Text>
        {sections && sections.length > 0 && sections.map((each => {
          const { name, rating } = each
          return (
            <View style={[bStyles['job-description-item'], bStyles['card-border']]}>
              <Text style={bStyles['job-description-title']}>{name}</Text>
              <Text style={bStyles['job-description-title']}>{rating}</Text>
            </View>
          )
        }))}
      </View>

      <View break>
        <View style={dStyles['skill-matrix-container']}>
          <View style={dStyles['skill-matrix-heading-container']}>
            <Text style={bStyles['text-heading-secondary']}>{'Skill Matrix Report'}</Text>
            <Text style={bStyles['text-heading-secondary']}>{skill_matrix_overal_percent}%</Text>
          </View>
          <View style={dStyles['note-container']}>
            <View>
              <Text style={dStyles['note-title']}>{'Note'}</Text>
              <View style={dStyles['note-list-container']}>
                {
                  NOTE.map(each => {
                    const { id, icon, text } = each
                    return (
                      <View key={id} style={dStyles['note-list-item']}>
                        <Image src={icon} style={dStyles['note-list-icon']} />
                        <Text style={dStyles['note-text']}>{text}</Text>
                      </View>
                    )
                  })
                }
              </View>
            </View>
          </View>
        </View>
        {
          sections && sections.length > 0 && sections.map(each => {
            const { name, rating, questions, } = each;
            return (
              <View style={[dStyles['sections-card-container'], bStyles['card-border']]} wrap={false}>
                <View style={dStyles['section-heading-container']}>
                  <Text style={bStyles['job-description-title']}>{capitalizeFirstLetter(name.replace(/_/g, ' '))}</Text>
                  <Text style={bStyles['job-description-title']}>{rating}</Text>
                </View>
                <View>
                  {
                    questions && questions.map((each: any) => {
                      const { question, suggestions } = each

                      const { covered, covered_partial, covered_not_valid } = suggestions || {}
                      return (
                        <View style={dStyles['question-container']}>
                          <Text style={dStyles['question-text']}>{question}</Text>=
                          <View style={dStyles['answer-container']}>
                            {
                              covered && covered?.length > 0 &&
                              covered.map(
                                (ans: any, index: number) => {
                                  return (
                                    <View style={[dStyles['answer-item-container'], index ? { marginTop: '10pt' } : {}]}>
                                      {getStatusIcon()}
                                      <Text style={dStyles['note-text']}>
                                        {ans}
                                      </Text>
                                    </View>
                                  );
                                }
                              )}

                            {
                              covered_partial && covered_partial?.length > 0 &&
                              covered_partial.map(
                                (ans: any, index: number) => {
                                  return (
                                    <View style={[dStyles['answer-item-container'], index ? { marginTop: 'pt' } : {}]}>
                                      {getStatusIcon('checkBlack')}
                                      <Text style={dStyles['note-text']}>
                                        {ans}
                                      </Text>
                                    </View>
                                  );
                                }
                              )}


                            {
                              covered_not_valid && covered_not_valid?.length > 0 &&
                              covered_not_valid.map(
                                (ans: any, index: number) => {
                                  return (
                                    <View style={[dStyles['answer-item-container'], index ? { marginTop: '10pt' } : {}]}>
                                      {getStatusIcon('frame')}
                                      <Text style={dStyles['note-text']}>
                                        {ans}
                                      </Text>
                                    </View>
                                  );
                                }
                              )
                            }
                            {
                              covered_not_valid?.length <= 0 &&
                              covered?.length <= 0 &&
                              covered_partial?.length <= 0 && (
                                <View style={dStyles['answer-item-container']}>
                                  {getStatusIcon('frame')}
                                  <Text style={dStyles['note-text']}>
                                    {"Not Answered"}
                                  </Text>
                                </View>
                              )}

                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              </View>
            )
          })
        }
      </View>
      {
        modifiedHlv_r && Object.keys(modifiedHlv_r).map((key, index, array) => {
          const list = modifiedLlrv[key]
          return (
            <View break>
              <View style={dStyles['skill-matrix-heading-container']}>
                <Text style={bStyles['text-heading-secondary']}>{capitalizeFirstLetter(key.replace(/_/g, ' '))}</Text>
                <Text style={bStyles['text-heading-secondary']}>{modifiedHlv_r[key]}%</Text>
              </View>
              <View>
                {
                  list && list.length > 0 && list.map(each => {
                    const { rating, description, metrics_name } = each;
                    return (
                      <View style={[dStyles['detailed-job-description-item'], bStyles['card-border']]}>
                        <View style={{ marginRight: "50pt" }}>
                          <Text style={bStyles['job-description-title']}>{metrics_name}</Text>
                          <Text style={[dStyles['note-text'], { marginLeft: '0pt', marginTop: '2pt' }]}>{description}</Text>
                        </View>
                        <Text style={[bStyles['job-description-title'], { marginLeft: "20pt" }]}>{rating}</Text>
                      </View>
                    )
                  })
                }
              </View>
            </View>
          )
        })
      }
    </View >
  )
}

export { PdfDetailedReport };
