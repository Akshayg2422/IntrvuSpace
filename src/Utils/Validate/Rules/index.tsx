export const CREATE_QUESTION_FORM_RULES = {
  name: {
    length: { minimum: 3, message: "Name minimum 3 chars" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  }
};

