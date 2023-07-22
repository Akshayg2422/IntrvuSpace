import { icons } from '@Assets'
import { Designation } from '@Modules'


export const ROUTES = {
  'auth-module': {
    login: '/login',
    otp: '/otp',
    splash: '/splash',
    register: '/register',
    landing: '/'
  },
  'group-module': {
    dashboard: "/dashboard",
    group: "/group",
    sector:'/sector'
  }
}

export const HOME_ROUTES = [
  {
    path: ROUTES['group-module'].group,
    name: "Group",
    icon: icons.task,
    layout: "",
    component: <Designation />
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
