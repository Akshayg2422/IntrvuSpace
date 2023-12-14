import { StyleSheet } from '@react-pdf/renderer';

const colors = {
  backgroundColor: "#ffffff",
  borderColor: '#c8e0cc',
  secondary: '#014d0d',
  primary: '#4cc916',
  desc: '#5A5D73',
  description: '#5A5D73'
};


const reportStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.backgroundColor,
    padding: '30pt',
  },
})



const basicReportStyles = StyleSheet.create({
  "basic-report-container": {
    marginVertical: '40pt'
  },
  "report-dashboard-container": {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '40pt'
  },
  'report-card-container': {
    width: '100%',
    borderRadius: '4pt',
    borderWidth: '1pt',
    padding: '15pt',
    marginHorizontal: "10pt",
    borderColor: colors.borderColor

  },
  "report-card-spacing": {
    marginHorizontal: "25pt"
  },
  'report-title': {
    color: colors.secondary,
    fontSize: '12pt',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  'text-heading-secondary': {
    color: colors.secondary,
    fontSize: '18pt',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  'text-heading-primary': {
    color: colors.primary,
    fontSize: '18pt',
    fontStyle: 'regular',
    textTransform: 'capitalize'
  },
  'job-description-container': {
  },
  "job-description-item": {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '25pt',
    padding: '15pt'
  },
  'card-border': {
    borderWidth: '1pt',
    borderColor: colors.borderColor,
    borderRadius: '4pt',
  },
  'job-description-title': {
    fontSize: '14pt',
    color: colors.secondary,
    fontWeight: 'bold'
  },
});

const detailedReportStyles = StyleSheet.create({

  'detailed-report-card-container': {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '25pt',
    padding: '40pt',
    marginVertical: '40pt'
  },
  'card-border': {
    borderWidth: '1pt',
    borderColor: colors.borderColor,
    borderRadius: '4pt',
  },
  'detailed-each-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'heading-font': {
    fontSize: '24pt',
    color: colors.secondary
  },
  'detailed-report-title': {
    fontSize: '13pt',
    textTransform: 'capitalize',
    color: colors.secondary
  },
  'skill-matrix-container': {
    display: 'flex',
    flexDirection: 'column'
  },
  'skill-matrix-heading-container': {
    marginTop: '40pt',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  'note-container': {
    marginTop: '18pt',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  'note-title': {
    fontSize: '11pt',
    color: colors.desc
  },
  'note-list-container': {
    marginTop: "6pt"
  },
  'note-list-item': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '6pt',
    flexDirection: 'row'
  },
  'note-list-icon': {
    width: '6pt',
    height: '6pt',
    objectFit: 'contain'
  },
  'note-text': {
    fontSize: "10pt",
    color: colors.description,
    marginLeft: '4pt'
  },
  'sections-card-container': {
    display: 'flex',
    padding: '15pt',
    marginTop: '25pt',
  },
  'section-heading-container': {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  'question-container': {
    marginTop: '15pt'
  },
  'answer-item-container': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4pt'
  },
  'question-text': {
    fontSize: '11pt',
    color: colors.secondary
  },
  'answer-container': {
    marginTop: '15pt'
  },
  'detailed-job-description-item': {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15pt',
    marginTop: '30pt',
  },
  'detailed-job-description-title': {
    fontSize: '15pt',
    color: colors.secondary
  }

})


export { reportStyles, basicReportStyles, detailedReportStyles };