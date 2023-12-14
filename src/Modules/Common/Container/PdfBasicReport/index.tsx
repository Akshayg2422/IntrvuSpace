import { createNewObjectWithoutNullOrNaNValues } from '@Utils';
import { PdfBasicReportProps } from './interfaces';
import { basicReportStyles } from '@Modules'
import { Text, View } from '@react-pdf/renderer';


function PdfBasicReport({ details }: PdfBasicReportProps) {

    const { skill_matrix_overal_percent, report_other_analytics, skill_matrix } = details || {}

    const { sections } = skill_matrix || {};
    const modifiedAnalytics = createNewObjectWithoutNullOrNaNValues(report_other_analytics)

    return (
        <View style={basicReportStyles['basic-report-container']}>
            <View style={basicReportStyles['report-dashboard-container']}>
                <View style={[basicReportStyles['report-card-container'], { marginLeft: '0pt' }]}>
                    <Text style={[basicReportStyles['report-title'], { marginBottom: '3pt' }]}>{'Skill Matrix'}</Text>
                    <Text style={basicReportStyles['text-heading-primary']}>{skill_matrix_overal_percent}</Text>
                </View>
                {
                    modifiedAnalytics && Object.keys(modifiedAnalytics).map((key, index, array) => {
                        return (
                            <View style={[basicReportStyles['report-card-container'], index === array.length - 1 ? { marginRight: '0pt' } : {}]}>
                                <Text style={[basicReportStyles['report-title'], { marginBottom: '3pt' }]} >{key.replace(/_/g, ' ')}</Text>
                                <Text style={basicReportStyles['text-heading-secondary']}>{modifiedAnalytics[key]}</Text>
                            </View>
                        )
                    })
                }
            </View>

            <View style={basicReportStyles['job-description-container']}>
                <Text style={basicReportStyles['text-heading-secondary']}>{'Job Description Key Areas'}</Text>
                {sections && sections.length > 0 && sections.map((each => {
                    const { name, rating } = each
                    return (
                        <View style={[basicReportStyles['job-description-item'], basicReportStyles['card-border']]}>
                            <Text style={basicReportStyles['job-description-title']}>{name}</Text>
                            <Text style={basicReportStyles['job-description-title']}>{rating}</Text>
                        </View>
                    )
                }))}
            </View>
        </View>
    )
}

export { PdfBasicReport };
