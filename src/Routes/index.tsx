import { icons } from '@Assets'
import { Dashboard, Group } from '@Modules';


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
    sector:'/sector'
  }
}

export const HOME_ROUTES = [
  {
    path: ROUTES['group-module'].SCHEDULE,
    name: "Group",
    icon: icons.task,
    layout: "",
    component: <Group />
  },
  {
    path: ROUTES['group-module'].Dashboard,
    name: "Dashboard",
    icon: icons.issue,
    layout: "",
    component: <Dashboard />
  },
];

export * from "./RequireAuth";
export * from "./RequireHome";
