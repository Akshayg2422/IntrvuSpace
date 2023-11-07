export interface DashboardProp {
  userLoggedIn: boolean
  chat: any
  GroupDetails: any
  selectedRole: any
  knowledgeGroups: any
  sectors: any
  questions: any
  selectedClientSector: any
  questionSection: any
  selectedQuestionForm: any
  formSectionQuestions: any
  basicReport: any
  onGoingScheduleMessage :any,
  myPastInterviews: any,
  onGoingSelectedId:any,
  scheduleId: any
  generateQuestionSections: any
  generateSectionsAndQuestions: any
  questionDetails: any
  registerData: any
  removeSideNav: boolean
  breadCrumb: any
  VideoSessionDetails: any
  recordingPermission: boolean
  jdVariantData: any,
  jdItem: any
  scheduleInfo: any,
  selectedSection: number,
  corporateScheduleDetails: any,
  studentCodeOutput?: any;
  loading?: boolean;
  codeOutputData?: any;
  selectedSectionId?: any;
  canStartInterview?: any;
  createJdModal?: boolean;
  sectorsCorporate: any;
  departmentCorporate: any;
  corporateSchedules: any,
  createForOthersJdModal: boolean,
  interviewScheduleDetails: any,
  retrieveEmail: any,
  corporateScheduleNumOfPages: any,
  corporateScheduleCurrentPages: number,
  createOpening?:boolean;
  candidatesList?: boolean;
  candidatesListNumOfPages: any,
  candidatesListCurrentPages: number,
  interviewUserScheduleDetails:any
}
