import { icons } from '@Assets'
import { Designation, WeightageCountForm, CreateQuestionForm, Clients, Sector, Questions, Call, Report, QuestionSections, AnalyzingAnimation, Schedules, Login, Otp, Splash, Register, LoginWithOtp, AdminLogin, VariantInfo, PrivacyPolicy, TermsAndConditions, ReturnAndRefund, Reports, HowItWorks, Introduction } from '@Modules';



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
    introduction: '/introduction'
  },
  'designation-module': {
    Dashboard: "/dashboard",
    'weightage-count-form': "/weightage-count-form",
    'create-question-form': "/create-question-form",
    'sector': "/sector",
    'interview': '/interview',
    dashboard: "/dashboard",
    designation: "/designation",
    client: "/client",
    questions: "/questions",
    report: '/report',
    'question-sections': '/question-sections',
    'analyzing-animation': '/analyzing-animation',
    schedules: '/schedules',
    'variant-info': '/variant-info',
  }
}


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
  // {
  //   id: 3,
  //   path: ROUTES['auth-module'].splash,
  //   component: <Splash />
  // },
  {
    id: 4,
    path: ROUTES['auth-module'].register,
    component: <Register />
  },
  {
    id: 5,
    path: ROUTES['auth-module'].loginWithOtp,
    component: <LoginWithOtp />
  },
  {
    id: 6,
    path: ROUTES['auth-module'].admin_login,
    component: <AdminLogin />
  },
  {
    key: 7,
    path: ROUTES['auth-module'].privacy,
    component: <PrivacyPolicy />
  },
  {
    key: 8,
    path: ROUTES['auth-module'].TermsAndConditions,
    component: <TermsAndConditions />
  },
  {
    key: 9,
    path: ROUTES['auth-module'].ReturnAndRefund,
    component: <ReturnAndRefund />
  },
  {
    key: 10,
    path: ROUTES['auth-module'].reports,
    component: <Reports />
  },
  {
    key: 11,
    path: ROUTES['auth-module']['how-it-works'],
    component: <HowItWorks/>
  },
  {
    key: 12,
    path: ROUTES['auth-module'].introduction,
    component: <Introduction />
  },

]

export const DASHBOARD_ROUTES = [
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
    id: 3,
    path: ROUTES['designation-module']['sector'],
    component: <Sector />
  },
  {
    id: 5,
    path: ROUTES['designation-module'].interview + '/:schedule_id',
    component: <Call />
  },
  {
    id: 4,
    path: ROUTES['designation-module']['questions'],
    component: <Questions />
  },
  {
    id: 6,
    path: ROUTES['designation-module']['question-sections'],
    component: <QuestionSections />
  },
  {
    id: 7,
    path: ROUTES['designation-module']['analyzing-animation'],
    component: <AnalyzingAnimation />
  },
  {
    id: 8,
    path: ROUTES['designation-module']['schedules'],
    component: <Schedules />
  },
  {
    id: 9,
    path: ROUTES['designation-module'].report + '/:schedule_id',
    component: <Report />
  },
  {
    id: 10,
    path: ROUTES['designation-module']['variant-info'],
    component: <VariantInfo />
  },

]

export const HOME_ROUTES = [
  {
    path: ROUTES['designation-module'].designation,
    name: "Designation",
    icon: icons.task,
    layout: "",
    component: <Designation />
  },
  {
    path: ROUTES['designation-module'].client,
    name: "View as Member",
    icon: icons.company,
    layout: "",
    component: <Clients />
  },
  // {
  //   path: ROUTES['designation-module'].report,
  //   name: "Report",
  //   icon: icons.company,
  //   layout: "",
  //   component: <Report />
  // },
  // {
  //   path: ROUTES['designation-module'].Dashboard,
  //   name: "Dashboard",
  //   icon: icons.issue,
  //   layout: "",
  //   component: <Dashboard />
  // },
];





export * from "./RequireAuth";
export * from "./RequireHome";