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
