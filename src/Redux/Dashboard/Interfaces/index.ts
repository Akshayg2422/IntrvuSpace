export interface DashboardProp {
  userLoggedIn: boolean
  chat: any
  GroupDetails: any
  jdItemCount:any
  selectedRole: any
  knowledgeGroups: any
  sectors: any
  questions: any
  selectedClientSector: any
  questionSection: any
  selectedQuestionForm: any
  formSectionQuestions: any
  basicReport: any
  onGoingScheduleMessage: any,
  myPastInterviews: any,
  onGoingSelectedId: any,
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
  isCreateOpening?: boolean;
  openingCandidates?: any;
  openingCandidatesNumOfPages: any,
  openingCandidatesCurrentPages: number,
  error?: string;
  departmentCorporate: any;
  departmentCorporateNumOfPages: any
  departmentsCorporateCurrentPages: any,
  designations: any;
  designationsNumOfPage: any,
  designationsCurrentPage: any,
  addTeamMates: any,
  teams: any,
  teamNumOfPages: any,
  teamCurrentPages: any,
  sectorsCorporate: any;
  sectorsCorporateNumOfPages: any,
  sectorsCorporateCurrentPages: any,
  interviewUserScheduleDetails: any,
  onGoingMessage: any,
  corporateScheduleCount?: number;
  refreshCorporateSchedules?: boolean;
  openingCandidatesCount?: number;
  interviewUrl?: any;
  jdItemNumOfPages:any;
  jdItemCurrentPages:any;
  faceVisible:boolean;

}
