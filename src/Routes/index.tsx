import { icons } from '@Assets'
import { Designation, WeightageCountForm, CreateQuestionForm, Clients, Sector, Questions, Call, Report, QuestionSections } from '@Modules';



export const ROUTES = {
  'auth-module': {
    login: '/login',
    otp: '/otp',
    splash: '/splash',
    register: '/register',
    landing: '/'
  },
  'group-module': {
    Dashboard: "/dashboard",
    SCHEDULE: "/schedule",
    'weightage-count-form': "/weightage-count-form",
    'create-question-form': "/create-question-form",
    'sector': "/sector",
    'call': '/call',
    dashboard: "/dashboard",
    group: "/",
    client: "/client",
    questions: "/questions",
    report: '/report',
    'question-sections':'/question-sections'
  }
}

export const DASHBOARD_ROUTES = [
  {
    id: 1,
    path: ROUTES['group-module']['weightage-count-form'],
    component: <WeightageCountForm />
  },
  {
    id: 2,
    path: ROUTES['group-module']['create-question-form'],
    component: <CreateQuestionForm />
  },
  {
    id: 3,
    path: ROUTES['group-module']['sector'],
    component: <Sector />
  },
  {
    id: 5,
    path: ROUTES['group-module']['call'],
    component: <Call />
  },
  {
    id: 4,
    path: ROUTES['group-module']['questions'],
    component: <Questions />
  },
  {
    id: 6,
    path: ROUTES['group-module']['question-sections'],
    component: <QuestionSections />
  },

]

export const HOME_ROUTES = [
  {
    path: ROUTES['group-module'].group,
    name: "Group",
    icon: icons.task,
    layout: "",
    component: <Designation />
  },
  {
    path: ROUTES['group-module'].client,
    name: "Clients",
    icon: icons.company,
    layout: "",
    component: <Clients />
  },
  {
    path: ROUTES['group-module'].report,
    name: "Report",
    icon: icons.company,
    layout: "",
    component: <Report />
  },
  // {
  //   path: ROUTES['group-module'].Dashboard,
  //   name: "Dashboard",
  //   icon: icons.issue,
  //   layout: "",
  //   component: <Dashboard />
  // },
];

export * from "./RequireAuth";
export * from "./RequireHome";
