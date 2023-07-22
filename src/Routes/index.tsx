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
