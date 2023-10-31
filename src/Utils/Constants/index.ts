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

export const languageOptions = [
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
    ide: 'JS'
  },
  {
    id: 70,
    name: "Python (2.7.17)",
    label: "Python (2.7.17)",
    value: "python",
    ide: 'PY'
  },
  {
    id: 45,
    name: "Assembly (NASM 2.14.02)",
    label: "Assembly (NASM 2.14.02)",
    value: "assembly",
    ide: 'Assembly'
  },
  {
    id: 46,
    name: "Bash (5.0.0)",
    label: "Bash (5.0.0)",
    value: "bash",
    ide: 'Bash'
  },
  {
    id: 47,
    name: "Basic (FBC 1.07.1)",
    label: "Basic (FBC 1.07.1)",
    value: "basic",
    ide: 'Basic'
  },
  {
    id: 75,
    name: "C (Clang 7.0.1)",
    label: "C (Clang 7.0.1)",
    value: "c",
    ide: 'C'
  },
  {
    id: 76,
    name: "C++ (Clang 7.0.1)",
    label: "C++ (Clang 7.0.1)",
    value: "cpp",
    ide: 'C++'
  },
  {
    id: 48,
    name: "C (GCC 7.4.0)",
    label: "C (GCC 7.4.0)",
    value: "c",
    ide: 'C'
  },
  {
    id: 52,
    name: "C++ (GCC 7.4.0)",
    label: "C++ (GCC 7.4.0)",
    value: "cpp",
    ide: 'C++'
  },
  {
    id: 49,
    name: "C (GCC 8.3.0)",
    label: "C (GCC 8.3.0)",
    value: "c",
    ide: 'C'
  },
  {
    id: 53,
    name: "C++ (GCC 8.3.0)",
    label: "C++ (GCC 8.3.0)",
    value: "cpp",
    ide: 'C++'
  },
  {
    id: 50,
    name: "C (GCC 9.2.0)",
    label: "C (GCC 9.2.0)",
    value: "c",
    ide: 'C'
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
    label: "C++ (GCC 9.2.0)",
    value: "cpp",
    ide: 'C++'
  },
  {
    id: 86,
    name: "Clojure (1.10.1)",
    label: "Clojure (1.10.1)",
    value: "clojure",
    ide: 'Clojure'
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    label: "C# (Mono 6.6.0.161)",
    value: "csharp",
    ide: 'C#'
  },
  {
    id: 77,
    name: "COBOL (GnuCOBOL 2.2)",
    label: "COBOL (GnuCOBOL 2.2)",
    value: "cobol",
    ide: 'COBOL'
  },
  {
    id: 55,
    name: "Common Lisp (SBCL 2.0.0)",
    label: "Common Lisp (SBCL 2.0.0)",
    value: "lisp",
    ide: 'Common Lisp'
  },
  {
    id: 56,
    name: "D (DMD 2.089.1)",
    label: "D (DMD 2.089.1)",
    value: "d",
    ide: 'D'
  },
  {
    id: 57,
    name: "Elixir (1.9.4)",
    label: "Elixir (1.9.4)",
    value: "elixir",
    ide: 'Elixir'
  },
  {
    id: 58,
    name: "Erlang (OTP 22.2)",
    label: "Erlang (OTP 22.2)",
    value: "erlang",
    ide: 'Erlang'
  },
  {
    id: 44,
    label: "Executable",
    name: "Executable",
    value: "exe",
    ide: 'Executable'
  },
  {
    id: 87,
    name: "F# (.NET Core SDK 3.1.202)",
    label: "F# (.NET Core SDK 3.1.202)",
    value: "fsharp",
    ide: 'F#'
  },
  {
    id: 59,
    name: "Fortran (GFortran 9.2.0)",
    label: "Fortran (GFortran 9.2.0)",
    value: "fortran",
    ide: 'Fortran'
  },
  {
    id: 60,
    name: "Go (1.13.5)",
    label: "Go (1.13.5)",
    value: "go",
    ide: 'Go'
  },
  {
    id: 88,
    name: "Groovy (3.0.3)",
    label: "Groovy (3.0.3)",
    value: "groovy",
    ide: 'Groovy'
  },
  {
    id: 61,
    name: "Haskell (GHC 8.8.1)",
    label: "Haskell (GHC 8.8.1)",
    value: "haskell",
    ide: 'Haskell'
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
    ide: 'Java'
  },

  {
    id: 78,
    name: "Kotlin (1.3.70)",
    label: "Kotlin (1.3.70)",
    value: "kotlin",
    ide: 'Kotlin'
  },
  {
    id: 64,
    name: "Lua (5.3.5)",
    label: "Lua (5.3.5)",
    value: "lua",
    ide: 'Lua'
  },

  {
    id: 79,
    name: "Objective-C (Clang 7.0.1)",
    label: "Objective-C (Clang 7.0.1)",
    value: "objectivec",
    ide: 'Objective-C'
  },
  {
    id: 65,
    name: "OCaml (4.09.0)",
    label: "OCaml (4.09.0)",
    value: "ocaml",
    ide: 'OCaml'
  },
  {
    id: 66,
    name: "Octave (5.1.0)",
    label: "Octave (5.1.0)",
    value: "octave",
    ide: 'Octave'
  },
  {
    id: 67,
    name: "Pascal (FPC 3.0.4)",
    label: "Pascal (FPC 3.0.4)",
    value: "pascal",
    ide: 'Pascal'
  },
  {
    id: 85,
    name: "Perl (5.28.1)",
    label: "Perl (5.28.1)",
    value: "perl",
    ide: 'Perl'
  },
  {
    id: 68,
    name: "PHP (7.4.1)",
    label: "PHP (7.4.1)",
    value: "php",
    ide: 'PHP'
  },
  {
    id: 43,
    label: "Plain Text",
    name: "Plain Text",
    value: "text",
    ide: 'Plain Text'
  },
  {
    id: 69,
    name: "Prolog (GNU Prolog 1.4.5)",
    label: "Prolog (GNU Prolog 1.4.5)",
    value: "prolog",
    ide: 'Prolog'
  },
  {
    id: 71,
    name: "Python (3.8.1)",
    label: "Python (3.8.1)",
    value: "python",
    ide: 'PY'
  },
  {
    id: 80,
    name: "R (4.0.0)",
    label: "R (4.0.0)",
    value: "r",
    ide: 'R'
  },
  {
    id: 72,
    name: "Ruby (2.7.0)",
    label: "Ruby (2.7.0)",
    value: "ruby",
    ide: 'Ruby'
  },
  {
    id: 73,
    name: "Rust (1.40.0)",
    label: "Rust (1.40.0)",
    value: "rust",
    ide: 'Rust'
  },
  {
    id: 81,
    name: "Scala (2.13.2)",
    label: "Scala (2.13.2)",
    value: "scala",
    ide: 'Scala'
  },
  {
    id: 82,
    name: "SQL (SQLite 3.27.2)",
    label: "SQL (SQLite 3.27.2)",
    value: "sql",
    ide: 'SQL'
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
    label: "Swift (5.2.3)",
    value: "swift",
    ide: 'Swift'
  },
  {
    id: 74,
    name: "TypeScript (3.7.4)",
    label: "TypeScript (3.7.4)",
    value: "typescript",
    ide: 'TypeScript'
  },
  {
    id: 84,
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
    label: "Visual Basic.Net (vbnc 0.0.0.5943)",
    value: "vbnet",
    ide: 'Visual Basic.Net'
  },
  {
    id: 1,
    name: "HTML",
    label: "HTML",
    value: {
      "JavaScript": {
        name: "script.js",
        language: "javascript",
      },
      "CSS": {
        name: "style.css",
        language: "css",
      },
      "HTML": {
        name: "index.html",
        language: "html",
      }
    },
    ide: 'HTML'
  },
];

export const interviewDurations = [
  { id: '1', text: 'Short', subText: '(5 mins)', value: 5 },
  { id: '2', text: 'Medium', subText: '(15 mins)', value: 15 },
  { id: '3', text: 'Long', subText: '(30 mins)', value: 30 },
];

export const STATUS_LIST = [
  { id: 'ALL', text: 'All' },
  { id: 'ACV', text: 'Active' },
  { id: 'CSD', text: 'Closed' },
]



export const EXPERIENCE_LIST = Array.from({ length: 31 }, (_, index) => ({
  id: index + "",
  text: (index === 0 ? 'Fresher' : index).toString()
}));



export const INTERVIEW_DURATIONS = [
  { id: 1, text: 'Quick', subText: '5 mins', value: 5, isActive: false },
  { id: 2, text: 'Short', subText: '10 mins', value: 10, isActive: false },
  { id: 3, text: 'Medium', subText: '15 mins', value: 15, isActive: false },
  { id: 4, text: 'Long', subText: '30 mins', value: 30, isActive: false },
];
