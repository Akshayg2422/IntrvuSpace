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


