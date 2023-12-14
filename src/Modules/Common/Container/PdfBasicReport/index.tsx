import { createNewObjectWithoutNullOrNaNValues } from '@Utils';
import { PdfBasicReportProps } from './interfaces';
import { bStyles, dStyles } from '@Modules'
import { Text, View } from '@react-pdf/renderer';

function PdfBasicReport({ details }: PdfBasicReportProps) {

    const { skill_matrix_overal_percent, report_other_analytics, skill_matrix } = details || {}
    const { sections } = skill_matrix || {};
    const modifiedAnalytics = createNewObjectWithoutNullOrNaNValues(report_other_analytics)

    return (
        <View style={bStyles['basic-report-container']}>
            <View style={bStyles['report-dashboard-container']}>
                <View style={[bStyles['report-card-container'], dStyles['card-border'], { marginLeft: '0pt' }]}>
                    <Text style={bStyles['report-title']}>{'Skill Matrix'}</Text>
                    <Text style={bStyles['text-heading-primary']}>{skill_matrix_overal_percent}</Text>
                </View>
                {
                    modifiedAnalytics && Object.keys(modifiedAnalytics).map((key, index, array) => {
                        return (
                            <View style={[bStyles['report-card-container'], dStyles['card-border'], index === array.length - 1 ? { marginRight: '0pt' } : {}]}>
                                <Text style={bStyles['report-title']} >{key.replace(/_/g, ' ')}</Text>
                                <Text style={bStyles['text-heading-secondary']}>{modifiedAnalytics[key]}</Text>
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
        </View>
    )
}

export { PdfBasicReport };
