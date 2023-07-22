import { icons } from '@Assets'
import { Designation, Clients } from '@Modules'


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
    client: "/client",
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
  {
    path: ROUTES['group-module'].client,
    name: "Clients",
    icon: icons.company,
    layout: "",
    component: <Clients />
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
