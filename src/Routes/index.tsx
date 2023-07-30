import { icons } from '@Assets'
import { Designation, WeightageCountForm, CreateQuestionForm, Clients, Sector, Questions, Call, Report, QuestionSections, AnalyzingAnimation, Schedules, Login, Otp, Splash, Register, LoginWithOtp, AdminLogin } from '@Modules';



export const ROUTES = {
  'auth-module': {
    login: '/login',
    otp: '/otp',
    splash: '/splash',
    loginWithOtp: '/login-with-otp',
    register: '/register',
    landing: '/',
    admin_login: '/login-admin'
  },
  'designation-module': {
    Dashboard: "/dashboard",
    'weightage-count-form': "/weightage-count-form",
    'create-question-form': "/create-question-form",
    'sector': "/sector",
    'call': '/call',
    dashboard: "/dashboard",
    designation: "/designation",
    client: "/client",
    questions: "/questions",
    report: '/report',
    'question-sections': '/question-sections',
    'analyzing-animation': '/analyzing-animation',
    schedules: '/schedules'
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
  {
    id: 3,
    path: ROUTES['auth-module'].splash,
    component: <Splash />
  },
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
    path: ROUTES['designation-module']['call'],
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
    name: "Clients",
    icon: icons.company,
    layout: "",
    component: <Clients />
  },
  {
    path: ROUTES['designation-module'].report,
    name: "Report",
    icon: icons.company,
    layout: "",
    component: <Report />
  },
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