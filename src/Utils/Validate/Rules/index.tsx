export const MOBILE_NUMBER_RULES = {
  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },
};

// export const FIRST_NAME_RULES = {
//   first_name: {
//     presence: { message: 'Full Name cannot be empty' },
//     length: { minimum: 3, message: 'First name minimum 3 chars' },
//   },
// };

export const ADD_USER_RULES = {
  first_name: {
    presence: { message: "First name cannot be empty" },
    length: { minimum: 3, message: "First name minimum 3 chars" },
  },
  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },
  email: {
    email: { message: "doesn't look like a valid email" },
  },
  gender: {
    presence: { message: "Please Select Gender" },
  },
  designation_id: {
    presence: { allowEmpty: false, message: "Designation cannot be empty" },
  },
  department_id: {
    presence: { allowEmpty: false, message: "Department cannot be empty" },
  },
  profile_image: {
    presence: { allowEmpty: false, message: "profile image cannot be empty" }
  },

};

export const OTP_RULES = {
  mobile_number: {
    presence: { message: "Mobile number cannot be empty" },
    length: { is: 10, message: "Mobile number should be 10 number" },
  },
  otp: {
    presence: { message: "Otp cannot be empty" },
    length: { is: 4, message: "Otp should be 4 number" },
  },
};

export const USER_FORM_RULES = {
  attachment_logo: {
    presence: { allowEmpty: false, message: "Logo cannot be empty." }
  },
  registered_name: {
    presence: { message: "Name cannot be empty." },
    length: { minimum: 3, message: "Name should have a minimum of 3 characters." },
  },
  mobile_number2: MOBILE_NUMBER_RULES.mobile_number,
  communication_address: {
    presence: { allowEmpty: false, message: "Address cannot be empty." },
  },
  city: {
    presence: { allowEmpty: false, message: "City cannot be empty." },
  },
  pincode: {
    presence: { allowEmpty: false, message: "Pin code cannot be empty." },
    length: { is: 6, message: "Pin code should be 6 digits." },
  },
  first_name: {
    presence: { message: "Name cannot be empty." },
    length: { minimum: 3, message: "Name should have a minimum of 3 characters." },
  },
  mobile_number: MOBILE_NUMBER_RULES.mobile_number,

  email: {
    email: {
      message: "Email doesn't look like a valid email.",
    },
  },
  gender: {
    presence: { message: "Please select a gender." },
  },
};


export const CREATE_EXTERNAL = {
  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  reference_number: {
    presence: { allowEmpty: false, message: "reference no cannot be empty" },
  },
  // brand_branch_id: {
  //   presence: { allowEmpty: false, message: "Please select company" },
  // },

  // assigned_to_id: {
  //   presence: { allowEmpty: false, message: "please select User" },
  // },
  priority: {
    presence: { allowEmpty: false, message: "please select priority" },
  }

};
export const CREATE_INTERNAL = {
  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  reference_number: {
    presence: { allowEmpty: false, message: "reference no cannot be empty" },
  },

  // assigned_to_id: {
  //   presence: { allowEmpty: false, message: "please select User" },
  // },
  priority: {
    presence: { allowEmpty: false, message: "please select priority" },

  }


};

export const CREATE_SUB_TASK_EXTERNAL = {
  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  reference_number: {
    presence: { allowEmpty: false, message: "reference no cannot be empty" },
  },
  brand_branch_id: {
    presence: { allowEmpty: false, message: "Please select company" },
  },

  assigned_to_id: {
    presence: { allowEmpty: false, message: "please select User" },
  },
  priority: {
    presence: { allowEmpty: false, message: "please select priority" },

  },


};

export const CREATE_SUB_TASK_INTERNAL = {
  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  reference_number: {
    presence: { allowEmpty: false, message: "reference no cannot be empty" },
  },

  assigned_to_id: {
    presence: { allowEmpty: false, message: "please select User" },
  },
  priority: {
    presence: { allowEmpty: false, message: "please select priority" },

  },

};


export const CREATE_BROAD_CAST_EXTERNAL = {

  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  applicable_branches: {
    presence: { allowEmpty: false, message: "Company cannot be empty" },
  },
  broadcast_attachments:
  {
    presence: { allowEmpty: false, message: "attachments cannot be empty" },
  }
}

export const CREATE_BROAD_CAST_INTERNAL = {

  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },

}

export const ADD_REFERENCE_TICKET = {
  reference_ticket: {
    presence: { allowEmpty: false, message: " Reference Ticket cannot be empty" },
  },

}
export const ADD_DEPARTMENT = {
  name: {
    presence: { allowEmpty: false, message: "department name cannot be empty" },
  }
}

export const ADD_DESIGNATION = {
  name: {
    presence: { allowEmpty: false, message: "designation name cannot be empty" },
  }
}

export const ADD_SECTOR = {
  name: {
    presence: { allowEmpty: false, message: "sector name cannot be empty" },
  },
  // description:{
  //   presence: { allowEmpty: false, message: "description cannot be empty" },
  // }
}

export const ADD_TAG = {
  name: {
    presence: { allowEmpty: false, message: "tag name cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  }
}

export const ADD_TASK_GROUP = {
  name: {
    presence: { allowEmpty: false, message: "tag name cannot be empty" },
    length: { maximum: 20, message: "we cannot not add more then 20 character" },
  },
  code: {
    presence: { allowEmpty: false, message: "code name cannot be empty" },
    length: { minimum: 3, message: "Code minimum 3 chars" },

  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  photo: {
    presence: { allowEmpty: false, message: "Photo cannot be empty" }

  }

}

export const ADD_SUB_TASK_GROUP = {
  name: {
    presence: { allowEmpty: false, message: "tag name cannot be empty" },
  },
  code: {
    presence: { allowEmpty: false, message: "code name cannot be empty" },
    length: { minimum: 3, message: "Code minimum 3 chars" },

  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  photo: {
    presence: { allowEmpty: false, message: "Photo cannot be empty" }
  },
  start_time: {
    presence: { allowEmpty: false, message: " please select Stat Time  cannot be empty" },
  },

  end_time: {
    presence: { allowEmpty: false, message: " please select End Time cannot be empty" },
  }

}


export const ADD_REFERENCE_TASK = {
  reference_task: {
    presence: { allowEmpty: false, message: " Reference Task cannot be empty" },
  }
}

export const ADD_TIME_SHEET_DETAILS = {
  task_id: {
    presence: { allowEmpty: false, message: "  Task cannot be empty" },
  },
  start_time: {
    presence: { allowEmpty: false, message: " StartTime cannot be empty" },
  },
  end_time: {
    presence: { allowEmpty: false, message: " EndTime cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: " EndTime cannot be empty" },
  },
}


export const EDIT_TIME_SHEET_DETAILS = {
  task_id: {
    presence: { allowEmpty: false, message: "  Task cannot be empty" },
  },
  start_time: {
    presence: { allowEmpty: false, message: " StartTime cannot be empty" },
  },

  description: {
    presence: { allowEmpty: false, message: " EndTime cannot be empty" },
  },
}

export const ADD_EVENT_EXTERNAL_RULES = {

  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  place: {
    presence: { allowEmpty: false, message: "place cannot be empty" },
  },
  start_time: {
    presence: { allowEmpty: false, message: "Start time cannot be empty" },
  },
  end_time: {
    presence: { allowEmpty: false, message: "End time cannot be empty" },
  },
  applicable_branches: {
    presence: { allowEmpty: false, message: "Company cannot be empty" },
  },
  event_attachments:
  {
    presence: { message: "attachments cannot be empty" },
  },
}

export const ADD_EVENT_INTERNAL_RULES = {
  title: {
    presence: { allowEmpty: false, message: "title cannot be empty" },
  },
  description: {
    presence: { allowEmpty: false, message: "description cannot be empty" },
  },
  place: {
    presence: { allowEmpty: false, message: "place cannot be empty" },
  },
  start_time: {
    presence: { allowEmpty: false, message: " Start time cannot be empty" },
  },
  end_time: {
    presence: { allowEmpty: false, message: "End time cannot be empty" },
  },
  event_attachments:
  {
    presence: { allowEmpty: false, message: "attachments cannot be empty" },
  },
}

export const ADD_GROUP_MESSAGE = {
  group_attachments: {
    presence: { allowEmpty: false, message: "name and attachment cannot be empty" },
  },
}

