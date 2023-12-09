import { icons } from '@Assets';
import {
  AdminLogin,
  AnalyzingAnimation,
  Clients,
  CreateNewPassword,
  CreateQuestionForm,
  Department,
  ForgotPassword,
  HowItWorks,
  Introduction,
  Login,
  LoginWithOtp,
  ManageTeamMate,
  Otp,
  PreparingYourInterview,
  PrivacyPolicy,
  QuestionSections,
  Questions, Register,
  Report,
  Reports,
  InterviewInfo,
  ReturnAndRefund,
  OngoingInterviews,
  Sector,
  Settings,
  TermsAndConditions,
  OpeningDetails,
  WeightageCountForm,
  EmailVerification,
  CorporateRegister,
  SettingDesignation,
  Companies,
  RecentInterviews,
  Candidates,
  SuperAdminCorporateRegister,
  Schedule,
  SuperAdminSchedules
} from '@Modules';

export const ROUTES = {
  'auth-module': {
    login: '/login',
    otp: '/otp',
    splash: '/',
    loginWithOtp: '/login-with-otp',
    register: '/register',
    admin_login: '/login-admin',
    privacy: '/privacy-policy',
    TermsAndConditions: '/terms-and-condition',
    ReturnAndRefund: '/return-and-refund',
    reports: '/reports',
    'how-it-works': '/how-it-works',
    introduction: '/introduction',
    forgotPassword: '/forgotPassword',
    createNewPassword: '/createNewPassword',
    'register-company': '/register-company',
    'mail-verification': '/mail-verification'
  },
  'designation-module': {
    Dashboard: "/companies",
    'weightage-count-form': "/weightage-count-form",
    'create-question-form': "/create-question-form",
    'sector': "/sector",
    'interview': '/interview',
    companies: "/companies",
    schedule: "/schedule",
    client: "/home",
    questions: "/questions",
    report: '/report',
    'question-sections': '/question-sections',
    'analyzing-animation': '/analyzing-animation',
    schedules: '/schedules',
    'opening-detail': '/opening-detail',
    settings: '/settings',
    'preparing-your-interview': '/preparing-your-interview',
    'department': '/department',
    'employeeDesignations': '/employeeDesignations',
    'ManageTeamMate': '/ManageTeamMate',
    // 'Sectors':'/Sectors'
    'candidate': '/candidate'
  },
  'super-admin': {
    companies: "/companies",
    'super-admin-register-company': '/super-admin-register-company',
    'recent-interviews': '/recent-interviews',
    'ongoing-interview': '/ongoing-interview',
    'admin-schedule': '/admin-schedule',
    'interview-info': '/interview-info',

  }
}

export const OLD_ROUTES = [
  {
    id: 4,
    path: ROUTES['designation-module']['questions'],
    component: <Questions />
  },
  {
    id: 5,
    path: ROUTES['designation-module']['question-sections'],
    component: <QuestionSections />
  },
  {
    id: 1,
    path: ROUTES['designation-module']['weightage-count-form'],
    component: <WeightageCountForm />
  },
  {
    id: 2,
    path: ROUTES['designation-module']['create-question-form'],
    component: <CreateQuestionForm />
  },
  {
    id: 6,
    path: ROUTES['designation-module']['analyzing-animation'],
    component: <AnalyzingAnimation />
  },
  {
    id: 12,
    path: ROUTES['super-admin']['ongoing-interview'],
    component: <OngoingInterviews />
  },
  {
    id: 11,
    path: ROUTES['designation-module']['preparing-your-interview'],
    component: <PreparingYourInterview />
  }
  ,
  {
    id: 10,
    path: ROUTES['super-admin']['interview-info'] + '/:schedule_id',
    component: <InterviewInfo />
  },
]


export const AUTH_ROUTES = [
  {
    id: 1,
    path: ROUTES['auth-module'].login,
    component: <Login />
  },
  {
    id: 2,
    path: ROUTES['auth-module'].otp,
    component: <Otp />
  },
  {
    id: 3,
    path: ROUTES['auth-module'].register,
    component: <Register />
  },
  {
    id: 4,
    path: ROUTES['auth-module'].loginWithOtp,
    component: <LoginWithOtp />
  },
  {
    id: 5,
    path: ROUTES['auth-module'].admin_login,
    component: <AdminLogin />
  },
  {
    key: 6,
    path: ROUTES['auth-module'].privacy,
    component: <PrivacyPolicy />
  },
  {
    key: 7,
    path: ROUTES['auth-module'].TermsAndConditions,
    component: <TermsAndConditions />
  },
  {
    key: 8,
    path: ROUTES['auth-module'].ReturnAndRefund,
    component: <ReturnAndRefund />
  },
  {
    key: 9,
    path: ROUTES['auth-module'].reports,
    component: <Reports />
  },
  {
    key: 10,
    path: ROUTES['auth-module']['how-it-works'],
    component: <HowItWorks />
  },
  {
    key: 11,
    path: ROUTES['auth-module'].introduction,
    component: <Introduction />
  },
  {
    key: 12,
    path: ROUTES['auth-module'].forgotPassword,
    component: <ForgotPassword />
  },
  {
    key: 13,
    path: ROUTES['auth-module'].createNewPassword,
    component: <CreateNewPassword />
  },
  {
    key: 15,
    path: ROUTES['auth-module']['register-company'],
    component: <CorporateRegister />
  },

  {
    key: 16,
    path: ROUTES['auth-module']['mail-verification'],
    component: <EmailVerification />
  }


]

export const JOB_SEEKER_ROUTES = [
  {
    id: 8,
    path: ROUTES['designation-module'].report + '/:schedule_id',
    component: <Report />
  },
  {
    path: ROUTES['designation-module'].client,
    name: "View as Member",
    icon: icons.viewAsMember,
    layout: "",
    component: <Clients />
  },
]

export const SUPER_ADMIN_ROUTES = [
  {
    id: 1,
    path: ROUTES['super-admin']['admin-schedule'],
    component: <SuperAdminSchedules />
  },
  {
    id: 2,
    path: ROUTES['super-admin']['ongoing-interview'],
    component: <OngoingInterviews />
  },
  {
    id: 3,
    path: ROUTES['super-admin']['interview-info'] + '/:schedule_id',
    component: <InterviewInfo />
  },
  {
    id: 4,
    path: ROUTES['super-admin'].companies,
    component: <Companies />
  },
  {
    id: 5,
    path: ROUTES['super-admin']['super-admin-register-company'],
    component: <SuperAdminCorporateRegister />
  },
  {
    id: 6,
    path: ROUTES['super-admin']['recent-interviews'],
    component: <RecentInterviews />
  },
  {
    id: 7,
    path: ROUTES['designation-module'].report + '/:schedule_id',
    component: <Report />,
    hide_side_nav: true
  },
]


export const ADMIN_ROUTES = [
  {
    id: 1,
    path: ROUTES['designation-module'].schedule,
    name: "Schedule",
    icon: icons.schedule,
    layout: "",
    component: <Schedule />
  },
  {
    id: 2,
    path: ROUTES['designation-module'].settings,
    name: "Settings",
    icon: icons.settings,
    layout: "",
    component: <Settings />
  },
  {
    id: 3,
    path: ROUTES['designation-module'].department,
    name: "Department",
    // icon: icons.settings,
    layout: "",
    component: <Department />
  },
  {
    id: 4,
    path: ROUTES['designation-module'].employeeDesignations,
    name: "Designations",
    // icon: icons.settings,
    layout: "",
    component: <SettingDesignation />
  },
  {
    id: 5,
    path: ROUTES['designation-module'].ManageTeamMate,
    name: "ManageTeamMate",
    // icon: icons.settings,
    layout: "",
    component: <ManageTeamMate />
  },
  {
    id: 6,
    path: ROUTES['designation-module'].report + '/:schedule_id',
    component: <Report />
  },
  {
    id: 7,
    path: ROUTES['designation-module']['sector'],
    component: <Sector />
  },
  {
    id: 3,
    path: ROUTES['designation-module']['candidate'],
    name: "candidate",
    component: <Candidates />
  },
  {
    id: 8,
    path: ROUTES['designation-module']['opening-detail'],
    component: <OpeningDetails />
  },
];



export * from "./RequireAuth";
export * from "./RequireHome";
