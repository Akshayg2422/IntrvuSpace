import { icons } from "@Assets";

export const DEFAULT_TASK_GROUP = { id: 'ALL', Photo: null, code: "ALL" }

export const ERRORS = {
  SOMETHING_WENT_WRONG: 'Something went wrong, please try again later',
  INVALID_REQUEST: 'Invalid Request',
};

export const USER_TOKEN = 'USER_TOKEN'

export const FCM_TOKEN = 'FCM_TOKEN'

export const GENDER_LIST = [
  { id: 'M', text: 'Male' },
  { id: 'F', text: 'Female' },
  { id: 'O', text: 'Others' },
];
export const DESIGNATION_LIST = [
  { id: 'true', text: 'Business Owner' },
  { id: 'false', text: 'Management' },
];

export const LANGUAGES = [
  { id: '1', text: 'English', value: 'en' },
  { id: '2', text: 'Tamil', value: 'ta' },
];

export const type = [
  { id: '1', text: 'External', value: 'Ext' },
  { id: '2', text: 'Internal', value: 'Int' },
]

export const DEFAULT_LANGUAGE = LANGUAGES[0]


export function isExist(val: any) {
  return val ? val : ''
}

export const LANGUAGE_ENGLISH = 'EN';
export const LANGUAGE_TAMIL = 'TA';


export const BUSINESS = 'business';
export const ERROR_MESSAGE_ALERT = 'A';
export const ERROR_MESSAGE_SHORT_TOAST = 'S';
export const ERROR_MESSAGE_LONG_TOAST = 'L';
export const ERROR_MESSAGE_MEDIUM_TOAST = 'M';

export const OTP_RESEND_DEFAULT_TIME = 59;

/* Event types Status Code */

export const MEA = 'MEA'
export const TGU = 'TGU'
export const RGU = 'RGU'
export const TEM = 'TEM'
export const EVS = 'EVS'
export const RTS = 'RTS'
export const ETA = 'ETA'

export const TASK_FILTER_LIST = [
  { id: 'ALL', text: 'All' },
  { id: 'created_by', text: 'Created by me' },
  { id: 'assigned_to', text: 'Assigned to me' },
  { id: 'tagged_to', text: 'Tagged' }
];


export const TASK_STATUS_LIST = [
  { id: 'ALL', text: 'All', },
  { id: 'RAI', text: 'Raised', color: "gray" },
  { id: 'INP', text: 'In-Progress', color: "yellow" },
  { id: 'CAN', text: 'Cancel', color: "red" },
  { id: "CLS", text: 'Close', color: "red" },
  { id: 'ONH', text: 'On-Hold', color: "black" },
  { id: 'REJ', text: 'Reject', color: "red" }

]


export const TASK_PRIORITY_LIST = [
  { id: 'ALL', text: "All" },
  { id: 1, text: "Lowest", color: "black" },
  { id: 2, text: "Low", color: "black" },
  { id: 3, text: "Medium", color: "orange" },
  { id: 4, text: "High", color: "red" },
  { id: 5, text: "Critical", color: "gray" },
];

export const TICKET_FILTER_LIST = [
  { id: 'ALL', text: 'All' },
  { id: 'created_by', text: 'Created by me' },
  { id: 'assigned_to', text: 'Assigned to me' },
  { id: 'tagged_to', text: 'Tagged' }
];

export const TICKET_STATUS_LIST = [
  { id: 'ALL', text: 'All', },
  { id: 'RAI', text: 'Raised', color: "gray" },
  { id: 'INP', text: 'In-Progress', color: "yellow" },
  { id: 'CAN', text: 'Cancel', color: "red" },
  { id: "CLS", text: 'Close', color: "red" },
  { id: 'ONH', text: 'On-Hold', color: "black" },
  { id: 'REJ', text: 'Reject', color: "red" }

]

export const TICKET_PRIORITY_LIST = [
  { id: 'ALL', text: "All" },
  { id: 1, text: "Lowest", color: "black" },
  { id: 2, text: "Low", color: "black" },
  { id: 3, text: "Medium", color: "orange" },
  { id: 4, text: "High", color: "red" },
  { id: 5, text: "Critical", color: "gray" },
];



export const STATUS_LIST = [
  { id: 'ALL', text: 'All', },
  { id: 'RAI', text: 'Raised', color: "gray" },
  { id: 'INP', text: 'In-Progress', color: "yellow" },
  { id: 'CAN', text: 'Cancel', color: "red" },
  { id: "CLS", text: 'Close', color: "red" },
  { id: 'ONH', text: 'On-Hold', color: "black" },
  { id: 'REJ', text: 'Reject', color: "red" }

]

export const GROUP_STATUS_LIST = [
  { id: 'ALL', text: 'All', },
  { id: 'RAI', text: 'Raised', color: "gray" },
  { id: 'INP', text: 'In-Progress', color: "yellow" },
  { id: 'CAN', text: 'Cancel', color: "red" },
  { id: "CLS", text: 'Close', color: "red" },
  { id: 'ONH', text: 'On-Hold', color: "black" },
  { id: 'REJ', text: 'Reject', color: "red" }

]


export const FILTERED_LIST = [
  { id: 'ALL', text: 'All' },
  { id: 'created_by', text: 'Created by me' },
  { id: 'assigned_to', text: 'Assigned to me' },
  { id: 'tagged_to', text: 'Tagged' }
];



export const PRIORITY_DROPDOWN_LIST = [
  { id: 'ALL', text: "All" },
  { id: 1, text: "Lowest", color: "black" },
  { id: 2, text: "Low", color: "black" },
  { id: 3, text: "Medium", color: "orange" },
  { id: 4, text: "High", color: "red" },
  { id: 5, text: "Critical", color: "gray" },
];
export const PRIORITY = [
  { id: 1, text: "Lowest", color: "black" },
  { id: 2, text: "Low", color: "black" },
  { id: 3, text: "Medium", color: "orange" },
  { id: 4, text: "High", color: "red" },
  { id: 5, text: "Critical", color: "gray" },
];

export const PRIORITY_DROPDOWNICON_LIST = [
  { id: 'ALL', text: "All" },
  { id: 1, text: "Lowest", icon: icons.eye, color: "black" },
  { id: 2, text: "Low", icon: icons.eye, color: "black" },
  { id: 3, text: "Medium", icon: icons.eye, color: "orange" },
  { id: 3, text: "High", icon: icons.eye, color: "red" },
  { id: 3, text: "Critical", icon: icons.eye, color: "gray" }
];


export const COMPANY_TYPE = [
  { id: '', text: "Self" },
]


export const SEARCH_PAGE = 1
export const INITIAL_PAGE = 1


export const TASK_EVENT_ETA = 'ETA'





export const SPEAK_PROCEED_LIST = [
  "Are you still with us?",
  "Could I get your input on this?",
  "Are you available to share your thoughts?",
  "Is everything okay on your end?",
  "Can you give us your perspective?",
  "Are you able to provide a response?",
  "We're eager to hear your insights, are you there?",
  "Feel free to chime in whenever you're ready.",
  "Would you like to share your viewpoint?",
  "Let us know if you're able to contribute to the discussion.",
  "Is this a good time for you to answer?",
  "Can we hear from you on this matter?",
  "Would you mind sharing your thoughts?",
  "Feel free to join the conversation whenever you're ready.",
  "Are you present and prepared to respond?",
  "Could you give us your viewpoint on this topic?",
  "Ready when you are – please give us your response.",
  "Is there a response you'd like to share with us?",
  "Can you let us know your stance on this?",
  "Could we have your thoughts on this matter?",
  "Would you like to offer your viewpoint?"
]
