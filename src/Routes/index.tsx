import { icons } from '@Assets'
import {  Designation, WeightageCountForm, CreateQuestionForm,Clients, Sector } from '@Modules';


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
    dashboard: "/dashboard",
    group: "/group",
    client: "/client",
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
  {
    id:3,
    path: ROUTES['group-module']['sector'],
    component: <Sector />
  }

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
