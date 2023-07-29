import { icons } from '@Assets'
import { Designation, WeightageCountForm, CreateQuestionForm, Clients, Sector, Questions, Call, Report, QuestionSections, AnalyzingAnimation, Login, Otp, Splash, Register } from '@Modules';



export const ROUTES = {
  'auth-module': {
    login: '/login',
    otp: '/otp',
    splash: '/splash',
    register: '/register',
    landing: '/'
  },
  'designation-module': {
    Dashboard: "/dashboard",
    SCHEDULE: "/schedule",
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
    'analyzing-animation': '/analyzing-animation'
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
    id: 3,
    path: ROUTES['auth-module'].register,
    component: <Register />
  }


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
]

export const HOME_ROUTES = [
  {
    path: ROUTES['designation-module'].designation,
    name: "Group",
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