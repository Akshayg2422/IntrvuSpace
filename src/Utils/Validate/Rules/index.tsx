export const FIRST_NAME_RULES = {
  first_name: {
    presence: { allowEmpty: false, message: "First name cannot be empty" },
    length: { minimum: 3, message: "First name minimum 3 chars" },
  },
}


export const FULL_NAME_RULES = {
  first_name: {
    presence: { allowEmpty: false, message: "Full name cannot be empty" },
    length: { minimum: 3, message: "Full name minimum 3 chars" },
  },
}

export const MOBILE_NUMBER_RULES = {
  mobile_number: {
    presence: { allowEmpty: false, message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  }
}

export const EMAIL_RULES = {
  email: {
    presence: { allowEmpty: false, message: "Email is required" },
    format: {
      pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: "Please enter a valid email address"
    }
  }
};

export const ADDRESS = {
  communication_address: {
    presence: { allowEmpty: false, message: "Address cannot be empty" },
  }
}

export const PINCODE = {
  pincode: {
    presence: { allowEmpty: false, message: "Pincode cannot be empty" },
    length: { is: 6, message: "Pincode should be 6 number" },
  }
}


export const PASSWORD = {
  password: {
    presence: { allowEmpty: false, message: "Password cannot be empty" },
    length: { minimum: 6, message: "Password minimum 6 chars" },
  }
}

export const CREATE_QUESTION_FORM_RULES = {
  name: {
    length: { minimum: 3, message: "Name minimum 3 chars" },
  },
  description: {
    presence: { allowEmpty: false, message: "Description cannot be empty" },
  }
};



export const OTP_NUMBER_RULES = {
  otp: {
    presence: { message: "Otp cannot be empty" },
    length: { is: 4, message: "Otp should be 4 number" },
  }
}




export const EMAIL_VERIFICATION_RULES = {
  ...EMAIL_RULES,
  ...OTP_NUMBER_RULES,
}

export const RESET_PASSWORD_RULES = {
  ...EMAIL_RULES,
  ...OTP_NUMBER_RULES,
  ...PASSWORD
}

export const REGISTER_RULES = {
  ...FULL_NAME_RULES,
  ...EMAIL_RULES,
  ...MOBILE_NUMBER_RULES,
  ...PASSWORD
}

export const getRegisterRules = (isPasswordRequired: boolean = true) => (
  {
  ...FULL_NAME_RULES,
  ...EMAIL_RULES,
  ...MOBILE_NUMBER_RULES,
  ...(!isPasswordRequired ? PASSWORD : {})
})


export const REGISTER_COMPANY_RULES = {
  brand_name: {
    presence: { allowEmpty: false, message: "Company Name cannot be empty" },
  },
  ...ADDRESS,
  ...MOBILE_NUMBER_RULES,
  ...PINCODE,
  sector: {
    presence: { allowEmpty: false, message: "sector cannot be empty" },
  },


}

export const REGISTER_COMPANY_SUPER_ADMIN_RULES = {
  brand_name: {
    presence: { allowEmpty: false, message: "Company Name cannot be empty" },
  },
  ...ADDRESS,
  ...MOBILE_NUMBER_RULES,
  ...PINCODE,
  sector: {
    presence: { allowEmpty: false, message: "sector cannot be empty" },
  },
  interview_limit: {
    presence: { allowEmpty: false, message: "interview limit cannot be empty" },
  },

}




export const CREATE_QUESTION_SECTION_RULES = {
  name: CREATE_QUESTION_FORM_RULES.name,
  description: CREATE_QUESTION_FORM_RULES.description,
  weightage: {
    length: { is: 2, message: "weightage should be between 1 and 100" },
  }
};

export const REGISTER_AS_MEMBER_RULES = {
  first_name: {
    presence: { message: "First name cannot be empty" },
    length: { minimum: 3, message: "First name minimum 3 chars" },
  },
  email: {
    email: { message: "doesn't look like a valid email" },
  },
  password: {
    presence: { message: "password cannot be empty" }
  },
  confirmPassword: {
    presence: { message: "password cannot be empty" }
  },
  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },
}

export const LOGIN_WITH_EMAIL_RULES = {
  ...EMAIL_RULES,
  ...PASSWORD
}

export const LOGIN_WITH_MOBILE_NO_RULES = {

  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },
  password: {
    presence: { message: "password cannot be empty" }
  },
}

export const ADD_DESIGNATION_RULES = {
  name: {
    length: { minimum: 3, message: "Name minimum 3 chars" },
  },
  description: {
    presence: { allowEmpty: false, message: "Description cannot be empty" }
  },
  sector_id: {
    presence: { allowEmpty: false, message: 'Please make sure to choose a sector' }
  }
}

export const ADD_SECTOR_RULES = {
  name: {
    length: { minimum: 3, message: 'Name minimum 3 chars' },
  },
  description: {
    presence: { allowEmpty: false, message: 'Description cannot be empty' },
  },
  photo: {
    presence: { allowEmpty: false, message: 'Please upload an image for your sector' }
  }
}


const NAME_RULES = {
  name: {
    presence: { allowEmpty: false, message: "Name cannot be empty" },
    length: { minimum: 3, message: 'Name minimum 3 chars' }
  }
}

export const ADD_SECTOR_CORPORATE_RULES = {
  ...NAME_RULES,
  // description: {
  //   presence: { allowEmpty: false, message: 'Description cannot be empty' },
  // },
}


export const ADD_DEPARTMENT_CORPORATE_RULES = {
  ...NAME_RULES
}

export const ADD_DESIGNATION_CORPORATE_RULES = {
  name: {
    presence: { allowEmpty: false, message: "Name cannot be empty" },
    length: { minimum: 2, message: 'Name minimum 2 chars' }
  }
}


export const ADD_CANDIDATE_RULES = {
  ...FIRST_NAME_RULES,
  // last_name: {
  //   presence: { message: "Last name cannot be empty" },
  //   length: { minimum: 1, message: "Last name minimum 1 chars" },
  // },
  ...MOBILE_NUMBER_RULES,
  ...EMAIL_RULES,


}






export const GENERATE_USING_AI_RULES = {
  name: {
    length: { minimum: 3, message: 'Name minimum 3 chars' },
  },
  description: {
    presence: { allowEmpty: false, message: 'Description cannot be empty' },
  },
}

export const REGENERATE_SECTION_RULES = {
  sections_count: {
    numericality: {
      greaterThanOrEqualTo: 3,
      lessThanOrEqualTo: 10,
      onlyInteger: true,
      message: 'The number of counts must be between 3 and 10 (inclusive)',
    },
  },
  questions_count: {
    numericality: {
      greaterThanOrEqualTo: 3,
      lessThanOrEqualTo: 5,
      onlyInteger: true,
      message: 'The number of counts must be between 3 and 5 (inclusive)',
    },
  },
}

export const GENERATE_QUESTION_COUNT_RULES = {
  questions_count: {
    numericality: {
      greaterThanOrEqualTo: 3,
      lessThanOrEqualTo: 5,
      onlyInteger: true,
      message: 'The number of counts must be between 3 and 5 (inclusive)',
    },
  },
}

export const FROM_JD_RULES = {

  position: {
    presence: { message: "Position name cannot be empty" },
    length: { minimum: 3, message: "Position minimum 3 chars" },
  },
  experience: {
    presence: { allowEmpty: false, message: "Experience cannot be empty" },
  },
  jd: {
    presence: { allowEmpty: false, message: "Job Description cannot be empty" },
  },
  sector_name: {
    presence: { message: "Sector name cannot be empty" },
    length: { minimum: 2, message: "Sector name minimum 2 chars" },
  },
}

export const CREATE_CORPORATE_RULES = {
  position: {
    presence: { message: "Role name cannot be empty" },
    length: { minimum: 3, message: "Role minimum 3 chars" },
  },
  experience: {
    presence: { allowEmpty: false, message: "Experience cannot be empty" },
  },
  jd: {
    presence: { allowEmpty: false, message: "Job Description cannot be empty" },
  },
}

export const CREATE_KNOWLEDGE_GROUP_VARIANT_RULES = {
  position: {
    presence: { message: "Position name cannot be empty" },
    length: { minimum: 3, message: "Position minimum 3 chars" },
  },
  experience: {
    presence: { allowEmpty: false, message: "Experience cannot be empty" },
  },
  jd: {
    presence: { allowEmpty: false, message: "Job Description cannot be empty" },
  },
}

export const VALIDATE_ADD_NEW_CANDIDATES_RULES = {
  ...FIRST_NAME_RULES,
  // last_name: {
  //   presence: { message: "Last name cannot be empty" },
  //   length: { minimum: 1, message: "Last name minimum 1 chars" },
  // },
  ...MOBILE_NUMBER_RULES,
  ...EMAIL_RULES,
}

export const CREATE_CORPORATE_SCHEDULE_RULES = {
  role: {
    presence: { allowEmpty: false, message: "Position cannot be empty" },
    length: { minimum: 3, message: "Minimum 3 chars in Position" },
  },
  experience: {
    presence: { allowEmpty: false, message: "Experience cannot be empty" },
  },
  jd: {
    presence: { allowEmpty: false, message: "Job Description cannot be empty" },
  },
  sector_id: {
    presence: { allowEmpty: false, message: "Sector cannot be empty" },
  },
  department_id: {
    presence: { allowEmpty: false, message: "Department cannot be empty" },
  },
  vacancies: {
    presence: { allowEmpty: false, message: "vacancies minimum 1 cannot be empty" },
  }
}


export const CREATE_CORPORATE_SCHEDULE_LITE_RULES = {
  role: {
    presence: { allowEmpty: false, message: "Position cannot be empty" },
    length: { minimum: 3, message: "Minimum 3 chars in Position" },
  },
  sector_name :{
    presence: { allowEmpty: false, message: "Sector cannot be empty" },
    length: { minimum: 2, message: "Minimum 2 chars in sector" },

  },
  experience: {
    presence: { allowEmpty: false, message: "Experience cannot be empty" },
  },
  jd: {
    presence: { allowEmpty: false, message: "Job Description cannot be empty" },
  },
  vacancies: {
    presence: { allowEmpty: false, message: "vacancies minimum 1 cannot be empty" },
  },
  ...FIRST_NAME_RULES,
  ...EMAIL_RULES,
  ...MOBILE_NUMBER_RULES,
  // ...VALIDATE_ADD_NEW_CANDIDATES_RULES
}

export const CREATE_CORPORATE_VACANCIES_RULES = {
  vacancies: {
    presence: { allowEmpty: false, message: "Vacancies cannot be empty minimum 1 " },
  }
}


export const CREATE_FOR_OTHERS_RULES = {
  // custom_first_name: {
  //   presence: { message: "First name cannot be empty" },
  //   length: { minimum: 3, message: "First name should be at least 3 characters" },
  // },
  // custom_last_name: {
  //   presence: { message: "Last name cannot be empty" },
  //   length: { minimum: 3, message: "Last name should be at least 3 characters" },
  // },
  // custom_email: {
  //   email: { message: "Email cannot be empty" },
  // },
  // custom_mobile_number: {
  //   presence: { message: "Mobile number cannot be empty" },
  //   length: { is: 10, message: "Mobile number should be 10 digits" },
  // },
  sector_name: {
    presence: { message: "Sector name cannot be empty" },
    length: { minimum: 2, message: "Sector name should be at least 2 characters" },
  },
  experience: {
    presence: { allowEmpty: false, message: "Experience cannot be empty" },
  },
  position: {
    presence: { message: "Role name cannot be empty" },
    length: { minimum: 3, message: "Role name should be at least 3 characters" },
  },
  jd: {
    presence: { allowEmpty: false, message: "Job Details cannot be empty" },
  },
  // is_notify_interview: {
  //   inclusion: { within: [true, false], message: "Invalid value for is_notify_interview" },
  // },
  // is_notify_report: {
  //   inclusion: { within: [true, false], message: "Invalid value for is_notify_report" },
  // },
};

export const CREATE_FOR_ADD_ANOTHER_RULES = {
  custom_first_name: {
    presence: { message: "First name cannot be empty" },
    length: { minimum: 3, message: "First name should be at least 3 characters" },
  },
  custom_email: {
    email: { message: "Email cannot be empty" },
  },
  custom_mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 digits" },
  },
};


export const CREATE_FOR_OTHERS_SUPER_ADMIN_RULES = {
...CREATE_FOR_ADD_ANOTHER_RULES,
  sector_name: {
    presence: { message: "Sector name cannot be empty" },
    length: { minimum: 2, message: "Sector name should be at least 2 characters" },
  },
  experience: {
    presence: { allowEmpty: false, message: "Experience cannot be empty" },
  },
  position: {
    presence: { message: "Role name cannot be empty" },
    length: { minimum: 3, message: "Role name should be at least 3 characters" },
  },
  jd: {
    presence: { allowEmpty: false, message: "Job Details cannot be empty" },
  },
  // is_notify_interview: {
  //   inclusion: { within: [true, false], message: "Invalid value for is_notify_interview" },
  // },
  // is_notify_report: {
  //   inclusion: { within: [true, false], message: "Invalid value for is_notify_report" },
  // },
};





export const CREATE_NEW_PASSWORD_RULES = {
  otp: {
    presence: { message: "OTP cannot be empty" },
    length: { minimum: 4, message: "Enter the 4 digit OTP" },
  },
  new_password: {
    email: { allowEmpty: false, message: "New Password cannot be empty" },
  },
  confirm_password: {
    presence: { allowEmpty: false, message: "Confirm password cannot be empty" }
  }
}

export const USER_FORM_RULES = {
  first_name: {
    presence: { message: "Name cannot be empty." },
    length: { minimum: 3, message: "First Name should have a minimum of 3 characters." },
  },
  // last_name: {
  //   presence: { message: "Last name cannot be empty" },
  //   length: { minimum: 1, message: "Last name minimum 1 chars" },
  // },

  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },

  email: {
    email: {
      message: "Email doesn't look like a valid email.",
    },
  },
  department_id: {
    presence: { allowEmpty: false, message: "Department cannot be empty" },
  },
  designation_id: {
    presence: { allowEmpty: false, message: "Designation cannot be empty" },
  },
  // gender: {
  //   presence: { message: "Please select a gender." },
  // },
};



