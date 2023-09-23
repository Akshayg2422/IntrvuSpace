export const CREATE_QUESTION_FORM_RULES = {
  name: {
    length: { minimum: 3, message: "Name minimum 3 chars" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  }
};

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

  email: {
    email: { message: "doesn't look like a valid email" },
  },
  password: {
    presence: { message: "password cannot be empty" }
  },


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
  // sector_name: {
  //   presence: { message: "Sector name cannot be empty" },
  //   length: { minimum: 3, message: "Sector name minimum 3 chars" },
  // },
  position: {
    presence: { message: "Role name cannot be empty" },
    length: { minimum: 3, message: "Role minimum 3 chars" },
  },
  experience: {
    presence: { allowEmpty: false, message: "Experience cannot be empty" },
  },
  reference_link: {
    presence: { allowEmpty: true, message: "Reference Link cannot be empty" },
  },
  jd: {
    presence: { allowEmpty: false, message: "Job Description cannot be empty" },
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
  first_name: {
    presence: { message: "First name cannot be empty" },
    length: { minimum: 3, message: "First name minimum 3 chars" },
  },
  last_name: {
    presence: { message: "Last name cannot be empty" },
    length: { minimum: 1, message: "First name minimum 3 chars" },
  },
  email: {
    email: { message: "Doesn't look like a valid email" },
  },
  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },

}


