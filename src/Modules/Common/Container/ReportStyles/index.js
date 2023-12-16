import { StyleSheet, Font } from '@react-pdf/renderer';
import boldFont from '../../../../Assets/fonts/pdf/DMSans-Bold.ttf';
import semiBold from '../../../../Assets/fonts/pdf/DMSans-SemiBold.ttf';
import regularFont from '../../../../Assets/fonts/pdf/DMSans-Regular.ttf';




Font.register({
  family: 'DmSans-Bold',
  src: boldFont,
  fontWeight: 'bold',
});

Font.register({
  family: 'DMSans-SemiBold',
  src: semiBold,
  fontWeight: 'semibold',
});

Font.register({
  family: 'DMSans-Regular',
  src: regularFont,
  fontWeight: 400
});

const colors = {
  backgroundColor: "#ffffff",
  borderColor: '#c8e0cc',
  secondary: '#014d0d',
  primary: '#4cc916',
  desc: '#5a5d73',
};



const rStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.backgroundColor,
    padding: '38pt',
  },
  bold: {
    fontFamily: 'DmSans-Bold',
    fontWeight: 'bold'
  },
  'semi-bold': {
    fontFamily: 'DMSans-SemiBold',
    fontWeight: 'semibold'
  },
  regular: {
    fontFamily: 'DMSans-Regular',
    fontWeight: 400
  },
  'brand-container': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '50pt'
  },
  logo: {
    height: '30pt',
    objectFit: 'contain',
  }
})

const hStyles = StyleSheet.create({
  'base-info-container': {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  'location-mark': {
    width: '12pt',
    height: '12pt',
    objectFit: 'contain'
  },
  'report-header-wrapper': {
    display: 'flex',
    flexDirection: 'row',
  },
  'user-info-container': {
    flex: 1,
    marginTop: '4pt'
  },
  'user-detail-container': {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  },
  'mark-container': {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
  },
  'profile-placeholder': {
    height: '40pt',
    width: '40pt',
    objectFit: 'contain'
  },
  'user-photo-container': {
    display: 'flex',
    width: '65pt',
    height: '65pt',
    borderRadius: '4pt',
    overflow: 'hidden',
  },
  'location-container': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10pt'
  },
  'location-text-container': {
    display: 'flex',
    flexDirection: 'row',
  },
  'location-text': {
    fontSize: '10pt',
    color: colors.desc
  },
  'user-heading': {
    fontSize: '26pt',
    color: colors.secondary,
    ...rStyles.bold,
  },
  'user-role': {
    fontSize: '10pt',
    textTransform: 'capitalize',
    marginBottom: '4pt',
    color: colors.secondary,
    ...rStyles['semi-bold'],
  },
  "mark-text": {
    fontSize: '35pt',
    ...rStyles.bold,
  },
  'experience-container': {
    marginTop: '2pt',
    backgroundColor: '#e0fad9',
    paddingHorizontal: '18pt',
    paddingVertical: '5pt',
    borderRadius: '50%'
  },
  'experience-text': {
    fontSize: '11pt',
    color: colors.primary,
    ...rStyles.bold
  }
});

const bStyles = StyleSheet.create({
  "basic-report-container": {
    marginTop: '50pt'
  },
  "report-dashboard-container": {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '40pt'
  },
  'report-card-container': {
    width: '100%',
    padding: '15pt',
    marginHorizontal: "10pt",
  },
  "report-card-spacing": {
    marginHorizontal: "25pt"
  },
  'report-title': {
    color: colors.secondary,
    fontSize: '10pt',
    textTransform: 'capitalize',
    ...rStyles['semi-bold'],
  },
  'text-heading-secondary': {
    color: colors.secondary,
    fontSize: '18pt',
    textTransform: 'capitalize',
    ...rStyles.bold
  },
  'text-heading-primary': {
    color: colors.primary,
    fontSize: '18pt',
    textTransform: 'capitalize',
    ...rStyles.bold
  },
  'job-description-container': {
  },
  "job-description-item": {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '25pt',
    padding: '18pt',
  },
  'card-border': {
    borderWidth: '1pt',
    borderColor: colors.borderColor,
    borderRadius: '4pt',
  },
  'job-description-title': {
    fontSize: '13pt',
    color: colors.secondary,
    ...rStyles.bold,
  },
});

const dStyles = StyleSheet.create({
  'detailed-report-card-container': {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '35pt',
    marginVertical: '50pt',
    marginHorizontal: '30pt',
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
    fontSize: '20pt',
    color: colors.secondary,
    ...rStyles.bold
  },
  'detailed-report-title': {
    fontSize: '12pt',
    textTransform: 'capitalize',
    color: colors.secondary,
    ...rStyles['semi-bold']

  },
  'skill-matrix-container': {
    display: 'flex',
    flexDirection: 'column'
  },
  'skill-matrix-heading-container': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  'note-container': {
    marginTop: '25pt',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  'note-title': {
    fontSize: '11pt',
    color: colors.secondary,
    ...rStyles['semi-bold']
  },
  'note-list-container': {
    marginTop: '2pt',
  },
  'note-list-item': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '5pt',
    flexDirection: 'row'
  },
  'note-list-icon': {
    width: '6pt',
    height: '6pt',
    objectFit: 'contain'
  },
  'note-text': {
    fontSize: "10pt",
    color: colors.desc,
    marginLeft: '2pt',
    ...rStyles.regular
  },
  'sections-card-container': {
    display: 'flex',
    marginTop: '25pt',
    padding: '18pt',
  },
  'section-heading-container': {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  'question-container': {
    marginTop: '10pt',
  },
  'answer-item-container': {
    display: 'flex',
    flexDirection: 'row',
  },
  'question-text': {
    fontSize: '10pt',
    color: colors.secondary,
    ...rStyles.regular
  },
  'answer-container': {
    marginTop: '10pt'
  },
  'detailed-job-description-item': {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '25pt',
    padding: '18pt',
  },
  'detailed-job-description-title': {
    fontSize: '15pt',
    color: colors.secondary
  }

})


export { rStyles, hStyles, bStyles, dStyles };