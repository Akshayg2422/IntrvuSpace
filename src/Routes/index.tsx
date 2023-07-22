import { icons } from '@Assets'
import { Dashboard, Designation, WeightageCountForm, CreateQuestionForm } from '@Modules';


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
    dashboard: "/dashboard",
    group: "/group",
  }
}

export const DASHBOARD_ROUTES = [
  {
    id:1,
    path: ROUTES['group-module']['weightage-count-form'],
    component: <WeightageCountForm />
  },
  {
    id:2,
    path: ROUTES['group-module']['create-question-form'],
    component: <CreateQuestionForm />
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

  // {
  //   path: ROUTES['ticket-module'].tickets,
  //   name: translate("sideNav.Tickets"),
  //   icon: icons.issue,
  //   layout: "",
  //   component: <Tickets />
  // },
];

export * from "./RequireAuth";
export * from "./RequireHome";
