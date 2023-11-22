/* eslint-disable no-self-assign */
import { SuperAdminProps } from "../../Interfaces";


const initialState: SuperAdminProps = {

};
const SuperAdminReducer = (state = initialState, action: any) => {
  switch (action.type) {

    default:
      state = state;
      break;
  }

  return state;
};

export { SuperAdminReducer };
