import { icons } from '@Assets'
import { Dashboard, Group,WeightageCountForm,CreateQuestionForm } from '@Modules';


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
    WEIGHTAGECOUNTFORM:"/weightage-count-form",
    CREATEQUESTIONFORM:"/create-question-form"
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
    path: ROUTES['group-module'].WEIGHTAGECOUNTFORM,
    name: "Form",
    icon: icons.company,
    layout: "",
    component: <WeightageCountForm/>
  },
  {
    path: ROUTES['group-module'].CREATEQUESTIONFORM,
    name: "Create Question Form",
    icon: icons.company,
    layout: "",
    component: <CreateQuestionForm/>
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
