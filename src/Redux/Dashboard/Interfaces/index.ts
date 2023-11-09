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
  myPastInterviews: any
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
  error?: string;
  departmentCorporate: any;
  departmentCorporateNumOfPages:any
  departmentsCorporateCurrentPages:any,
  designations:any;
  designationsNumOfPage:any,
  designationsCurrentPage:any,
  addTeamMates:any,
  getTeamMateDatas:any,
  getTeamMateDatasNumOfPages:any,
  getTeamMateDatasCurrentPages:any,
  sectorsCorporate: any;
  sectorsCorporateNumOfPages: any,
  sectorsCorporateCurrentPages: any,
}
