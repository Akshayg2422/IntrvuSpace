import { StatusIcon } from '@Components';
import { capitalizeFirstLetter, createNewObjectWithoutNullOrNaNValues } from '@Utils';
import { PdfDetailedReportProps } from './interfaces';
import { detailedReportStyles, basicReportStyles } from '@Modules'

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
    return <Image src={iconMap[variant]} style={detailedReportStyles['note-list-icon']} />
  }

  return (
    <View style={detailedReportStyles['detailed-report-container']} >
      <View style={[detailedReportStyles['detailed-report-card-container'], detailedReportStyles['card-border']]}>
        <View style={detailedReportStyles['detailed-each-container']}>
          <Text style={detailedReportStyles['heading-font']}>{skill_matrix_overal_percent}%</Text>
          <Text style={detailedReportStyles['detailed-report-title']}>{'Skill Matrix'}</Text>
        </View>

        {
          modifiedHlv_r && Object.keys(modifiedHlv_r).map((key, index, array) => {
            return (
              <View style={detailedReportStyles['detailed-each-container']}>
                <Text style={detailedReportStyles['heading-font']}>{modifiedHlv_r[key]}%</Text>
                <Text style={detailedReportStyles['detailed-report-title']}>{key.replace(/_/g, ' ')}</Text>
              </View>
            )
          })
        }
      </View>

      <View style={basicReportStyles['job-description-container']}>
        <Text style={basicReportStyles['text-heading-secondary']}>{'Job Description Key Areas'}</Text>
        {sections && sections.length > 0 && sections.map((each => {
          const { id, name, rating } = each
          return (
            <View style={[basicReportStyles['job-description-item'], basicReportStyles['card-border']]}>
              <Text style={basicReportStyles['job-description-title']}>{name}</Text>
              <Text style={basicReportStyles['job-description-title']}>{rating}</Text>
            </View>
          )
        }))}
      </View>



      <View break>
        <View style={detailedReportStyles['skill-matrix-container']}>
          <View style={detailedReportStyles['skill-matrix-heading-container']}>
            <Text style={basicReportStyles['text-heading-secondary']}>{'Skill Matrix Report'}</Text>
            <Text style={basicReportStyles['text-heading-secondary']}>{skill_matrix_overal_percent}%</Text>
          </View>
          <View style={detailedReportStyles['note-container']}>
            <View>
              <Text style={detailedReportStyles['note-title']}>{'Note'}</Text>
              <View style={detailedReportStyles['note-list-container']}>
                {
                  NOTE.map(each => {
                    const { id, icon, text } = each
                    return (
                      <View key={id} style={detailedReportStyles['note-list-item']}>
                        <Image src={icon} style={detailedReportStyles['note-list-icon']} />
                        <Text style={detailedReportStyles['note-text']}>{text}</Text>
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
              <View style={[detailedReportStyles['sections-card-container'], basicReportStyles['card-border']]}>
                <View style={detailedReportStyles['section-heading-container']}>
                  <Text style={basicReportStyles['job-description-title']}>{capitalizeFirstLetter(name.replace(/_/g, ' '))}</Text>
                  <Text style={basicReportStyles['job-description-title']}>{rating}</Text>
                </View>

                <View>
                  {
                    questions && questions.map(each => {
                      const { question, suggestions } = each

                      const { covered, covered_partial, covered_not_valid } = suggestions || {}
                      return (
                        <View style={detailedReportStyles['question-container']}>
                          <Text style={detailedReportStyles['question-text']}>{question}</Text>=
                          <View style={detailedReportStyles['answer-container']}>
                            {
                              covered && covered?.length > 0 &&
                              covered.map(
                                (ans: any) => {
                                  return (
                                    <View style={detailedReportStyles['answer-item-container']}>
                                      {getStatusIcon()}
                                      <Text style={detailedReportStyles['note-text']}>
                                        {ans}
                                      </Text>
                                    </View>
                                  );
                                }
                              )}

                            {
                              covered_partial && covered_partial?.length > 0 &&
                              covered_partial.map(
                                (ans: any) => {
                                  return (
                                    <View style={detailedReportStyles['answer-item-container']}>
                                      {getStatusIcon('checkBlack')}
                                      <Text style={detailedReportStyles['note-text']}>
                                        {ans}
                                      </Text>
                                    </View>
                                  );
                                }
                              )}


                            {
                              covered_not_valid && covered_not_valid?.length > 0 &&
                              covered_not_valid.map(
                                (ans: any) => {
                                  return (
                                    <View style={detailedReportStyles['answer-item-container']}>
                                      {getStatusIcon('frame')}
                                      <Text style={detailedReportStyles['note-text']}>
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
                                <View style={detailedReportStyles['answer-item-container']}>
                                  {getStatusIcon('frame')}
                                  <Text style={detailedReportStyles['note-text']}>
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
              <View style={detailedReportStyles['skill-matrix-heading-container']}>
                <Text style={basicReportStyles['text-heading-secondary']}>{capitalizeFirstLetter(key.replace(/_/g, ' '))}</Text>
                <Text style={basicReportStyles['text-heading-secondary']}>{modifiedHlv_r[key]}%</Text>
              </View>
              <View>
                {
                  list && list.length > 0 && list.map(each => {
                    const { rating, description, metrics_name } = each;
                    return (
                      <View style={[detailedReportStyles['detailed-job-description-item'], basicReportStyles['card-border']]}>
                        <View style={{ marginRight: "50pt" }}>
                          <Text style={detailedReportStyles['detailed-job-description-title']}>{metrics_name}</Text>
                          <Text style={[detailedReportStyles['note-text'], { marginLeft: '1pt', marginTop: '5pt' }]}>{description}</Text>
                        </View>
                        <Text style={[detailedReportStyles['detailed-job-description-title'], { marginLeft: "20pt" }]}>{rating}</Text>
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
  )
}

export { PdfDetailedReport };
